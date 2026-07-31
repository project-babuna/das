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
- `/clarity-session` - Live Business Clarity Session landing page
- `/full-program` - Self-paced core program
- `/learn-with-mentorship` - Mentorship program
- `/business-readiness-assessment` - Free assessment tool

## Vercel Deployment

Use this folder as the Vercel project root:

```text
/Users/agastyapandey/Dev/Projects/me/www/DS5
```

Vercel will detect Next.js automatically and use:

- Build command: `npm run build`
- Output: Next.js default

## WhatsApp Payment Confirmation

Successful Razorpay payments can send a Meta WhatsApp Cloud API utility-template message with the branded PDF receipt attached. Add these server-side Vercel environment variables:

```text
WHATSAPP_ACCESS_TOKEN
WHATSAPP_PHONE_NUMBER_ID
WHATSAPP_PAYMENT_SUCCESS_TEMPLATE
WHATSAPP_TEMPLATE_LANGUAGE_CODE=en
WHATSAPP_GRAPH_API_VERSION=v23.0
WHATSAPP_DEFAULT_COUNTRY_CODE=91
```

Run `database/whatsapp_logs.sql` once in the Supabase SQL editor before enabling the variables. The log makes payment notifications idempotent when both Razorpay verification and webhook callbacks run.

The approved Meta utility template must use a **document header** and four positional body variables in this order:

```text
Hi {{1}}, your payment of {{2}} for {{3}} was successful.
Your registration is confirmed. Receipt {{4}} is attached for your records.
```

Suggested template name: `payment_success_with_receipt`. Keep the configured template language identical to the approved template language.

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
