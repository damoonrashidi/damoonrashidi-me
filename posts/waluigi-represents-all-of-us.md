---
title: Waluigi represents all of us.
createdAt: 2023-12-23T22:19:00Z
updatedAt: 2023-12-23T22:19:00Z
status: published
snippet: On being cognizant on why you as a scale-up should focus on creating Super Marios instead of Waluigis.
---

The better part my career has been spent almost exculsively as an Individual
Contributor, Lead Developer or Engineering Manager or some combination of the
three in self-proclaimed scale up SaaS companies. Companies that had already
found their niche, a solid customer base and were profitable (or close to)
before I joined. What I like about these types of companies is that things
usually aren't in a panic, but resources are still finite and treated as such.
Teams are usually small and focus has to be sharp, as the opporunity cost of any
misguided venture is steeper than for companies with more room to make bad
investments. Personally, I think it's fun balancing these contraints with trying
to be innovative and building good product.

The shared truth between all those SaaS scale ups was that a core product had
been developed that solved a very specific problem for some target market, and
the market was large enough to justify the existance of a company to staff
developers that would maintain that product, but what was next?

## No one buys WinRAR.

The [axiom](https://en.wikipedia.org/wiki/Axiom) that the tech world has all
settled on is this, simply having a successful product that solves customer's
problems isn't enough. Investors must eat too, the
[TAM](https://en.wikipedia.org/wiki/Total_addressable_market) must grow and
scale ups must scale, it's in the name, anything else would be illegal. So, off
we go chasing infinite growth and now our cURL GUI needs to raise
[_another_ series of $225M in investments](https://www.postman.com/company/about-postman/#the-investors).

For arguments sake, let's say we're developing an online UML drawing app, you
can draw some shapes and export to png, that's it. That's the entire application
that our customers are using. We also track some internal metrics on this, such
as "diagrams created per day", "average diagram complexity" and use those are
our KPIs.

Often times it's easy to say "we already have these stats, aggregated by
customer, why not build a dashboard for the end user so they can see their own
stats". _It's low hanging fruit, why not do it?_

Next up for the UML drawing app someone thought it would be a good idea to be
able to draw free hand images as well, not just UML diagrams. A case could be
made that that is an well worth pursuit, bringing the UML diagramming tool more
into the space of Whiteboarding. The TAM has grown, investors have been fed.
Then, naturally, since we already have a dashboard to show statistics for UML
diagrams, some stakeholder looking to add some cohesion to the product will
invariably say "images should also have a dashboard", or worse yet "should also
be represented in the same dashboard" (usually without being able to produce a
customer who expressed this need).

## Enter, Waluigi

<blockquote>
"Waluigi is the ultimate example of the individual shaped by the signifier.
Waluigi is a man seen only in mirror images; lost in a hall of mirrors he is a
reflection of a reflection of a reflection. You start with Mario – the
wholesome all Italian plumbing superman, you reflect him to create Luigi – the
same thing but slightly less. You invert Mario to create Wario – Mario turned
septic and libertarian – then you reflect the inversion in the reflection: you
create a being who can only exist in reference to others. Waluigi is the true
nowhere man, without the other characters he reflects, inverts and parodies he
has no reason to exist. Waluigi’s identity only comes from what and who he
isn’t – without a wider frame of reference he is nothing. He is not his own
man. In a world where our identities are shaped by our warped relationships to
brands and commerce we are all Waluigi."
<figcaption>u/[deleted] on <a class="text-link" href="https://www.reddit.com/r/copypasta/comments/5qctnl/waluigi_represents_all_of_us/">reddit</a></figcaption>
</blockquote>

In the beginning there was only Mario, and to be able to play two player games,
Luigi was created. Luigi's purpose is as an accompaniment to Mario. Then Mario
needed an adversary, so Wario was created, an inverted reference to Mario.
Finally with the
[release of Mario Tennis](https://en.wikipedia.org/wiki/Waluigi), where double
matches could be played and Mario and Luigi being a natural pairing, Wario
needed a partner too, so Waluigi was created. He was created only as a reference
to a copy, _he has no value unto himself._

Out of pocket political and social commentary aside, the gist is: Things should
be built because they have value unto they themselves, not in reference to other
features, they should even be their own
[eigenvalue](https://en.wikipedia.org/wiki/Eigenvalues_and_eigenvectors), so
that when the systems they reference change, they can remain constant. Because
unlike Mario, who is eternal, features and code bases race towards entropy with
every new thing added, and if Mario changes then suddenly Waluigi must change as
well.

<strong>Suddenly we end up developing a feature that itself doesn't have any
directly apparent value, it only exists in reference to another feature and
<strong>there is a non-negliable cost of maintaining it</strong>, especially as
the feature it references grows.</strong> The UML diagram is still the company's
bread and butter, more effort will be put into developing the UML dashboard, and
soon enough some stakeholder will invariably question why this Image dashboard
doesn't have all the feautes or the UML diagram, or worse yet, someone within
the company will say _"I didn't even know we had an Image Dashboard"_ and
someone else will answer _"Ah, yes, but no one uses that one"_.

## Look at all the things I haven't done.

A lot of things are unfortunately easy to do. We have all this pristine data
just waiting for more use-cases, but being _easy enough_ isn't reason enough to
validate a product or features existance. Good developers are often good at
[saying no](https://grugbrain.dev/#grug-on-saying-no), but people are rarely
praised for work they didn't do. The success of one feature cannot easily be
attributed to the _non-development_ of another, especially as an organisation is
easily likned to a
[complex dynamic parallel process](https://codahale.com/work-is-work/#corporate-americas-next-top-model).
Developing a good product is difficult, writing good software that is both easy
to use and easy to maintain is difficult, and knowing why you succeed even with
the benefit of retrospection is difficult, as the only vantage point we can take
is
[emic](https://laulima.hawaii.edu/access/content/user/millerg/ANTH_200/A200Unit1/EmicEtic.html).

> "It's just another couple hundred lines of code"

The true cost of development isn't just the number of lines it took to deliver
the feature. Even if development time might be close to zero and the feature is
in the lower left quadrant of the
[action priority matrix](https://www.productplan.com/glossary/action-priority-matrix/).
The ratio of value to maintenance cost will approach zero for a poorly vetted
feature when it has to be maintained in perpetuity, especially when
[3rd party dependencies](https://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code)
[break](https://www.thegingerviking.com/the-right-to-delete-fakerjs-fragile-nature-open-source/)
while being littered throughout code bases with tight couplings and
[bad abstractions](https://www.deconstructconf.com/2019/dan-abramov-the-wet-codebase).
Now, all of a sudden, this bearly used implementation has expanded the surface
area of things to fix when things change or break.

In summary, I think there is a lot of value of being cognizant of when you are
writing a feature that stands on its own legs, a Mario, or when it's not
justified unto itself, a Waluigi.

## Disclaimers

_Disclaimer: Waluigi is my favorite Nintento character and I picked him all the
time when playing Mario Tennis on the N64._

_Disclaimer 2: People do buy WinRAR._

_Postman does more than put a GUI over cURL, but not half a billion dollars
more, in my opinion._
