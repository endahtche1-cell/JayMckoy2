import { createClient } from 'next-sanity'

// Fall back to a valid dummy id if the env var is missing/placeholder, so the app
// doesn't crash at build/module-load. Fetches just return empty until a real
// project id is set (Vercel + .env.local).
const rawId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const projectId = /^[a-z0-9-]+$/.test(rawId) ? rawId : 'placeholder'

export const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
