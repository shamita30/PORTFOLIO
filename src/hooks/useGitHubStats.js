import { useState, useEffect } from 'react'

/**
 * Fetch GitHub profile stats (public repos, stars, contributions)
 * Used to dynamically scale 3D elements in the scene.
 *
 * Uses the REST API (no auth needed for public data)
 * and the unofficial contribution graph endpoint.
 */
export default function useGitHubStats(username = 'shamita30') {
  const [stats, setStats] = useState({
    repos: 0,
    stars: 0,
    followers: 0,
    contributions: 0,
    loading: true,
  })

  useEffect(() => {
    let cancelled = false

    async function fetchStats() {
      try {
        // 1. Fetch user profile + repos
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        ])

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error')

        const user = await userRes.json()
        const repos = await reposRes.json()

        // Sum up stars across all repos
        const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)

        // 2. Try to get contribution count from GitHub's SVG endpoint
        let contributions = 0
        try {
          const contribRes = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
          )
          if (contribRes.ok) {
            const contribData = await contribRes.json()
            contributions = contribData.total?.lastYear || contribData.total?.['2025'] || contribData.total?.['2024'] || 0
          }
        } catch {
          // Fallback: estimate from public repos
          contributions = repos.length * 25
        }

        if (!cancelled) {
          setStats({
            repos: user.public_repos || repos.length,
            stars: totalStars,
            followers: user.followers || 0,
            contributions,
            loading: false,
          })
        }
      } catch (err) {
        console.warn('[useGitHubStats] Failed to fetch:', err)
        if (!cancelled) {
          // Fallback defaults so the scene still looks good
          setStats({
            repos: 12,
            stars: 5,
            followers: 3,
            contributions: 200,
            loading: false,
          })
        }
      }
    }

    fetchStats()
    return () => { cancelled = true }
  }, [username])

  return stats
}
