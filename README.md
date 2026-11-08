# Gourmet Pot

Preorder website for a Nigerian restaurant in Debrecen. Guests browse the menu, build a cart, and place a weekly pickup order. The kitchen receives the order by email, and the customer gets a confirmation.

Production site: [gourmetpot.hu](https://gourmetpot.hu)

## What it shows

This is a small production app, not a UI kit. The interesting work is the ordering rules and the email path.

- **Two weekly preorder windows, in Budapest time.** Sunday through Tuesday 4:00 PM is for Wednesday pickup. Wednesday through Thursday 4:00 PM is for Friday pickup. The window is calculated with `Europe/Budapest`, so a server in another timezone does not open or close orders early.
- **A cart that survives a refresh.** Quantities and customer details are stored in `localStorage`, including the private-mode case where storage throws.
- **Orders that still count if the confirmation email fails.** The kitchen email is sent first. A failed customer confirmation is reported to the client and does not fail the order.
- **Validation on the server.** The order route checks the payload and the customer email before SMTP is contacted. The form also asks the customer to type the email twice.
- **One source for business copy.** Name, pickup rules, payment methods, and the public URL live in `lib/site.ts` and feed the pages, the emails, and the SEO metadata.
- **Search and share metadata.** The root layout sets titles, Open Graph and Twitter cards, and Restaurant JSON-LD. The Apple touch icon is rasterized from the same SVG as the favicon.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14, App Router, React 18 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Fonts | DM Sans and Playfair Display via `next/font` |
| Orders | Route Handler plus Nodemailer (SMTP) |
| Data | Typed menu catalog in the repo. No database. |
| Tooling | ESLint (`eslint-config-next`), PostCSS, Autoprefixer |

## Routes

| Path | Role |
| --- | --- |
| `/` | Hero, featured dishes, pickup information |
| `/menu` | Menu photography |
| `/order` | Cart, customer form, and order submit |
| `/contact` | Instagram and pickup details |
| `/api/send-order` | Validates the order and sends both emails |

## Project layout

```text
app/                 pages, layout, and the order API
app/components/      navbar, footer, order-window banner
data/menu.ts         dishes, prices, and categories
lib/site.ts          name, pickup rules, payment, public URL
lib/orderWindow.ts   open and closed windows in Budapest time
lib/cartStorage.ts   cart and customer details in localStorage
public/              menu photos and the favicon
```

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3002](http://localhost:3002).

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on port 3002 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Email setup

Orders are not stored in a database. They are emailed. Copy the example env file and fill in real values:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `SMTP_HOST` | SMTP server. Gmail is `smtp.gmail.com`. |
| `SMTP_PORT` | `587` for TLS, `465` for SSL. |
| `SMTP_USER` | Account that sends the mail. |
| `SMTP_PASSWORD` | For Gmail, an App Password, not the normal account password. |
| `ORDER_EMAIL` | Inbox that receives kitchen orders. Can match `SMTP_USER`. |
| `NEXT_PUBLIC_SITE_URL` | Optional. Public site URL used for metadata. Defaults to `https://gourmetpot.hu`. |

Gmail will reject a normal password. Turn on 2-Step Verification, create an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords), and put the 16-character value in `SMTP_PASSWORD` with the spaces removed. Restart the dev server after changing `.env.local`.

`.env.local` is gitignored.

If a test order fails:

- **EAUTH** means the App Password is wrong. Generate a new one.
- **ECONNECTION** means the app could not reach the SMTP server.
- No mail in the inbox usually means the spam folder, or the wrong `ORDER_EMAIL`.
