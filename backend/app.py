"""
Shamita Portfolio – Secure Contact API
======================================
Uses Gmail API with OAuth2 (service-account-free approach):
  - One-time refresh token generation via generate_token.py
  - Refresh token stored as environment variable on Render
  - Each request exchanges refresh token for short-lived access token
  - Email sent via Gmail API (no SMTP plaintext passwords)

Required environment variables on Render:
  GMAIL_CLIENT_ID       – OAuth2 client ID from Google Cloud Console
  GMAIL_CLIENT_SECRET   – OAuth2 client secret
  GMAIL_REFRESH_TOKEN   – Refresh token from one-time auth flow
  GMAIL_SEND_FROM       – Gmail address to send from (shami2230sr12@gmail.com)
  GMAIL_SEND_TO         – Recipient email (shami2230sr12@gmail.com)
  FRONTEND_URL          – Frontend URL for CORS (https://shamitaportfolio.netlify.app)
  SECRET_KEY            – Random secret for Flask session
"""

import os
import json
import base64
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-please-change')

# ── CORS: only allow your frontend origin ──────────────────────────────────────
FRONTEND_URL = os.environ.get('FRONTEND_URL', 'https://shamitaportfolio.netlify.app')
CORS(app, origins=[FRONTEND_URL, 'http://localhost:5173', 'http://localhost:4173'])

# ── Gmail OAuth2 credentials ──────────────────────────────────────────────────
GMAIL_CLIENT_ID     = os.environ.get('GMAIL_CLIENT_ID',     '')
GMAIL_CLIENT_SECRET = os.environ.get('GMAIL_CLIENT_SECRET', '')
GMAIL_REFRESH_TOKEN = os.environ.get('GMAIL_REFRESH_TOKEN', '')
GMAIL_SEND_FROM     = os.environ.get('GMAIL_SEND_FROM',     'shami2230sr12@gmail.com')
GMAIL_SEND_TO       = os.environ.get('GMAIL_SEND_TO',       'shami2230sr12@gmail.com')

# ─────────────────────────────────────────────────────────────────────────────

def get_access_token():
    """Exchange the stored refresh token for a short-lived access token."""
    resp = requests.post('https://oauth2.googleapis.com/token', data={
        'client_id':     GMAIL_CLIENT_ID,
        'client_secret': GMAIL_CLIENT_SECRET,
        'refresh_token': GMAIL_REFRESH_TOKEN,
        'grant_type':    'refresh_token',
    }, timeout=10)
    resp.raise_for_status()
    return resp.json()['access_token']


def build_email_message(sender_name: str, sender_email: str, message: str) -> str:
    """Build a MIME message and return it as a base64url-encoded string."""
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'[Portfolio] New message from {sender_name}'
    msg['From']    = GMAIL_SEND_FROM
    msg['To']      = GMAIL_SEND_TO
    msg['Reply-To'] = sender_email

    now = datetime.now().strftime('%d %b %Y, %I:%M %p')

    plain_text = (
        f"New contact form message\n"
        f"{'='*40}\n"
        f"From:    {sender_name}\n"
        f"Email:   {sender_email}\n"
        f"Time:    {now}\n"
        f"{'='*40}\n\n"
        f"{message}\n"
    )

    html_text = f"""
    <html><body style="font-family:sans-serif;background:#f4f2ff;margin:0;padding:0;">
      <table width="600" style="margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(100,80,200,0.12);">
        <tr><td style="background:linear-gradient(135deg,#d6007f,#7c3aed);padding:28px 32px;">
          <h2 style="color:#fff;margin:0;font-size:20px;">✉️ New Portfolio Message</h2>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <p style="margin:0 0 12px;color:#5d4e8a;font-size:13px;">Received on {now}</p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <tr><td style="padding:8px 0;border-bottom:1px solid #edeaff;font-weight:600;color:#0f0825;width:80px;">From</td>
                <td style="padding:8px 0;border-bottom:1px solid #edeaff;color:#2e1f5e;">{sender_name}</td></tr>
            <tr><td style="padding:8px 0;font-weight:600;color:#0f0825;">Email</td>
                <td style="padding:8px 0;color:#7c3aed;"><a href="mailto:{sender_email}">{sender_email}</a></td></tr>
          </table>
          <div style="background:#f4f2ff;border-left:3px solid #7c3aed;padding:16px 20px;border-radius:8px;font-size:15px;color:#2e1f5e;line-height:1.7;">
            {message.replace(chr(10), '<br>')}
          </div>
          <p style="margin-top:24px;font-size:13px;color:#5d4e8a;">
            — Shamita Portfolio Contact System
          </p>
        </td></tr>
      </table>
    </body></html>
    """

    msg.attach(MIMEText(plain_text, 'plain'))
    msg.attach(MIMEText(html_text,  'html'))

    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
    return raw


def send_via_gmail_api(raw_message: str):
    """Send the pre-built message via Gmail API."""
    access_token = get_access_token()
    resp = requests.post(
        f'https://gmail.googleapis.com/gmail/v1/users/{GMAIL_SEND_FROM}/messages/send',
        headers={
            'Authorization': f'Bearer {access_token}',
            'Content-Type':  'application/json',
        },
        json={'raw': raw_message},
        timeout=15,
    )
    resp.raise_for_status()
    return resp.json()


# ─────────────────────────────────────────────────────────────────────────────

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'service': 'shamita-portfolio-api'}), 200


@app.route('/api/contact', methods=['POST'])
def contact():
    """
    POST /api/contact
    Body (JSON): { name, email, message }
    Returns: 200 on success, 4xx/5xx on error
    """
    data = request.get_json(silent=True) or {}

    name    = str(data.get('name',    '')).strip()
    email   = str(data.get('email',   '')).strip()
    message = str(data.get('message', '')).strip()

    # ── Validation ───────────────────────────────────────────────
    errors = []
    if not name    or len(name)    > 100:  errors.append('Name is required (max 100 chars).')
    if not email   or '@' not in email:    errors.append('Valid email is required.')
    if not message or len(message) < 5:    errors.append('Message is required (min 5 chars).')
    if len(message) > 3000:                errors.append('Message too long (max 3000 chars).')

    if errors:
        return jsonify({'success': False, 'errors': errors}), 400

    # ── Check credentials are configured ─────────────────────────
    if not all([GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN]):
        # Fallback: log and return a helpful error
        app.logger.warning('Gmail OAuth2 credentials not configured. Set env vars.')
        return jsonify({
            'success': False,
            'error': 'Email service not configured. Please contact me directly at shami2230sr12@gmail.com',
            'configure': True,
        }), 503

    # ── Send ─────────────────────────────────────────────────────
    try:
        raw = build_email_message(name, email, message)
        result = send_via_gmail_api(raw)
        app.logger.info(f'Email sent: {result.get("id")} from {email}')
        return jsonify({'success': True, 'message': 'Your message was sent successfully! 🚀'}), 200

    except requests.exceptions.HTTPError as e:
        app.logger.error(f'Gmail API HTTP error: {e.response.text}')
        return jsonify({'success': False, 'error': 'Failed to send email. Please try again.'}), 502

    except Exception as e:
        app.logger.error(f'Unexpected error: {e}')
        return jsonify({'success': False, 'error': 'An unexpected error occurred.'}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
