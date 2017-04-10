## Other
- animated illustration of compression algorithm

## Most repetitive songs
- make bars more intuitively clear
    - large -> small?
    - tooltips
- or just do bars based on compression %, not showing original size info
- headings
- NTH: show something like an excerpt of a song's lyrics when hovering/selecting it

## Repetition through the ages
- try a subtle scatterplot underlay effect
- fix animation bugs
- add a legend after adding orange line? or maybe just a label pointing to the new line.

## Artists beeswarm
- color artists by genre?
- take a constant number of artists per decade. Make the "All" view not so insanely packed.

## Discographies
- consider looking at a particular artist's discography (e.g. the Tswift example from Ipython notebook) and talking through some observations, before unleashing the selection of all artists in the dataset.
- histogram backdrop
    - is this comprehensible?
    - smoothing
    - colormap?
    - animate translation of the histogram when changing the artist
    - maybe scale up max height according to number of songs (would help contextualize a discography like TSwift's)
- force text into bubbles (truncating if necessary)
- bug fix: when changing artist, circles seem to fly in from the top (whereas they should start in the middle  at their 'true' positions, then repel apart)
- profile. Seems a bit laggy at times.
- highlight a few examples of artists with interesting discographies (maybe as an alternative to blathering through a specific example)
- may want to limit number of songs per artist (Tswift's discog is v crowded right now)
