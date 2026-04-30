# Crystal Interiors

Redesign of `crystalinteriors.cz` built with Astro, Bun, Tailwind CSS v4, Fancybox, and Cloudinary-ready image delivery.

## Stack
- Astro
- Bun
- Tailwind CSS v4
- Fancybox
- Cloudinary fetch integration

## Development
```bash
bun install
bun run dev
```

## Build
```bash
bun run build
```

## Cloudinary
Optional environment variables:

```bash
PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
PUBLIC_SITE_URL=https://www.crystalinteriors.cz
```

If `PUBLIC_CLOUDINARY_CLOUD_NAME` is set, remote project images are served through Cloudinary fetch transforms. Without it, the site falls back to the original source URLs.

## Routes
- `/`
- `/projekty/`
- `/sluzby/`
- `/o-nas/`
- `/kontakt/`

## Content Source
The redesign uses the publicly available structure and content from the live Crystal Interiors website, with shortened and improved Czech copy.
