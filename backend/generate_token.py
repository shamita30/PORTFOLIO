"""
One-time OAuth2 token generator.
Run this locally ONCE to get your refresh token, then store it in Render env vars.

Usage:
  1. pip install google-auth-oauthlib
  2. Download credentials.json from Google Cloud Console
     (OAuth 2.0 Client ID → Desktop app)
  3. python generate_token.py
  4. Copy the refresh_token from the output into your Render env vars
"""

import json
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ['https://www.googleapis.com/auth/gmail.send']

def main():
    flow = InstalledAppFlow.from_client_secrets_file(
        'credentials.json',  # Download from Google Cloud Console
        scopes=SCOPES,
    )
    creds = flow.run_local_server(port=0)

    token_data = {
        'client_id':     creds.client_id,
        'client_secret': creds.client_secret,
        'refresh_token': creds.refresh_token,
    }

    print('\n' + '='*60)
    print('✅ Token generated! Add these to your Render environment:')
    print('='*60)
    for key, val in token_data.items():
        print(f'  {key.upper()}: {val}')
    print('='*60 + '\n')

    with open('token_output.json', 'w') as f:
        json.dump(token_data, f, indent=2)
    print('Also saved to token_output.json (DO NOT commit this file!)')


if __name__ == '__main__':
    main()
