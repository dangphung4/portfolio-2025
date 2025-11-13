# My new portfolio for 2025

No real reason why I'm doing this, I was just interested in playtesting some new tools.

## Getting Started

Install:

```bash
npm i
```

Set up environment variables (optional):

```bash
cp .env.example .env.local
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

### Food Reviews

A personal food review tracker with restaurant search functionality.

**Restaurant Search:**
- The app supports both **Google Places API** and **OpenStreetMap** for restaurant search
- If `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set, it uses Google Places API for comprehensive restaurant data
- Falls back to OpenStreetMap if Google API key is not configured
- Search works with just 2 characters and provides instant results

**Quick Entry Features:**
- Quick-select buttons for common cuisine types
- Mobile-friendly rating selection
- Keyboard shortcuts for desktop users:
  - `Cmd/Ctrl + K` - Focus search field
  - `Cmd/Ctrl + Enter` - Submit form

**To enable Google Places API:**
1. Get an API key from [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
2. Enable the Places API
3. Add the key to `.env.local` as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
4. Note: Google Places API requires billing to be enabled (free tier available)
