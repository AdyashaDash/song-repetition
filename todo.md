("*" bullet = high priority. "-" = nice-to-have.)

## Compression animation
- arrow stuff...
    - nicer trajectories
    - give dest highlight a bit of a headstart before the arrow arrives
- special case dittos that start on a newline so they don't look so funny
- underlining animation should probably accelerate. (But doing so across lines is probably tricky.)
- helper class for json cache
- in setLastDitto, if add an increasing delay to ravels after the first one, so that if a bunch of them come in at once, they sort of get drawn in order

### compression-tutorial.js
* seems like scrollmagic kind of goes haywire on refresh and cycles through a bunch of stages in quick succession for inscrutable reasons. Maybe need to just put the whole thing behind some kind of delay or onLoad callback?
    - I think part of the problem might be dynamically adding the compression-tutorial slide/stage elements dynamically. They take up a lot of space, so whenever they get added, the page shifts around a lot.
- when scrolling up to the defrag scenes, we should just draw the final result of the defrag without any delays/animations. 
- some of the slide wrappers have enough padding between them that you can scroll to a point between them such that neither is visible (violating the rule that there always needs to be something moving up when the user scrolls). Maybe insert some dummy '...' elements between them or something?

### compression.js
- maybe just have this as a standalone page somewhere and link to it in the body? The scrollytelling version already does a pretty good job of explaining the algo. It's not clear most readers will want to run through more (full song) examples after. And it takes up a lot of space.
* better controls
    - switch between play/pause as appropriate
    - try a slider for speed controls
- ability to control minimum match size. This'd be a nice thing to include in a standalone version.

## Histogram
- annotations for the outliers

## Most repetitive songs
* headings
* animated transitions when adding/removing rows, or switching between decades
- show something like an excerpt of a song's lyrics when hovering/selecting it
    - mini gif version of compression, inline
- deal better with overly long track labels (truncate rather than wrapping to next line? as it is, the extra height on an overflowed row sort of messes up the look of the table)
- object constancy

## Repetition through the ages
* ylabel
- add a legend after adding orange line? or maybe just a label pointing to the new line.
- maybe do major/minor grid lines for y axis? (and x?)
- bottom padding on last card a little too small

## Artists beeswarm
- artist faces
* label axes (maybe in a way that's consistent with whatever's done in discog)

## Discographies
- nicer artist-picker
    - one reader suggested arranging from most-to-least repetitive?
- consider looking at a particular artist's discography (e.g. the Tswift example from Ipython notebook) and talking through some observations, before unleashing the selection of all artists in the dataset.
- histogram backdrop
    - smoothing
    - maybe scale up max height according to number of songs (would help contextualize a discography like TSwift's)
* force text into bubbles (truncating if necessary)
- profile. Seems a bit laggy at times.
- highlight a few examples of artists with interesting discographies (maybe as an alternative to blathering through a specific example)
- may want to limit number of songs per artist (Tswift's discog is v crowded right now)
- a lot of now-obscure artists from 60s/70s (Brenda Lee? Herman's Hermits? The Hollies?) taking up space in the dropdown. May want to restrict data for this chart to the last 4 decades, or be more selective for earlier decades.

## Multi-chart todos

## Code stuff
- clean up console.log spam
* Review the many, many TODOs and XXXs in code.

## Data
- Consider doing more normalization before compressing. As a way of removing non-meaningful variations in how lyrics are transcribed that could lead to different compression ratios.
    - lowercase everything
    - strip newlines
    - strip punctuation
    - asciify
- Consider loosening criteria for artist/discog charts, include featured artists.
- I would love to increase the minimum match length, because I think 3 captures too many incidentally repeated substrings that aren't really instances of the kind of repetition I'm interested in. But that's possibly a lot of work. Probably.
    
## Prose
* Link to Around The World lyrics. Probably not possible to find a non-scummy/ad-bloated lyrics site. Maybe just host text file in assets, or pointer to file in github repo.
- Refactor into hbs file per section
* speculating on the 'why' of the trends
    - worth mentioning possible experimental biases? Might be too technical/uninteresting.
    - my claim about golden age of hip hop is pretty wild speculation. I don't know if this period actually coincided with extraordinary success in the hot 100.
- shorten/simplify prose before discog section. Brief comments on default artist discog and pointers to interesting examples.
- conclusion
    - story sort of starts with Q of whether music is getting more repetitive
    - which is basically answered after the trend-over-time graphic
    - the stuff after that is just gravy. Like, "oh, and here's some other neat stuff for exploring the data at a more granular level"
    - So not clear how the piece should end. Just reiterating the conclusion that "yeah, it does seem like music is getting more repetitive after all" seems kind of lame.
    - Maybe just move the repetition-over-time graphic to the end?

## Misc
- Would be nice to connect graphics somehow since they're so naturally hierarchical. Like, when exploring the artist comparison chart, it'd be great if you could select one of those artists and jump to the discography widget for that artist. And then even jump from a particular song in that discography to the corresponding compression graphic.
- Would be nice to define some common design element to use for 'small print' stuff, like explaining logarithmic scale in topsongs, rolling average in overtime, etc.
* If the intro is going to use the Beyonce vs. Queen meme, it seems appropriate to use 'Girls'/Bohemian Rhapsody at some point as examples.
