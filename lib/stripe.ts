import Stripe from 'stripe'

// Server-side Stripe client. STRIPE_SECRET_KEY must be set (Vercel + .env.local).
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')
