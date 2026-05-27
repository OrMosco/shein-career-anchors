# Shein Career Anchors

A career anchors questionnaire app built with React, TypeScript, Vite, shadcn-ui, and Tailwind CSS.

## Live Demo

Deployed on GitHub Pages: `https://ormosco.github.io/shein-career-anchors/`

## Development

Requirements: Node.js & npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Clone the repository
git clone https://github.com/OrMosco/shein-career-anchors.git
cd shein-career-anchors

# Install dependencies
npm install

# Start dev server
npm run dev
```

## Build

```sh
npm run build
```

The output is in the `dist/` folder.

## Deployment

This project is automatically deployed to **GitHub Pages** on every push to the `copilot/deploy-independent-version` branch via the workflow in `.github/workflows/deploy.yml`.

To enable GitHub Pages in the repository settings:
1. Go to **Settings → Pages**
2. Set **Source** to **GitHub Actions**

## External Referral Tracking

The landing page now logs first-time visitors that arrived from an external referrer into the Supabase table `public.external_referral_entries`.

To count how many people entered from external sites, run:

```sql
select count(*) from public.external_referral_entries;
```

## Tech Stack

- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
