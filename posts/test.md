---
title: Test
createdAt: 2023-12-21T22:19:00Z
updatedAt: 2023-12-21T22:19:00Z
snippet: Test post
---

This article will describe the method and concepts I used to create the series
of generated art works pictured below, as I understand them. The algorithm, and
code examples, that will be provided can however generate a great set of
variations of flow field images. As a note, far more talented people than me
have written articles on the subject which I strongly suggest reading.

Wildfire Regions Sands The main driving force behind a flow field is usually a
noise function, most typically it's something like simplex noise. Without
regurgitating the wikipedia article, the simplex noise (and perlin noise also
for that matter) function returns a value between -1 and 1 for any given point
in a 2D (or 3+D) space. The value for a given point will be similar to the value
of the surrounding points, only with a small variation. const noiseValue =
noise(x, y) for reference.

The images below attempt to illustrate this.

Flow field in digitsFlow field You can see how this might be useful for
constructing flow fields. If you start by picking any random point and checking
the noise value for that point you can then move a step to the direction of the
noise value. Once at the new point you repeat the process with the noise value
of the new current position of [x,y]. Doing that with 1000 random starting
points would yield the flowy effect pictured below.

Flow Field Result Moving the dot is achieved by incrementing the dots x-position
by Math.cos(noiseValue) and the y-position by Math.sin(noiseValue), or you can
flip the cos and sin functions to and see what happens! Or throw in tan(x),
sin(y), whatever is in your heart!

You can also increase the travel distance by multiplying the cosine and sine
values by some constant. Math.sin(noiseValue) * 2. The smoothness of the noise
value could also be affected by manipulating the noise value that is fed to the
cosine and sine functions, playing around with using Math.cos(noiseValue / 2.2)
will yield something entirely different than just Math.cos(noiseValue).

Different noise functions I'm a software developer by trade, not a
mathematician, so I'm not going to go into detail about how to write a good
noise function, because I don't know how. I do however know how to write a
function that takes an x and a y value and returns similar values for similar x
and y values.

The first one pictured below, swirl, takes the the distance from x to the center
of the image, and the same for y, and then returns the hypotenuse for that
imagined triangle. The second image is the exact same function but instead of
feeding the x and y values to the noise function as they are I divide them by an
arbitrary number, (swirl(x / 400, y / 400)), this smooths out the resulting
value and gives a pleasing swirling motion. Differently sized divisors will
yield different results.

swirlswirl modified The second one, toCenter calculates the angle between the
the point \[x,y\] and [imageCenterX, imageCenterY] and returns that times PI.
Again, I'm not good at math, I'm just taking some values that I'd imagine would
make sense to someone who is good at math and playing around with them.

swirl modified

function swirl( x: number, y: number, width: number, height: number ): number {
const centerX = width / 2; const centerY = height / 2; const distanceX =
Math.abs(centerX - x); const distanceY = Math.abs(centerY - y); const distance =
Math.sqrt(distanceX ** 2 + distanceY ** 2);

return distance; }

function toCenter( x: number, y: number, width: number, height: number ): number
{ const centerX = width / 2; const centerY = height / 2;

const angle = Math.atan2(x - centerX, y - centerY);

return angle * Math.PI; } Ending the lines Deciding on when to end the line also
greatly affects the final result. Personally I like to use a combination of
techniques like collision detection, max line length, and a random chance to end
the line.

The max line length could either be a constant that is the same for all lines,
yielding a more uniform result, or you can set a list of maxLineLengths and
picking one randomly for each line. Maybe even picking the longer ones if the
line starts closer to the top, or the further away from the center of the image
the line starts, or so on.

A note on collision detection I'd like to preface this by saying that I have
done absolutely no research on this topic, how to optimize it, or if there are
better ways to do it. I do like to convince myself, however, that this is art
and the code doesn't need to be good. Having said all that, this is how I did
collision detection to have each line avoid hitting any other lines.

Since we're not really drawing lines but rather overlapping points with radius R
to achieve a line effect we can easily see if our line is about to collide with
another line. We just have to see if the circle we are about to draw is going to
overlap with any other circle we've previously drawn, except for the ones in the
current line.

Checking if two circles are overlapping is easily done by taking the position of
the two circles, figuring out the distance between them, and then seeing if the
distance is less than the sum of the two circles' radii. The distance can of
course be done with pythagoras theorem so the entire check is no more than:

interface Circle { x: number; y: number; radius: number; }

function distance( a: Circle, b: Circle ): number { const x = Math.abs(a.x -
b.x); const y = Math.abs(a.y - b.y);

return Math.sqrt(x ** 2 + y ** 2); }

function collidesWithAnyCircle( circle: Circle, circles: Circle[] ): boolean {
for(const match of circles){ const radiiSum = circle.radius + match.radius; if
(distance(circle, match) < radiiSum) { return true; } } return false; }

Limiting the search space When playing around with different techniques and
formats I usually do things in about 2k x 2k pixels which looks good on a
monitor but doesn't work well for print. If I'd like to print an output in a
reasonable size (like 50cm x 70cm) it needs to be at least like 4k x 7.2k px to
look sharp. This means adding more stuff to fill the space (obviously). Meaning
we'd have to fill the canvas with exponentially more circles.

A lot of time can be saved by searching for collisions with only the circles
that are close to the circle that is currently being evaluated. Quadtrees are
one way of doing this, but I went for an easier method by overlaying a grid over
the entire canvas, and then mapping a position to a cell in the grid. The
relation of the circle size relative to the size of the cells in the grid is
important. If a circle is too big to reliably fit in inside a cell it might
collide with a circle in a close by cell.

grid This isn't a huge problem for me though, since I'm often not looking for
perfection in the output, a few imperfections might even be favorable, so
experimenting with different values for the cell size is also fun. If you'd want
to be more precise you could also check against collisions in the surrounding
cells, if a circles center is at the very edge of a cell and the circle body
spills out into nearby cells. This would increase the search space by a factor
of nine though.

One hacky thing I did was also to check only against every Nth circle in the
cell to save some render time. Since circles are inserted into the cell in
order, meaning any circle is probably very close to it's neighbors, it means
that we don't really need to check if a circle collides with any other circle,
just a few of them. The higher the N value the more chance of a collision or
small overlap at the end of a line, but you gain a lot in terms of render time.
Again, the result doesn't always have to be pixel perfect. Something like the
code below would be a faster obviously, and in a lot of cases work just as well.

//Check only every 7th circle in this cell to save time for(let i = 0; i <
circlesInCell.length; i += 7) { const match = circlesInCell[i]; const radiiSum =
circle.radius + match.radius; if (distance(circle, match) < radiiSum) { return
true; } } return false;

Colors and variations Keeping with the theme of the rest of the article, there
are a lot of fun ways of working with colors in flow fields. You can select a
different color for each line, or color by the starting noise value for the
line, or have the line pick the color by the region of the canvas it spawned
(All depticed below).

gridgridgrid Closing notes I hope that this article has provided at least some
insight that other articles on the topic didn't, since there really is a lot of
variation that can be achieved when playing with flow fields. For my Forces
series each generated piece used a configuration that followed the interface
below, and a lot more parameters can of course be added to create even greater
variaty.

```typescript
export interface ForceConfiguration {
// A list of colors colorScheme:
lib.Palette;

// Allow lines to flow into eachother
collisionDetection: boolean;

// DEPTH | REGION | RANDOM_FROM_PALETTE
colorMethod: ColorMethod;

// DISC | SQUARE | ...
shape:ForceShape;

// How much of the canvas should be covered in lines
density: number;

// Canvas size in pixels
dimensions: { width: number; height: number; };

// What circle radii are allowed for lines 
strokeWeights: number[];

// How close to the edge of the canvas are the lines allowed 
edgePadding: number;

// Allow some lines to go beyond the allowed area? 
allowEdgeOverflow: boolean;

// for each circle in a line, how much bigger should the next circle be? default 0
brushGrowthRate: number;

// minimum amount of space around each line
linePadding: number;

// step size for dot in a line, to achieve the dotted effect in the first images
resolution: number;

// CIRCLES | SQUARE, ... 
brushType: BrushType;

// Math.cos(x) * noiseWarp
noiseWarp: number;

// Math.cos(x / noiseFactor)
noiseFactor: number;

// Seed for the noise function
seed: number;

// Default is Infinity
maxLineLength: number; }
```
