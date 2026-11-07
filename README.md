# The Lighthouse

Clear teaching on the Kingdom of God, daily Bible study and prayer.
A teaching ministry of Pastor Johnson Jayeola.

Built with **Next.js (App Router) + React + Tailwind CSS v4**, exported as a static site and hosted free on **GitHub Pages**.

---

## Put it online (GitHub Pages)

1. **Create a repository** on GitHub, for example `the-lighthouse`. It can be public or private (Pages on private repos needs a paid plan).
2. **Upload the files.** On the new repo page choose *uploading an existing file*, drag in everything from this folder (including the hidden `.github` folder), and commit to the `main` branch.
   Or, from a terminal:
   ```bash
   git init && git add . && git commit -m "The Lighthouse website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/the-lighthouse.git
   git push -u origin main
   ```
3. **Turn on Pages:** repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open the **Actions** tab. The "Deploy to GitHub Pages" workflow builds the site (about 2 minutes). When it turns green, your site is live at
   `https://<your-username>.github.io/the-lighthouse/`

Every push to `main` redeploys automatically.

### Custom domain (optional)
1. Settings → Pages → *Custom domain* → enter e.g. `thelighthouse.org` and follow GitHub's DNS instructions.
2. Settings → Secrets and variables → Actions → **Variables** → add `CUSTOM_DOMAIN` = `true`.
3. Re-run the workflow. (This removes the `/the-lighthouse` path prefix.)

---

## Run it on your computer

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # produces the static site in /out
```

---

## Editing content — no code needed

Everything visitors read lives in the `content/` folder:

| File | What it holds |
|---|---|
| `content/site.ts` | Ministry name, YouTube link, **contact email**, **form endpoint**, **giving link**, book link, menu |
| `content/teachings.ts` | Series, topics and the teaching archive (add `url:` with each YouTube video link) |
| `content/scripture.ts` | Bible passages for the study reader (KJV), reading plans, verse of the day, guided prayer, prayer categories |
| `content/publishing.ts` | News & commentary articles, library books, free resources |
| `content/events.ts` | Recurring live sessions (dates calculate themselves) |

> **Replace the starter teachings.** The 13 entries in `content/teachings.ts` are written on your Kingdom themes as placeholders. Swap in your real episode titles, dates, lengths and YouTube links.

### Adding a teaching
Copy one block in `TEACHINGS`, give it the next `id`, and put it at the **top** of the list (newest first). Set `passage` to a key from `content/scripture.ts` (e.g. `"mat5"`) to link it to the study reader, or `null`.

### Adding a Bible passage
Add an entry to `PASSAGES` in `content/scripture.ts` with its verses. Use King James Version (public domain) text; modern translations need publisher permission.

---

## Making forms deliver to you

GitHub Pages hosts static files only, so forms need a small service to receive them.
Until one is set up, each form prepares a ready-to-copy message and points visitors to YouTube.

1. Create a free form at [formspree.io](https://formspree.io) (or similar) using the ministry's email.
2. Copy the form URL (looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it into `formEndpoint` in `content/site.ts`.

That one setting connects **prayer requests** (when "The prayer team" is chosen), **testimonies**, **contact messages** and **speaking invitations**. Use a second form for `newsletterEndpoint`, or a newsletter service's form URL.

## Online giving
Create a payment link with Stripe Payment Links, PayPal, Tithe.ly or your church platform and paste it into `givingUrl` in `content/site.ts`. The Give button will open it.

---

## What stays on the visitor's device
Verse highlights, notes, reading-plan progress, saved resources and the prayer journal are stored in the visitor's own browser (`localStorage`). Nothing personal is sent anywhere unless they submit a form.

---

## Project structure

```
app/                 Pages (one folder per route)
  page.tsx           Home
  teachings/         Archive + /teachings/[id] detail pages
  study/             Bible study reader & reading plans
  prayer/            Guided prayer, prayer requests, journal
  news/ library/ resources/ events/ community/ about/ give/ contact/ brand/
  globals.css        Design tokens (colours, fonts) + component styles
  icon.svg           Favicon · apple-icon.png  Home-screen icon
components/          Header, Footer, TabBar, Logo, forms, study & prayer tools
content/             All editable text and data
lib/                 Small helpers (local storage, dates, form submit)
.github/workflows/   Automatic GitHub Pages deployment
```

## Design system
See the **/brand** page on the live site: logo lockups, clear-space and usage rules, colour, type and components.

- **Colour:** warm white `#FBFAF6`, sand `#F4F0E8`, stone `#E9E1D3`, charcoal `#24272B`, sage `#46695F`, ember `#C9853A` (the light — used sparingly)
- **Type:** Newsreader (headlines and scripture), Instrument Sans (interface)
- **Logo:** horizon · tower · light. Clear space = the diameter of the light.
