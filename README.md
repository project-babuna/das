# DreamAndScale

DreamAndScale is a Next.js website for an independent business-clarity program.

## Tech Stack

- Next.js 14
- React 18
- CSS modules via global stylesheet
- Static assets served from `public/assets`

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Routes

- `/` - DreamAndScale homepage
- `/course` - Detailed full-program course page

## Vercel Deployment

Use this folder as the Vercel project root:

```text
/Users/agastyapandey/Dev/Projects/me/www/DS5
```

Vercel will detect Next.js automatically and use:

- Build command: `npm run build`
- Output: Next.js default

## Project Structure

```text
app/
  layout.jsx
  page.jsx
  globals.css
public/
  assets/
    business-system-hero.png
```
