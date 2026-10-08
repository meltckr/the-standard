# Edition 005 — Reward the Assist

Prepared review candidate for Thursday October 8, 2026 afternoon Arizona. This record is preparation evidence, not publication or delivery approval.

## Candidate

Branch: `codex/standard-005-reward-the-assist`, based on `15aab8e54f5ae58a1799f305b66a89560e3cb712`.

The supplied revised editorial draft is integrated in `content/issues.js` using the existing editorial-v2 reader. The supplied spoken adaptation is stored exactly, with 808 words and the final words “Much love my brother. Dominate!” The article/application/closing count is 964 words, giving a five-minute reading label at 200 words per minute. Research is confined to the existing expandable sources. The Dean Smith account and the Medal of Freedom attribution were checked against UNC's primary pages. Publisher access to the gratitude study returned 403 in this environment; the editorial worker supplied its source-grounded summary and the author's SFU publication list confirms the reference. Independent source proof remains with the parent.

The 1200 × 630 social image uses original deterministic SVG artwork, the existing AVC logo and the supplied hook “WHO MADE IT POSSIBLE?” It was inspected at full size and 400 × 210. No image-generation purchase or hosted TTS service was used.

Review state is explicit: `status: "draft"`, visible “Review draft,” no publication timestamp, noindex/nofollow metadata and exclusion from the sitemap. Release requires replacing the draft status and setting the actual approved publication timestamp. Existing editions retain their data and behavior.

## Run and review

From the isolated checkout:

```sh
npm run lint
npm run build
PORT=4185 npm run dev
```

Local review URL: `http://127.0.0.1:4185/issues/005-reward-the-assist/`.

The current source preview server uses port 4185, independent of other projects. The built review artifact is `dist/issues/005-reward-the-assist/index.html`. The canonical public URL stored for Copy link is proposed until release and live verification: `https://meltckr.github.io/the-standard/issues/005-reward-the-assist/`.

## Audio production and verification

- Approved local Arizona v12 / Qwen3-TTS-12Hz-1.7B-Base-8bit; cached model and explicitly selected approved references. Offline rendering used the existing sentence-generation code, loading the model once. No paid service or substitute voice.
- 78 sentence WAVs retained privately. Four unusually short source tails were regenerated with following context and extracted in ASR-aligned quiet pauses. Context words are excluded.
- Protected 120 ms tails after the last -60 dBFS activity, 20 ms fades entirely in quiet tails, 250 ms final tail and 80 ms lead-in. Natural pauses retained. Shared factory unmodified.
- Tempo calculated from this render's source signal spans: 1.0015483, a negligible adjustment near the approved conversational articulation baseline. No fixed acceleration copied from an older edition.
- Delivered MP3: 264.704875 seconds, approximately 4:25; 24 kHz mono, 160 kbps, Xing/Info header. Encoded loudness -16.23 LUFS dual-mono, true peak -1.58 dBTP. Conditioning followed by measured two-pass normalization and a +0.23 dB encoded-level correction; no re-encoding of an existing MP3.
- Exact transcript, speech input and audio SHA-256 metadata match. MP3 SHA-256: `392c201ca02792ebaa35fdf6b8923368c03c51e9fea5a61890e023f2975c561b`.
- Full delivered-file automated transcription recognizes the opening, Dean Smith, the date and complete sign-off. Recognition variations remain (including assist/passer and ordinary grammatical variants); ASR is not a listening approval.
- Quiet-pause scan: 18 intervals at least 0.30 seconds, longest 0.497667 seconds. Longest near-digital-zero span is 0.289333 seconds at 210.897–211.187, within an ordinary spoken pause. These were retained rather than deleting pauses to meet the obsolete zero-gap rule. Perceptual pause/transition assessment is pending.
- Browser player loaded the unique source, had no autoplay, and passed play/pause, forward/backward seek, timeline end seek, 1×/1.5×/2× and playback through the complete end. Exact transcript disclosure opens and closes. Technical browser playback is not a claim of hearing.
- Local HTTP response is audio/mpeg; byte-range request returns HTTP 206 with correct range and length. Public HTTP/MIME/range/hash checks await approved release.

## Publication checks

Lint, build, JavaScript syntax and Git whitespace checks pass. Metadata contains the correct canonical URL, OG/Twitter image/alt/dimensions, Article and AudioObject (PT4M25S). Review metadata omits publication fields and sitemap entry. Editions 001–004 compare semantically identical to base. The shared approved player hashes are unchanged; CSS/brand assets and prior audio are unchanged. The built content contains no private voice references, raw WAVs, logs, model files or production scripts.

Desktop inspection used actual CSS viewport 1280 × 900; phone used 390 × 844. Both have no horizontal overflow. Audio is prominent below the hero; source notes and transcript are collapsed by default. Source disclosures link to all three exact references. Reader console reports no errors. Screenshots are in the task root, outside the public package.

Copy link's dataset holds the exact permanent 005 URL and the button reported “Correct link copied.” Browser Use's virtual clipboard returned empty. Native clipboard access was blocked because the Mac was locked. Actual paste/clipboard proof remains pending; no clipboard or browser approval was bypassed.

## Release and delivery state

Pages configuration, Actions and push permissions are available. The last verified prior-main deployment succeeded for `15aab8e`; that is not an edition 005 deployment or client-delivery receipt. The Pages workflow publishes main or manual dispatch; there is no branch-preview deployment.

Remaining gates: parent's final editorial review/independent proof, perceptual listening (including pronunciation, joins and exact ending), actual clipboard-paste proof, Mel's exact final publication approval, then actual date/status update, deployment and public verification. Client delivery requires separate authorization and proof. The ready-to-send message draft is stored without an unverified live link; append the permanent link only after live verification.

No final publication, workflow dispatch, merge, repository visibility change or client delivery occurred. Suns worktrees and separate processes were preserved.
