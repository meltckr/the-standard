# Standard 005 current audio review

Active candidate: **approved v8 text with matching v8 audio**, following Mel’s explicit “Approve V8” for text and audio preparation. Final listening, independent technical QA and publication approval remain pending. See [v8 implementation review](005-v8-implementation-review.md).

- MP3: `assets/audio/standard-005-make-the-assist-visible-arizona-v12-v8.mp3`.
- Exact 512-word spoken transcript: `content/audio/005-make-the-assist-visible-arizona-v12-v8.txt`; byte-identical to the approved v8 audio draft.
- Exact 499-word page draft: `content/review/005-make-the-assist-visible-v8-page.txt`; integrated with digit-form numbers.
- Metadata: `content/audio/005-make-the-assist-visible-arizona-v12-v8.json`.
- Duration 164.743625 seconds (2:44.744), 3,296,684 bytes.
- SHA-256 `cae3088f1e032bf714fe4173eef789bf45bb6d1ff8f10cfb933da3d15b17c975`.
- Delivered -16.22 LUFS / -1.91 dBTP. Same approved Arizona v12 voice, pitch-preserving tempo 1.12, v5 conservative tail-restoration/smooth-join method.

Prior versions preserved. The separate stalled worker’s old Reward the Assist branch/PR is not adopted. No publication, deployment, main merge or Mat delivery.

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
