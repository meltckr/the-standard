# Standard 005 current-roster correction

This candidate supersedes 5b8bcaf and its v2 audio. Only the Suns example, its matching narration and source have changed. The exact Mat question, UWM date attribution, remaining accepted copy and signoff are preserved.

The official NBA gamebook was downloaded and page 9 independently extracted: October 7, 2026, Phoenix at Chicago, Q1 6:57, `O.Ighodaro Alley Oop Dunk (J.Green)`. Jalen Green and Oso Ighodaro both appear on the official Suns roster checked October 8. Sources in the issue link to the gamebook page and current roster. The paragraph makes no win, screen, off-ball-cause or recognition-behavior claim.

Five replacement sentences were rendered with the existing cached local Arizona v12 Qwen/MLX model and approved references. All 68 unaffected source segments were reused, including protected-tail repairs. No new service or credits; tempo multiplier 1.0. Prior v1 and v2 MP3/transcript/metadata files remain byte-identical.

Current v3 audio:

- 574 words; 200.186083 seconds (3:20.186), 4,005,644 bytes.
- SHA-256 `19f1730e53239b9bf526288a2a92801f1a816ec5cfe3721d94f48e7d01cab176`.
- Mono 24 kHz, 160 kbps MP3 with Xing metadata.
- Delivered -16.19 LUFS / -1.85 dBTP; approximately 231 ms final quiet tail.
- Complete local automated transcription completed on CPU after GPU-mode crashes. It recognizes the new example and closing sequence but varies on Ighodaro and short words. Human listening approval is pending; the automated screen does not certify pronunciation or exact fidelity.

Validation: lint/build/005 integration pass, including restricted copy changes and preservation assertions. Exact built reader tested at desktop 1280×900 and phone 390×844; no overflow, initial paused audio, exact collapsed transcript, new 3:20 labels, playback/pause/seeking/speed controls. Revised Suns paragraph screenshot retained. Browser console clean. Served MP3 returns 200 with exact hash; byte range 1000–1999 returns 206/1000 bytes.

Independent QA and Mel listening/editorial approval remain pending. Please listen particularly for Jalen Green / Oso Ighodaro, short tails, exact Mat question and complete closing. No publication, deployment, main merge or client delivery.
