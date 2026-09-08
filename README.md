# The Standard

A private executive editorial series. Issue content lives in `content/issues.js`; future installments are added as one structured issue object and rendered by the shared publication layout.

New editions are prepared for Mat roughly every couple of weeks, with timing set by Mel. Publication and sending require separate approval. The recurring editorial, visual and release standard is documented in [`docs/edition-playbook.md`](docs/edition-playbook.md).

## AVC brand system

Accelerated Velocity Consulting is built into the shared publication frame. Every library page, issue and future installment automatically inherits:

- The supplied AVC dark-background logo in the header.
- The supplied AVC light-background logo in each issue footer.
- The AVC blue, black and white palette.
- Discreet provenance sizing that remains secondary to the editorial title.

The canonical identity configuration lives in `content/brand.js`. Do not replace, redraw or omit the AVC marks when creating a new issue.

## GitHub Pages

The production build is configured for the repository path `/the-standard/` and includes absolute Open Graph metadata for iMessage previews.

Expected public issue URL:

`https://meltckr.github.io/the-standard/issues/001-illusion-of-choice/`

Publishing is handled by `.github/workflows/deploy-pages.yml`.

## Local preview

```sh
npm run dev
```

Open `http://127.0.0.1:4173`.

## Validation

```sh
npm run lint
npm run build
```

Audio is optional per issue and rendered from the structured `audio` object. Every audio-enabled edition ships a versioned MP3, exact transcript and generation metadata.

Edition 004 uses the approved private Arizona v12 local voice factory and the existing `mel-audio-player`. The legacy `audio:generate` command is not the current voice workflow. Follow the playbook; do not regenerate older editions.

The optional `presentation: "editorial-v2"` setting introduces the Edition 004 reading refinements without restyling archived issues.
