# Design source of truth

The approved published Standard 005 is commit b11bb15c569377e68560c3d4a71d0e8f80ec278f. Its article, transcript, audio, publication metadata and previous editions are immutable in this visual review. The reader implementation is authoritative; the editable Figma file contains layout studies and a separate share-card proposal: https://www.figma.com/design/cKkQPuoX4kouKoFpAyHuG9 .

## Brand and visual language

AVC's approved Suns dashboard provides the reference discipline: a cinematic sports opening, strong condensed headlines, precise utility labels, restrained orange accents and clear reading sections. Standard 005 adapts that discipline to an essay: navy, warm ivory, copper, Barlow Condensed headlines, IBM Plex Mono labels and native book-serif reading text. The original Blender sculpture represents a supported result; it depicts no actual game, person or event.

## Product goals

Make the approved essay and audio easy to enter, read and revisit. Keep the client fast with a 24 KB hero, local fonts and no new service or paid generation.

## Personas and jobs

Mat and other leadership readers need a clear principle, practical application and an optional exact audio edition on desktop or phone.

## Information architecture

Publication identity → title and thesis → reading/audio links → neutral audio player and exact transcript → five essay sections → question → Standard and exact signoff → sources and actions.

## Design principles

Use hierarchy and whitespace to support the argument. Keep the body quiet and legible. Confine the sports imagery to contextual decoration. Preserve words, source accuracy and working controls.

## Components

Issue-scoped hero artwork, headline, entry links, existing AVC audio player, transcript disclosure, section navigation, essay headings, question panel, closing and sources. Only issue 005 loads the new stylesheet. Shared player and archived edition styles remain byte-identical.

## Accessibility

Semantic headings and native disclosure controls remain intact. Decorative artwork has empty alt text and is hidden from assistive technology. Visible focus outlines, 44–48 px entry/navigation targets, high-contrast text and motion-free issue reveals support reading and keyboard use. Body text is 20–21 px with generous line spacing.

## Responsive behavior

Desktop uses an art-and-title hero and a 690 px essay column with a narrow section rail. At 900 px the reading layout becomes one column. Phones have 20 px gutters, stacked hero text then artwork, a full-width audio module and expandable contents. Verify 320 px and 390 px without horizontal overflow.

## States

The existing play/pause, seeking, speed, download and transcript states remain unchanged. Audio never autoplays. Expanded transcript/source notes wrap within the reading column. Print hides decorative art and restores white backgrounds.

## Voice and content

All approved v9 words and the exact signoff “Much love my brother. Dominate!” are preserved. No new personal stories, factual captions, study claims or data graphics are introduced.

## Constraints

Review branch only; no publication or delivery. Local Blender and native Figma APIs only, no new credits. Preserve Suns repositories and the original stalled worktree. Font OFL notices travel with copied font assets.

## Open questions

The selected Pixabay composite is optimized and wired into review-branch OG/Twitter metadata for the complete v10 review. Owner approval remains required before release. The requested Dean Smith newspaper image is public domain in the U.S. according to Commons, which expressly warns of copyright in countries that do not apply the shorter-term rule. It is excluded from this globally accessible candidate pending an appropriate rights decision; the original sculpture is the safe alternative.
