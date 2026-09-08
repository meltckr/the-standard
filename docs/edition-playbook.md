# The Standard Edition Playbook

The Standard is a recognizable leadership product prepared for Mat roughly every couple of weeks, with timing set by Mel. It is distinct from his other named publications. Preserve the system; refresh the edition. No publication or sending without separate approval.

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
- Use the AVC logo and publication branding without a separate visible “By Mel Tucker” byline. Keep accurate authorship metadata behind the page.
- Use the structured issue object in `content/issues.js`; do not create a one-off page.
- Use a 1200 × 630 Open Graph image for every new issue and record its exact dimensions in structured content.
- Keep the social card composition consistent: publication mark and edition number at top left; short hook and issue title on the left; one restrained symbolic visual on the right; AVC mark at top right; month and year at the bottom.
- Prefer one visual metaphor over a collage. Keep the social card legible at message-preview size.
- Make design changes only for function, clarity, accessibility or repeatability.
- Edition 004 introduces the opt-in `presentation: "editorial-v2"` reader: stacked section headings, wider body measure, mobile contents, accessible research notes and a shorter opening. It keeps the AVC identity and leaves archived editions on their original layout. Reuse this refined presentation for future editions when approved.
- Optional `section.examples` contains `{role, text}` entries for concrete cross-role applications. `afterExamples` can clarify that the situations are illustrative, not reported events.

## Edition rhythm

- Identify the principle and opening observation.
- Verify sources, sharpen the argument and make its broader application clear.
- Complete copy, social card, narration and local verification.
- Present the review draft. After explicit publication approval, deploy and verify the live issue. Prepare the message; send only when separately authorized.

## Audio edition

Beginning with Edition 003, audio is a parallel consumption path for The Standard. For Edition 004 and subsequent work unless Mel changes the instruction, use the approved AVC Arizona Voice v12 system: Qwen3-TTS-12Hz-1.7B-Base-8bit through mlx-audio on the authorized Mac Studio. Reuse the existing sentence-level AVC renderer and explicitly selected approved Arizona reference pair; its built-in references may be stale. Keep the reference recordings, transcripts, model files and raw logs private. Never substitute a provider or voice. Adapt the script for a four-to-six-minute spoken essay rather than reading the article verbatim.

- Keep the exact narration in the issue's structured `audio.transcript` field.
- Verify access, the actual Python environment, model, references, ffmpeg and ffprobe before rendering. A local path alone is not access. If unavailable, prepare the script and one specified local render job; do not claim generation.
- Keep proper names correctly spelled in the article and visible transcript. Any pronunciation adjustment must be narrow, documented and checked against the finished narration.
- Render the player automatically from the issue's `audio` object.
- Reuse the approved `mel-audio-player` unchanged. Preserve direct-source playback, play/pause, ±15-second seek, timeline, speed controls, no autoplay and a collapsed exact transcript. Visible labels are “Audio” and the project title.
- Use a new MP3 filename for each revision and preserve previous audio. Maintain v12 finishing: 24 kHz mono, 160 kbps MP3 with Xing metadata, measured two-pass loudnorm at approximately -16 LUFS and true peaks no higher than -1.5 dBTP. Verify the delivered MP3, not just the pre-encode waveform. Do not use MLX join_audio.
- Edition 004's spoken ending is exactly “Much love my brother. Dominate!” with no speech afterward. Its written closing standard remains separate. For future editions use the approved project closing, never another product's sign-off.
- Edition 004's final narration targets 190 words per minute, following Mel's rejection of the 150-word-per-minute sample as too slow. Calculate the pitch-preserving tempo adjustment from the finalized transcript and actual factory duration; do not reuse an excerpt's tempo factor or the earlier 0.90 setting blindly. Normalize and measure the delivered MP3 after the adjustment. Keep the listener's speed controls available. This is the selected production pace, not a substitute for listening approval.
- Generate through the existing private AVC renderer only after the written edition and sources are final. Do not use the legacy ElevenLabs generation command for this voice.
- Verify duration, opening/middle/close, transcript match, mobile controls, file hash, live MIME type and HTTP 200 before release.
- Preserve the MP3, transcript and generation metadata with the shipped edition.
- Record technical checks and actual listening separately. Automated transcription is not a listening review. If listening is unavailable, mark it pending and do not call the narration fully approved.

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
11. After publication approval, publish through the existing GitHub Pages workflow and verify the permanent URL, OG image, MP3, byte-range seeking and MIME types without login. A local preview is not a publication.

GitHub is the system of record and default hosting workflow. If GitHub Pages is unavailable, report the blocker; do not switch hosts automatically. The existing Netlify configuration is a fallback reference only and requires fresh authorization to use.
