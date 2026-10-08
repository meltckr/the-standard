# Standard 005 delivery revision

Mel's review of v3: normal 1x was too slow, lacked energy and dragged. V4 responds with the same approved Arizona v12 voice and exact 574 accepted spoken words. The article, current-roster example, exact Mat question and signoff remain unchanged.

V4 reuses the approved voice render. The installed Qwen Base voice-cloning path has no style-instruction support, and its model speed parameter is not implemented. No regenerated expressive-prosody claim is made. Finishing removes 12,785.5 ms of quiet runway and excess holds, shortens 14 internal quiet runs longer than 360 ms to 220 ms while retaining 110 ms margins, protects the final 180 ms of source activity from internal trimming, retains sentence tails and a final 250 ms tail before pacing, then applies pitch-preserving atempo 1.12. The player default stays unchanged; this is a new MP3 that plays more briskly at 1x. Mel's perception of energy and naturalness remains the acceptance gate.

- Duration: 166.018708 seconds (2:46.019), versus 200.186083 seconds in v3.
- Exact transcript: byte-identical to v3, 574 words.
- MP3: 3,322,124 bytes, mono 24 kHz, 160 kbps with Xing metadata.
- SHA-256: `31c869ead8a18f7356d97941ed28aa13fb7a5543f017b4924927005666b93d81`.
- Delivered loudness: -16.17 LUFS; true peak -1.87 dBTP.
- Decoded final quiet tail: approximately 168 ms; longest >=300 ms pause 379.542 ms. Complete local CPU transcription recognizes the example, question and signoff; proper-name and short-word variants remain listening checks.

Same-passage comparison clips are provided in owner-review: v3 opening 42.163 seconds and v4 opening 35.336 seconds, ending after the same sentence. Both play normally at 1x. They are excerpt comparisons, not alternate full editions.

Lint/build/integration and preservation checks pass. Prior v1/v2/v3 MP3/transcript/metadata files remain byte-identical. Written copy remains limited to the already accepted current-roster correction. New exact page checked desktop and phone without overflow, exact transcript, playback/pause/seeking/speed and 2:46 labels. HTTP audio MIME/hash/range checks pass. Human listening and independent QA pending. No publication, main merge, deployment or client delivery.
