# Edition 004 audio repair

## Change

Mel reported a noise-like burst at the beginning and sentence endings that sounded cut short. The narration now opens with “Mat, getting comfortable…” and uses protected sentence tails. The written essay, approved share card, player, previous audio files and Editions 001–003 are unchanged.

## Method

- Reused the approved Arizona v12 engine, existing sentence-level renderer and explicitly selected reference pair. No provider or voice substitution; the shared renderer was not edited.
- Retained the renderer's 91 original sentence WAVs privately before its normal cleanup.
- Replaced the old 20 ms tail / 60 ms outgoing fade with a 120 ms tail after the last signal above -60 dBFS and a 20 ms fade entirely inside that quiet tail. Every fade window was below -60.48 dBFS before normalization.
- Preserved 250 ms after the final word and added an 80 ms quiet lead-in before the clean, newly voiced opening. No blind half-second trim through speech.
- One source sentence had only 13 ms after its final detected sound. It was regenerated with following context, then extracted at a verified pause after “help.” No extra contextual words remain in the final narration.
- Preserved the previous release's effective articulation rate with one pitch-preserving tempo pass. Restoring natural pauses makes the complete recording longer; the words themselves were not slowed. Internal pauses were not collapsed to force a zero-gap result.
- Applied the v12 EQ/de-essing and two-pass normalization, then measured the encoded MP3. Reference files, model files and raw logs remain private.

## Technical results

- 989 words; 350.613333 seconds, approximately 5:51.
- 24 kHz mono, 160 kbps MP3 with Xing metadata.
- Delivered loudness: -16.24 LUFS using the factory's dual-mono measurement; true peak: -1.76 dBTP.
- Complete automated transcription recognizes the opening and “Much love my brother. Dominate!” at the end. Minor recognition variants remain, including proper-name spelling and experienced/experience.
- The final word is recognized through approximately 350.34 seconds, with room remaining before the file ends.
- Build, transcript/hash checks, phone-width playback, 1×/1.5×/2× controls, seeking and playback through the complete ending passed. No autoplay or horizontal overflow; the exact transcript remains collapsed.
- The approved player and OG image are byte-identical to the previous release.

## Listening status

Perceptual listening was unavailable. Waveform inspection, word alignment and browser playback are technical checks, not a claim that the opening, joins or pronunciation have been heard and approved. A listening review remains pending.

## Release

The selected source, transcript and public metadata use the new `arizona-v12-clean-opening-and-endings` filenames. Publish through the existing GitHub Pages workflow and verify the live file hash and byte-range delivery before calling the public repair complete.
