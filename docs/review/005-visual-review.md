# Standard 005 visual review

Review candidate based on approved published v9, b11bb15c569377e68560c3d4a71d0e8f80ec278f. No publication or client delivery is authorized by this review branch.

## What changed

Only issue 005 opts into the new visual layer: original Blender assist sculpture, navy/copper opening, dashboard-derived local font hierarchy, warm essay background, 690 px reading column, clearer section boundaries, responsive phone layout, neutral audio colors and motion-free reveal states. Earlier issues do not load the stylesheet. The approved article, transcript, audio, shared audio-player implementation and all metadata except the authorized share-image path/description remain byte-identical.

A separate 1200 × 630 Figma share-card proposal uses the exact verified Pixabay photograph and approved title. Visual review v10 wires the optimized 171,136-byte progressive JPEG into OG/Twitter metadata in this review branch only; the original proposal PNG and old published share asset remain available for rollback. The downloaded source is Pixabay's 1280 px preview, not the reported 5146 × 3108 original. The derivative combines photo, title, publication identity, contrast veil and credit; it is not a standalone stock-photo distribution.

## Tools and source evidence

Editable Figma studies: https://www.figma.com/design/cKkQPuoX4kouKoFpAyHuG9 . Frames 2:2 desktop, 2:18 phone, 5:2 share-card. Blender scene and reproducible script live in design/005. Client art is 24,410 bytes. No new paid services, licenses or generation credits were used. Native serif availability differs in Figma, so its body-text studies use Inter; the browser implementation is authoritative.

Pixabay identity, author and original dimensions verified at https://pixabay.com/photos/sunset-basketball-people-silhouette-5383040/ . License summary https://pixabay.com/service/license-summary/ and full terms https://pixabay.com/service/terms/ permit adaptation subject to prohibited uses. The photograph is generic context, not an October 7 game image or an endorsement.

Dean Smith source: https://commons.wikimedia.org/wiki/File:Dean_Smith_cutting_down_the_nets,_Duke_Chronicle_1982-12-03_page_21.jpg . Commons states U.S. public domain from publication without notice and no timely registration, and explicitly warns of copyright in countries not applying the shorter-term rule. It is excluded from this globally accessible candidate. Original Blender artwork is the safe alternative pending an appropriate rights decision.

## Validation

npm run lint; npm run build; node scripts/check-005-review.mjs; node scripts/check-005-visual.mjs all pass. Browser checks cover desktop 1280 × 900, phone 390 × 844, narrow 320 px reflow, section navigation, preserved signoff, play/pause, 15-second controls, 90-second seeking, 1.5× speed, exact transcript-file equality, sources disclosure and copied canonical link. No console errors. Entry targets are 46 px on phone. Text contrast pairs range from 5.66:1 to 14.97:1. Keyboard skip link receives a visible solid focus outline. An archived issue was inspected and loads no visual stylesheet or assist artwork.

Current audio duration 168.530542 seconds; approved MP3 SHA-256 8e6426abbf224c78839264b5f75cb3cf4e3f8e5b8bd92e1daf32ee64cfd51259.

## Review boundary

Independent visual QA and owner approval remain pending. Owner approval for the complete v10 revision and any interior licensed-photo choice remain pending. This branch does not change published content or deployment settings. Screenshot evidence includes the host browser's floating extension UI in some captures; those controls are not part of the site.
