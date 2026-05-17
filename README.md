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
Required environment variable for image delivery and references:

```bash
PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
PUBLIC_SITE_URL=https://www.crystalinteriors.cz
```

When `PUBLIC_CLOUDINARY_CLOUD_NAME` is set, hero and service images are served through Cloudinary fetch transforms.

### References galleries (`/projekty/`)
Each room-type section on `/projekty/` loads its images at runtime from a Cloudinary tag using `https://res.cloudinary.com/<cloud>/image/list/<tag>.json`.

Required setup in your Cloudinary console:
1. **Enable resource list delivery**: Settings → Security → uncheck `Resource list` in the *Restricted media types* list. Without this the JSON endpoint returns 401.
2. **Tag your assets** with one of the section slugs defined in `src/data/site.ts` under `site.references`:
   - `kuchyne` – Kuchyně
   - `obyvaky` – Obývací pokoje
   - `loznice` – Ložnice a šatny
   - `detske-pokoje` – Dětské a studentské pokoje
   - `koupelny` – Koupelny
   - `komercni` – Kanceláře a komerční interiéry

Add or rename categories by editing `site.references`; the page renders one section per entry and binds Fancybox (latest stable `@fancyapps/ui`) per section.

## Routes
- `/`
- `/projekty/`
- `/sluzby/`
- `/o-nas/`
- `/kontakt/`

## Content Source
The redesign uses the publicly available structure and content from the live Crystal Interiors website, with shortened and improved Czech copy.
