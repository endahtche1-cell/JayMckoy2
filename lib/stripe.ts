import Stripe from 'stripe'

// Server-side Stripe client. A non-empty placeholder avoids Stripe's SDK throwing
// at module load when the key is missing (which crashed the build). Real API calls
// fall back gracefully via try/catch until STRIPE_SECRET_KEY is a real key.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder')
