# A2B Rides - Rider App

Premium ride-hailing app for riders to **hop on** and place **instant** or **scheduled** ride orders.

Built with Next.js 15 + TypeScript + Tailwind CSS. Black/gold branding aligned with A2B Rides / HopRide / GrokRide.

## Features (MVP Demo)

- **Hop On**: Simple name + phone entry (persists in localStorage)
- **Instant Rides**: Request a ride right now
- **Scheduled Rides**: Pick date & time
- Live price estimate (mock calculation)
- Ride history list with status
- Mobile-first dark UI with gold accents and holographic text effects

## Getting Started

```bash
cd a2b-rider-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Next Steps for Production (per recommended stack)

1. **Supabase**: Auth (phone OTP), Postgres schema for rides/users/drivers, Realtime subscriptions
2. **Maps**: Google Maps / Mapbox for pickup/dropoff autocomplete + live tracking
3. **Payments**: Stripe Checkout + Connect for rider charges & driver payouts
4. **Mobile**: Wrap with Capacitor for iOS/Android apps
5. **Admin + Driver apps**: Separate dashboards sharing the same backend
6. Deploy to Vercel + custom domain (e.g. app.a2brides.com)

This is a fully functional demo frontend ready to connect to the real backend.

**Service area focus**: NW Ohio (Toledo metro) first.
