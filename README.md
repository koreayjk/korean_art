# ARAM

Website for ARAM: traditional Korean silk embroidery by Mi-ae Park, made to commission.

Built with [Astro](https://astro.build), [GSAP](https://gsap.com) and [Lenis](https://lenis.darkroom.engineering).

## Run it

```sh
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Where things are

| Path | What it holds |
| --- | --- |
| `src/data/site.ts` | Text that repeats across the site, the works list and the commission steps |
| `src/pages/index.astro` | The Home page, section by section |
| `src/components/` | Header and footer |
| `src/styles/global.css` | Colours, type and layout |
| `src/scripts/motion.ts` | Every animation on the site |
| `src/assets/images/` | Photographs |

## Before launch

- **Images are temporary.** Every file in `src/assets/images/` is an AI-generated stand-in used to judge
  the design. Replace all of them with real photographs of the workshop and the works, keep the same file
  names, then set `tempImages` to `false` in `src/data/site.ts` to remove the preview badge.
- **Fill the placeholders** in `src/data/site.ts`: contact email, starting price, deposit, and each work's
  title and size. Anything in `[BRACKETS]` is not decided yet.
- **Confirm the biography** on the Home page with Mi-ae Park. It was written from press coverage.
- **Set the domain** in `astro.config.mjs`.
- Only the Home page exists so far. The Master, Works, Commission, Journal and Inquiry pages, the Korean
  version and a working inquiry form are still to be built.
