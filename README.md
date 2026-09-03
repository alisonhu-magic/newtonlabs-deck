# Newton Labs Decks

Multi-deck presentation tool. Shared shell and design system live on `main`;
each ticket ships as its own folder under `decks/` so merging never replaces a
sibling deck.

```bash
pnpm install
pnpm dev
```

- Catalog: [http://localhost:3000](http://localhost:3000)
- Preview a deck: [http://localhost:3000/d/fund-admins](http://localhost:3000/d/fund-admins)
- Present a deck: [http://localhost:3000/d/fund-admins/present](http://localhost:3000/d/fund-admins/present)
- Curator one-sheet: [http://localhost:3000/sheet](http://localhost:3000/sheet)

Hosted: [https://alisonhu-magic.github.io/newtonlabs-deck/](https://alisonhu-magic.github.io/newtonlabs-deck/)

Arrow keys or scroll to advance. PDF export:

```bash
DECK=fund-admins pnpm export:pdf:compressed
DECK=aon pnpm export:pdf:compressed
```

Outputs land in `exports/<deck>.pdf` and `exports/<deck>-compressed.pdf`.

## Layout

```
decks/
  index.ts              # registry
  fund-admins/          # NEWT-2517
    meta.ts
    content.ts
    slides.tsx
  aon/                  # NEWT-2470 (archived)
    …
src/components/deck/    # shared shell
src/app/d/[deck]/       # presenter route
```

## New ticket / deck

1. Branch from `main`.
2. Copy a close peer under `decks/<slug>/` (or start from an empty content + slides pair).
3. Register it in `decks/index.ts`.
4. Build against `/d/<slug>`.
5. Merge the folder — other decks stay untouched.
