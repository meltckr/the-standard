# The Standard Edition Playbook

The Standard publishes each Thursday as one recognizable leadership product. Preserve the system; refresh the edition.

## Editorial frame

Every issue should move through the same five-part logic, with section names adapted to the subject:

1. Establish the central leadership distinction.
2. Open the idea through one concrete story, moment or observation.
3. Deepen the pattern with verified evidence.
4. Translate the principle into team and organizational practice.
5. Close with one question for Mat and one memorable standard.

The writing should answer what happened, what it reveals, why it matters and what to keep in mind next. Use calm authority, constructive truth and specific evidence. Preserve uncertainty where the research is narrower than the leadership inference.

## Visual system

- Preserve the shared page architecture, section rhythm, typography, AVC blue/black/white palette, navigation, cards, footer and motion language.
- Use the structured issue object in `content/issues.js`; do not create a one-off page.
- Use a 1200 × 630 Open Graph image for every new issue and record its exact dimensions in structured content.
- Keep the social card composition consistent: publication mark and edition number at top left; short hook and issue title on the left; one restrained symbolic visual on the right; AVC mark at top right; month and year at the bottom.
- Prefer one visual metaphor over a collage. Keep the social card legible at message-preview size.
- Make design changes only for function, clarity, accessibility or repeatability.

## Thursday release rhythm

- Monday: identify the principle and opening observation.
- Tuesday: verify sources and establish the argument.
- Wednesday: complete copy, social card and local verification.
- Thursday morning: publish, verify the live issue and send the prepared message.

## Audio edition

Beginning with Edition 003, audio is a parallel consumption path for The Standard. Reuse the established AVC ElevenLabs generation and accessible-player infrastructure; adapt the script for a four-to-six-minute spoken essay rather than reading the article verbatim.

- Keep the exact narration in the issue's structured `audio.transcript` field.
- Keep proper names correctly spelled in the article and visible transcript. When the speech model needs help, add a narrowly scoped `audio.pronunciationAliases` rule that changes only the text sent to ElevenLabs, and version the replacement MP3 to prevent stale playback.
- Render the player automatically from the issue's `audio` object.
- Preserve play/pause, ±15-second seek, timeline, speed controls, no autoplay and a collapsed exact transcript.
- Use a unique versioned MP3 filename for every edition and apply measured two-pass normalization to -16 LUFS with a true-peak ceiling of -1.5 dBTP, mono, 96 kbps. The generator must fail closed when the finished MP3 misses that contract.
- End the narration with the issue's exact closing standard and no speech afterward.
- Generate with `npm run audio:generate -- --issue NNN` only after the written edition and sources are final.
- Verify duration, opening/middle/close, transcript match, mobile controls, file hash, live MIME type and HTTP 200 before release.
- Preserve the MP3, transcript and generation metadata with the shipped edition.

## Release checklist

1. Add the issue object and permanent URL.
2. Update title, thesis, summary, reading time, display date, ISO publication/modification timestamps and share message.
3. Add a current 1200 × 630 social image, hook, exact dimensions and alt text.
4. Confirm the article includes the leadership distinction, evidence, practical application, question for Mat and closing standard.
5. When the edition includes audio, generate the unique MP3 and confirm the exact transcript and metadata files.
6. Run `npm run lint` and `npm run build`.
7. Confirm canonical, robots, Open Graph, Twitter, Article JSON-LD and optional AudioObject metadata in the generated issue head.
8. Confirm `sitemap.xml` and `robots.txt` contain the permanent issue and sitemap URLs.
9. Search for stale issue numbers, titles, dates, names, images, audio references and metadata.
10. Check desktop and mobile layouts, audio controls and transcript once.
11. Publish through the existing GitHub Pages workflow and verify the permanent URL, OG image, MP3 and MIME types.
