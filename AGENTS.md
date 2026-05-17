# AGENTS

## Project Goal

Modern Astro redesign of `crystalinteriors.cz`. Keeps the original navigation structure and business scope but rewrites copy, design language, and component architecture from scratch. Primary nav:

- `Úvod` (`/`)
- `Projekty` (`/projekty/`)
- `Služby` (`/sluzby/`)
- `O nás` (`/o-nas/`)
- `Kontakt` (`/kontakt/`)

## Tech Stack

- **Runtime/build**: Bun 1.3, Node 22 LTS minimum (`engines.node: ">=22.0.0"`)
- **Framework**: Astro 6.3 (static output)
- **CSS**: Tailwind CSS v4 with `@theme` token block in `public/styles/tailwind.source.css`. Generated CSS at `public/styles/tailwind.css` is gitignored (built by `bun run dev` watcher or `bun run build`).
- **Language**: TypeScript 6
- **Galleries**: `@fancyapps/ui` lightbox for project references
- **Image CDN**: Cloudinary for project gallery images (loaded at runtime by tag); local `/public/images/thumbnails/*.avif` for service tiles and `/public/images/logos/` for brand mark
- **Hosting**: currently GitHub Pages (base path `/crystalinteriors.cz/`). Planned migration to Cloudflare Pages once admin/auth ships.

## Design System

All design tokens live in `public/styles/tailwind.source.css` under `@theme`. Components reference them via Tailwind utilities (`bg-primary`, `text-muted`, `rounded-2xl`, `duration-fast`, etc.). Notable buckets:

- **Color**: `primary`, `primary-hover`, `accent`, `secondary`, surface/background, ink (dark sections), border, foreground/muted/subtle. Dark theme override under `[data-theme="dark"]`.
- **Spacing**: `--spacing: 0.25rem` (Tailwind derives `p-1, p-2, …` plus arbitrary `h-18`, `w-21`).
- **Radii**: `--radius-xs`...`--radius-3xl`, `--radius-full`.
- **Shadows**: `--shadow-card`, `--shadow-lifted`, `--shadow-soft`.
- **Motion**: `--duration-fast/standard/slow`, `--ease-standard/out-soft`. Custom keyframes (e.g. `hero-zoom`) declared in same source file.
- **Z-index**: `--z-base/sticky/header/overlay/modal`. NOTE: Tailwind v4 does not auto-map `--z-*` → utilities, so consumers must use `z-[var(--z-modal)]`.

Glass surfaces (`.glass`, `.glass-strong`, `.glass-hover`) live in `public/styles/global.css` as `@layer components`. The frosted blur is applied via a `::before` pseudo-element so the host element does **not** create a containing block for fixed-position descendants (critical for the mobile menu panel).

Dark theme toggle: `ThemeToggle.astro` writes `data-theme="dark"|"light"` to `<html>` and persists in `localStorage`. The `@custom-variant dark` declaration in the source CSS hooks Tailwind's `dark:` variants to the data attribute.

## Components

### Layout

- `src/layouts/BaseLayout.astro` — `<head>` boilerplate, meta tags, OG, schema.org JSON-LD, Google Tag Manager (`GTM-542MMSL`), skip link, theme-init inline script.
- `src/components/SiteHeader.astro` — sticky `.glass` header. Logo (SVG, white art via filter inversion in light theme), brand text, nav (desktop ≥lg), mobile cluster with `ThemeToggle` + `MobileMenu`.
- `src/components/MobileMenu.astro` — fullscreen overlay panel via `position: fixed inset-0`. State via `data-state="open"|"closed"` + Tailwind `group-data-[state=open]/menu:` variants. Hamburger transforms, social links, primary CTA.
- `src/components/SiteFooter.astro` — three-column footer with brand, atelier, social. Bottom row shows legal info (Provozovatel, IČO, sídlo) + copyright.

### Reusable

- `src/components/ui/Button.astro` — `tailwind-variants` styled. Variants: `primary`, `secondary`, `outline`, `outline-on-dark`, `ghost`, `hero-primary`, `hero-outline`. Sizes: `sm`, `md`, `lg`. `fullWidth` prop for `w-full sm:w-auto` mobile pattern. Min tap target 44px (`min-h-11`).
- `src/components/ui/IconButton.astro` — icon-only round button.
- `src/components/SectionIntro.astro` — eyebrow + h2 + lead pattern for section headers.
- `src/components/SocialLinks.astro` — reusable Facebook (solid filled) + Instagram (outline) icons with `title` tooltip, `aria-label`, `sr-only` text, `focus-visible:ring`. `variant: inline | card`, `align: left | right | center`.
- `src/components/ParallaxStrip.astro` — full-width banner with `background-attachment: fixed` parallax (mobile/iOS fallback to `scroll` via `@media (hover: none)` + `prefers-reduced-motion`). Used on homepage between sections; image taken from old site CDN (`duyn491kcolsw.cloudfront.net/files/1u/1um/1umned.jpg`).
- `src/components/HeroSection.astro` — full-bleed hero with Cloudinary image, gradient overlay, eyebrow + title + CTAs.
- `src/components/ReferencesGallery.astro` — server-rendered category section + client-side gallery loader (Cloudinary tag list + Fancybox).

### Icons

`src/components/icons/*.astro` — Heroicons-style 1.5 stroke outline:

`ArrowRightIcon`, `ChevronDownIcon`, `ClockIcon`, `EnvelopeIcon`, `FacebookIcon` (solid filled), `InstagramIcon` (outline), `LanguageIcon`, `MagnifyIcon`, `MapPinIcon`, `MoonIcon`, `PhoneIcon`, `SadFaceIcon`, `SendIcon`, `SparklesIcon`, `SunIcon`, `UserGroupIcon`, `WrenchScrewdriverIcon`.

## Data Layer

All page content centralized in `src/data/site.ts`:

- `nav`, `social`, `company` (legalName, ICO, address, registeredAddress, phones, emails, mapEmbed, contacts with role/email/phone for each designer)
- `hero`, `home` (introTitle, introText, businessSentence used as quote, parallaxImage URL)
- `services` (9 categories, each with `slug`, `title`, `text`, local thumbnail `image` path) — slugs link to `/projekty/#<slug>` anchors
- `process` (4 items rendered with thematic icons on the homepage: Sparkles → Zkušenost, UserGroup → Osobní spolupráce, WrenchScrewdriver → Spolupráce s profesionály, Clock → Termíny a realizace)
- `pricing`, `about`, `references` (9 categories matching services 1:1)

## Page-Specific Notes

### `/` (index.astro)

1. Hero (`HeroSection`) — full bleed with Cloudinary image, two CTAs (`hero-primary`, `hero-outline`).
2. "Jak pracujeme" — two-column: `SectionIntro` + consumer-focused blockquote (large `&ldquo;` quote mark, "PRO KLIENTA" eyebrow).
3. Parallax strip "Čím se zabýváme" (`ParallaxStrip`, medium height).
4. Services grid — 3×3 (md:2, lg:3). Each tile is `<a>` linking to `/projekty/#<slug>` with image zoom on hover (`group-hover:scale-110`), bottom-aligned "ZOBRAZIT GALERII →" hint that translates on hover.
5. Parallax strip "Náš přístup" (small height).
6. Process boxes — 4 items with primary/10 icon circles.
7. CTA section on `bg-ink` — "Domluvit schůzku" primary button (full-width mobile via `fullWidth lg:w-auto`).

### `/projekty/` (projekty.astro)

Renders `ReferencesGallery` for each category. Sections have `id={slug}` for `/projekty/#<slug>` anchors with `scroll-mt-28` for sticky-header compensation. Galleries load Cloudinary images by tag at runtime via `https://res.cloudinary.com/{cloud}/image/list/{tag}.json` and bind Fancybox to all `[data-fancybox]` elements.

### `/sluzby/` (sluzby.astro)

Two info cards + pricing table + "Poptat projekt" CTA.

### `/o-nas/` (o-nas.astro)

Designer info block.

### `/kontakt/` (kontakt.astro)

Two designer tiles side-by-side (`md:grid-cols-2`), each with role + name + email/phone pills (icon in primary/10 circle, hover → primary/white). Below: Atelier address card (MapPin icon, descriptive paragraph, address) + Google Maps iframe (`self-start` so the wrapper does not stretch below the iframe).

## SEO / Metadata

- Per-page `title`, `description`, `keywords`, `canonical`, Open Graph, Twitter card meta in `BaseLayout`.
- JSON-LD `@graph` with `WebSite`, `LocalBusiness`, `ProfessionalService`, and per-page `BreadcrumbList`.
- `robots.txt` + `sitemap.xml` in `/public`.
- Theme color meta for light/dark.

## Tracking

- **Google Tag Manager**: `GTM-542MMSL` (same container as the live site). Standard snippet in `BaseLayout` `<head>`, noscript iframe right after `<body>`. Uses the default `dataLayer` global (the live site uses `_gtmDataLayer`; we use the standard name for better GA4/3rd-party compatibility).

## Planned: Admin (Cloudflare Pages)

Discussed but not yet implemented. Stack chosen:

- **Storage**: Cloudinary tags + a single `site.json` raw resource for editable content (sections, pricelist).
- **Auth**: Magic-link via Resend (or similar), allowlist single email `vodakova@crystalinteriors.cz`, session stored as signed JWT in HTTP-only cookie. Token nonces in Cloudflare KV with 10-min TTL.
- **Hosting**: Cloudflare Pages + Pages Functions (Workers) with `@astrojs/cloudflare` adapter in hybrid mode (admin SSR, public pages static).
- **Image uploads**: Cloudinary signed-upload preset, signature endpoint protected by admin session.

Migration prerequisite: drop the `base: /crystalinteriors.cz/` GitHub Pages prefix once DNS moves to Cloudflare.

## Editorial / Copy Rules

- Czech only. Tone: clear, premium, customer-outcome focused.
- Shorter than the live site, but preserve meaning. Reword for clarity.
- Phone numbers/emails are clickable (`tel:`/`mailto:`).
- Names of designers: Lucie Vodáková, Hanka Neklapilová (both "Designérka").

## UX Rules

- Support light and dark theme; respect `prefers-color-scheme` on first load.
- All interactive elements meet 44px tap-target minimum (`min-h-11` on buttons).
- Focus rings via `focus-visible:ring-2 ring-primary ring-offset-2`.
- Respect `prefers-reduced-motion` (parallax fallback, hover transitions, hero zoom).
- Mobile-first responsive: full-width CTAs on `<sm`, side-by-side `≥sm`.

## Conventions

- Centralize copy/data in `src/data/site.ts` rather than hardcoding in templates.
- New design tokens go in the `@theme` block, not in component-scoped CSS.
- Component-scoped `<style>` only for things Tailwind can't express cleanly: compound `:nth-child` selectors, `clamp()` with `vw`, multi-stop `radial-gradient` with `color-mix()`, runtime `transition-delay: calc(var(--i) * 60ms)` patterns.
- For dark-section components, use `outline-on-dark` Button variant or the hero variants rather than inverting colors ad-hoc.
- New SVG assets: include `viewBox` tightly cropped to content (no whitespace bleed).

## Build & Dev

- `bun run dev` — concurrent Tailwind watcher + Astro dev server
- `bun run build` — minify CSS, run `astro check`, then `astro build`
- `bun run preview` — preview production build
- Build artifacts (`/dist`, `public/styles/tailwind.css`) are gitignored.
