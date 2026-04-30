# AGENTS

## Project Goal
Redesign `crystalinteriors.cz` as a modern Astro site with the same primary navigation structure as the live website:

- `Úvod`
- `Projekty`
- `Služby`
- `O nás`
- `Kontakt`

The implementation should follow the architecture level and polish of the local reference project `brand-design`, while using Crystal Interiors branding, content, and business positioning.

## Technical Stack
- Astro
- Bun
- Tailwind CSS v4
- Fancybox
- Cloudinary integration for remote image delivery/transforms

## Content Rules
- Use the current public website as the source of truth for structure and raw content.
- Keep the original business meaning, but rewrite copy into shorter, clearer, more premium Czech.
- Focus messaging on interior design, custom furniture, usability, and the customer outcome.
- Hero copy should be concise and business-oriented.

## SEO Rules
- Include per-page title, description, keywords, canonical, Open Graph, Twitter metadata.
- Include `schema.org` structured data for local business and services.
- Include `robots.txt` and `sitemap.xml`.
- Include a share image / meta image strategy.

## UX Rules
- Support light and dark theme.
- Add header CTA buttons.
- Phone numbers and email addresses must be clickable with `tel:` and `mailto:`.
- Portfolio/gallery pages should use Fancybox.

## Cloudinary Rules
- Prefer Cloudinary fetch delivery for remote source images when Cloudinary environment variables are present.
- Fall back gracefully to original source images when Cloudinary is not configured.

## Notes
- This is a redesign, not a line-for-line clone.
- Preserve only the navigation structure and business scope from the live website.
- Favor maintainable shared data and reusable components over page-local hardcoding.
