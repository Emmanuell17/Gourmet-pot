# Gourmet pot

A restaurant website built with Next.js, TypeScript, and Tailwind CSS with email ordering system.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) with your browser to see the result.

## Pages

- **Homepage** (`/`): Restaurant information, hero section, our story, and pickup information
- **Menu** (`/menu`): Display of menu images
- **Order** (`/order`): Interactive order page with email submission
- **Contact** (`/contact`): Contact page

## Email Order System Setup

The website includes an email ordering system. To enable it:

### Step 1: Create Environment File

If you don't have a `.env.local` file, copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### Step 2: Configure Email Settings

Fill in your email credentials in `.env.local`:

- `SMTP_HOST`: Your SMTP server (e.g., `smtp.gmail.com` for Gmail)
- `SMTP_PORT`: SMTP port (usually `587` for TLS, `465` for SSL)
- `SMTP_USER`: Your email address that will send the order emails
- `SMTP_PASSWORD`: Your email password or App Password
- `ORDER_EMAIL`: Email address where orders should be delivered (can be same as SMTP_USER)

### Step 3: Gmail App Password Setup (Required for Gmail)

**Important:** Gmail requires an App Password, not your regular password.

1. **Enable 2-Factor Authentication:**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification if not already enabled

2. **Generate App Password:**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" as the app and "Other" as the device
   - Enter "Gourmet Pot Orders" as the custom name
   - Click "Generate"
   - Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

3. **Add to .env.local:**
   - Remove spaces from the App Password
   - Add it to `SMTP_PASSWORD` in your `.env.local` file

### Step 4: Test the Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Order page (`/order`) and submit a test order

3. Check the console for any errors and verify you receive the email at `ORDER_EMAIL`

### Troubleshooting

- **"EAUTH" error:** Your App Password is incorrect. Generate a new one.
- **"ECONNECTION" error:** Check your internet connection and SMTP settings.
- **No email received:** Check spam folder and verify `ORDER_EMAIL` is correct.
- **Environment variables not loading:** Make sure the file is named `.env.local` (not `.env`) and restart the dev server.

## Features

- ✅ Responsive design with Tailwind CSS
- ✅ Animated hero section
- ✅ Interactive menu display
- ✅ Email ordering system
- ✅ Order summary and customer information form
- ✅ Scroll animations
- ✅ Modern glassmorphic UI design

