# Standard 005 current audio review

**Editorial hold:** [review draft v6](005-v6-editorial-review.md) is saved and awaits Mel’s explicit numbered approval. No v6 audio exists. V5 is preserved prior-copy audio and does not narrate v6.

Prior audio candidate: **v5 tail polish**, after Mel approved v4 direction and pace but heard clipped endings. See [v5 tail-polish review](005-tail-polish-review.md).

- MP3: `assets/audio/standard-005-make-the-assist-visible-arizona-v12-v5.mp3`.
- Exact 574-word transcript: `content/audio/005-make-the-assist-visible-arizona-v12-v5.txt`, byte-identical to accepted v3/v4.
- Metadata: `content/audio/005-make-the-assist-visible-arizona-v12-v5.json`.
- Duration 182.343125 seconds (3:02.343), 3,648,524 bytes.
- SHA-256 `f680a2212b54af995968c3ba232a56177bcc0c321018d6ee81366e015210fd7f`.
- Delivered -16.21 LUFS / -1.87 dBTP; approved voice and pitch-preserving tempo 1.12 retained. Original faint tails restored, conservative quiet joins and lighter de-essing.

Mel's final listening approval and independent v5 QA remain pending. Accepted article, current-roster example, exact Mat question and signoff are unchanged. Prior versions preserved. No publication, main merge, deployment or client delivery.

## Historical v2 review — superseded

The following record describes v2 before the current-roster correction and v4 delivery revision. It is retained as historical evidence and does not identify the active audio.

The current Make the Assist Visible narration supersedes the prior-draft audio. The written issue is unchanged from approved review commit 65b54ade7068cb712bdfeae9fb82cf7f606c53bf; only its audio binding and exact transcript are updated.

- 585 words; delivered MP3 203.687 seconds (3:23.687), 4,075,244 bytes.
- SHA-256: `2706fe0c277b28cecc0feac0f08aa52af165d2a3726a3b1c78fa471dd4b7c431`.
- Mono 24 kHz, 160 kbps MP3 with Xing metadata; measured -16.19 LUFS and -1.84 dBTP from the delivered file.
- Local cached Arizona v12 Qwen/MLX voice and approved reference pair only. No paid service or credits. Native pace, tempo multiplier 1.0.
- 75 sentences in 74 assembled segments. Five context-assisted repairs protect short source tails. The contiguous Name the screen / Give the result its full story passage remains one segment; surrounding repair context was excluded.
- Protected quiet-tail fades and retained internal pauses; decoded final quiet tail approximately 202 ms. Three 0.32–0.50 second very quiet intervals remain natural pauses for listening review, not an asserted zero-gap result.
- Complete local automated transcription establishes broad sequence and recognizes the opening and signoff. The cached base English recognizer produces differences for names and short words; it cannot certify exact spoken fidelity. Those variants are recorded in the metadata.
- Exact input transcript preserves the Mat question, closing standard and `Much love my brother. Dominate!` signoff.

Human listening approval is pending. Mel should assess Ayton/Crowder/Booker pronunciation, short word tails, the complete question, Make the Assist Visible closing and full signoff. Independent QA and editorial approval are also pending. No publication, main merge, deployment or client delivery is authorized by this candidate.

The previous v1 MP3, transcript and metadata remain byte-for-byte preserved. Published editions 001–004 and their player assets remain unchanged.

Validation: lint, build and 005 integration assertions pass, including written-edition equality against 65b54ad and preserved prior audio. Exact built route tested at 1280×900 and 390×844 with no horizontal overflow, paused initial audio and collapsed transcript. Play/pause, ±15 seconds, slider Home/End, 1×/1.5×/2× and completed playback pass. Labels consistently show 3:24. Browser console has no warnings/errors. Local HTTP page/art/MP3 return 200; MP3 is audio/mpeg with the exact recorded hash, and byte range 1000–1999 returns 206 with 1000 bytes. Current desktop and phone screenshots are retained in the recovery task's review-evidence directory.
