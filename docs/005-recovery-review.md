# Edition 005 recovery review

Reward the Assist is prepared for Thursday October 8, 2026 afternoon Arizona review and possible delivery, subject to Mel's listening/editorial approval and separate publication/delivery authorization.

Recovered from the original implementation checkout without modifying it. The independent recovery checkout uses branch `codex/standard-005-recovery-review-20261008`, based on main `15aab8e54f5ae58a1799f305b66a89560e3cb712`. No original processes were stopped, no original branch was pushed, and no audio was regenerated. Existing approved revised article, 808-word spoken adaptation, share art and completed MP3 were reused. No paid service or credits were consumed.

## Candidate

- Route: `/the-standard/issues/005-reward-the-assist/`.
- Planned permanent URL: https://meltckr.github.io/the-standard/issues/005-reward-the-assist/ (not published by this review).
- Local built review: http://127.0.0.1:4189/the-standard/issues/005-reward-the-assist/.
- MP3: `assets/audio/standard-005-reward-the-assist-arizona-v12-v1.mp3`.
- Exact transcript and metadata: `content/audio/005-reward-the-assist-arizona-v12-v1.txt` and matching `.json`.
- Duration: 264.704875 seconds (4:24.705); 5,295,884 bytes.
- SHA-256: `392c201ca02792ebaa35fdf6b8923368c03c51e9fea5a61890e023f2975c561b`.
- 24 kHz mono, 160 kbps MP3 with Info/Xing metadata; independently measured −16.23 LUFS / −1.58 dBTP using dual-mono loudnorm.
- Required spoken closing: “Much love my brother. Dominate!” followed by no scripted speech.

## Validation

`npm run lint`, `npm run build`, syntax checks, `git diff --check` and `node scripts/check-005-review.mjs` pass. Integration assertions prove all four archived issue objects and legacy player assets unchanged, neutral player parity except total-duration rounding, exact built canonical/OG/Article/AudioObject data, transcript/hash binding and the draft indexing gate. Edition 005 is deliberately `draft`, has no claimed publication timestamp, uses noindex/nofollow and is absent from the publication sitemap. Existing robots sitemap reference remains correct. Set actual publication timestamps/status only after publication approval.

The approved player's implementation is preserved, with total duration rounded consistently to 4:25, under new `assets/avc-audio-player/` paths, `AvcAudioPlayer` class and neutral custom element/event/storage tokens. Only the selected edition's player is imported; previous editions retain their player. No voice engine labels or personal identifiers appear in new player chrome.

Browser checks: 1280 × 900 desktop and 390 × 844 phone CSS viewports; no horizontal overflow; initial audio paused; exact transcript collapsed; play/pause, forward/backward 15-second seek, slider, 1×/1.5×/2× and playback through the ending work. Download targets the selected unique MP3. Copy link was clicked and pasted into a local test textarea, proving the full permanent URL. No browser console errors. Screenshots of the exact built route are retained separately in the recovery task's `review-evidence/` directory.

The completed private assembly report records 78 sentences, at least 51.375 ms source tails, protected 120 ms sentence tails / 250 ms final tail, quiet-only 20 ms outgoing fades below −60.48 dBFS and preserved internal pauses. Independent delivered measurement confirms the loudness and true peak. Natural pauses: 18 detected at −50 dB with minimum 0.3 s, longest 0.497667 s. Final delivered decoded activity above −60 dBFS ends at 264.5736 s with 131.25 ms quiet afterward. Automated transcription recognizes opening and full closing; recognition variants need listening. Browser estimates can change slightly after seeking; ffprobe/decoded duration and metadata remain the exact technical duration.

## Open approval gates

Independent parent QA and Mel's listening/editorial approval remain pending. Automated transcription, waveform analysis and browser playback do not establish perceptual approval of pronunciation, joins or word tails. No publication, workflow dispatch, main push/merge or client delivery was performed. The Pages workflow triggers only on main or manual dispatch, so this review branch/PR does not deploy. After approval, publish through the existing workflow and verify live HTTP 200, audio MIME, byte ranges and hash before delivery.

## Bounded QA correction

Independent QA passed the editorial/source/controls/draft-state checks and identified a total-duration display mismatch. The new AVC player now rounds only total duration (brief, end label and slider accessible total) to the nearest second, matching the page link and AudioObject at 4:25. Elapsed time and seeking are unchanged; archived players and MP3/transcript bytes remain untouched. The optional study note describes mixed experiment results and limitations; independent QA did not retrieve full study text, so no full-text verification is claimed.
