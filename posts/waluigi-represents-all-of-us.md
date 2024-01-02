---
title: Waluigi represents all of us.
createdAt: 2023-12-23T22:19:00Z
updatedAt: 2023-12-23T22:19:00Z
status: published
snippet: The axiom that the tech world has seemed to settle on is simply having a successful product that solves customer's problems isn't enough. The TAM must grow and investors must eat too.
---

This article started out as a satirical take on start ups but has since devolved
into my unhinged ramblings on product development and should be read as such.

The better part my career has been spent at self-proclaimed scale-up SaaS
companies. Companies that had already found their niche, a solid customer base
and were profitable (or close to) before I joined. What I like about these types
of companies is that things' usually aren't in a panic, but resources are still
finite and treated as such. Teams are usually small and focus has to be sharp,
as the opportunity cost of any misguided venture to "move the needle" is steeper
than for companies with more room to make bad investments. This article is aimed
mostly at these kinds of companies.

The common truth between all these scale-ups is that a core product had been
developed that solved a very specific problem for some target market, and the
market was large enough and the product mature enough to justify the existence
of a company to staff developers that would maintain that product, so now the
question is _what is next_?

## No one buys WinRAR.<sup> [*](#people-do-buy-winrar)</sup>

The [axiom](https://en.wikipedia.org/wiki/Axiom) that the tech world seems to
have settled on is simply having a successful product that solves customer's
problems isn't enough. The
[TAM](https://en.wikipedia.org/wiki/Total_addressable_market) must grow,
investors must eat too and scale ups must scale, it's in the name, anything else
would be illegal. So, off we go chasing infinite growth and now our cURL GUI
needs to
[raise _another_ $225M in investments](https://www.postman.com/company/about-postman/#the-investors).
<sup>
[*](#postman-does-more-than-put-a-gui-over-curl-but-500m-is-a-lot-of-money)</sup>

Since the Product has been
[Market Fitted](https://mailchimp.com/resources/product-market-fit/#heading+defining+product-market+fit)
but still needs to continue to grow we now need to go out searching for other
related problems to solve. We pick something from a roadmap or an opportunity
tree or whatever framework we're using and start to calculate the cost of it.

The first cost, and the easiest one to see is the upfront development cost, the
time from when a solution has been conceived until it's been deployed. It's the
easiest one to see because you already spend hours in plannings and groomings
breaking things down to get an estimate that isn't off by a power of ten. It's
hopefully also fairly small if you're good at pruning your MVPs because being
off by a power of ten for a small thing is better than being off a power of ten
for a big thing.

Second is the opportunity cost, the price we pay to work on this thing instead
of every other thing we could be doing right now. This one is fairly abstract as
the _what to work on_-decisions are often made further up in the coprorate
hierarchy and trickles down to engineering in the form of JIRA tasks or
roadmaps. You could argue that whatever we're doing _right now_ should be the
most imporant thing we could be doing, otherwise we obviously shouldn't be doing
it. We should be doing that other thing that is more important. But we're doing
this thing and the cost of it is not doing those other things.

Finally, the maintenance cost, what does it mean to keep this thing alive and
kicking. This one is often difficult to calculate, since code bases race towards
entropy in the midst of changing requirements, staff turnover making knowledge
ephemeral and 3rd party
[dependencies](https://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code)
[breaking](https://www.thegingerviking.com/the-right-to-delete-fakerjs-fragile-nature-open-source/)
while being littered throughout code bases with tight couplings and
[bad abstractions](https://www.deconstructconf.com/2019/dan-abramov-the-wet-codebase).

Adding these three costs together you end up with a number that (hopefully) is
smaller than the value of the feature produced. So when picking our Next Thing
To Do <sup>TM</sup> it's easy to overlook the a lot of these costs since you
most likely don't have processes in place to calculate them.

## Enter, Waluigi.

In the beginning there was only Mario, and to be able to play two player games,
Luigi was created. Luigi's purpose is as an accompaniment to Mario. Then Mario
needed an adversary so Wario was created. Finally, with the
[release of Mario Tennis](https://en.wikipedia.org/wiki/Waluigi), where Mario
and Luigi teamed up to become a doubles pairing, Wario needed a partner too so
Waluigi was created. We've kept going so much that we need to keep going.

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

Out of pocket political and social commentary aside, the gist of it is that
things should be built because their existence provide value unto themselves,
not because they somewhat fit into our product offering and it's _easy enough to
add another Waluigi to our product_<sup>
[*](#waluigi-is-my-favorite-nintento-character-and-i-picked-him-all-the-time-when-playing-mario-tennis-on-the-n64)</sup>.

Let's say for example that we're building a UML diagramming app that let's you
create UML diagrams and export them to a few different image formats. That's it.
Product Market fitted. We also have some internal metrics on this, such as
"Diagrams created per day" and "Diagram Complexity" aggregated by customer.

It would be easy to go "we already have this data, why not build a dashboard to
show the user how much value we provide, _it's easy enough to do_". So we
quickly add a dashboard with some filters.

Next up for our Diagramming app some stakeholders thought it'd be a good idea to
add the ability to do free hand drawings as well, bringing the app more into the
realm of online whiteboarding. We add some fields to our diagram model such as
`type: Diagram | Drawing;`<sup>
[*](#this-is-a-bad-idea-were-now-in-bad-abstraction-land)</sup>, add some mouse
events to our canvas and calculate some mouse position deltas and now we have MS
Paint. It's now Luigi o'clock.

TAM grown. Investors fed.

We originally set out to build the best diagramming tool we could but now we're
doing something slightly different. Even if companies wouldn't buy a license to
our freehand drawing tool on it's own it might still be a good accompaniment to
our original product.

Now, the logical next step would be to add a new dashboard (or worse yet, add
more tangentially related data to the original dashboard, fragmenting its
purpose), one for drawings instead of diagrams, since we already had all the
data for this new mutation available. It's now Waluigi o'clock. We've added a
new dashboard only to aim for feature parity and consistent APIs between
dashboards, not because it had any intrinsic value.

As the original Diagram Dashboard continues to grow, as more and more
functionality is added to diagrams, we'll observe how the maintenance costs for
the Image Dashboard continues to grow too. We've kept going so much that we need
to keep going. Filters added to diagrams will need to be ported over to images
otherwise it'll be left in some perpetual and incomplete v.1 state while the
feature factory keeps churning out more important things.

I'd go as far as saying that features should even be their own
[eigenvalue](https://en.wikipedia.org/wiki/Eigenvalues_and_eigenvectors), so
that when the product undergoes a transformation, the features with their own
identity can remain constant. Because unlike Mario, who is eternal, features and
code bases mutate with every new thing added and if Mario changes then suddenly
Waluigi must change as well.

## Look at all the things I haven't done.

With a lot of things unfortunately being easy to do, and when faced with low
upfront development costs it's easy to say yes to building something new
whenever some stakeholder asks for it because the proxy metric for value
delivered is "what have you shipped for me lately". It's therefore also
important to remember to point towards the opportunity and maintenance costs for
features too, as being _easy enough to add_ isn't reason enough to validate a
product or feature's existence.

<blockquote>"It's just another couple hundred lines of code"
<figcaption>- Person who doesn't factor in maintenance costs.</figcaption>
</blockquote>

Good developers are often good at
[saying no](https://grugbrain.dev/#grug-on-saying-no), but people are rarely
praised for work they didn't do. The success of one feature cannot easily be
attributed to the _non-development_ of another. Developing a good product is
difficult, writing good software that is easy to maintain is difficult, and
knowing why a certain feature succeeded even with the benefit of retrospection
can be difficult as the only vantage point we can take to evaluate the feature
(and the work building it) is
[emic](https://laulima.hawaii.edu/access/content/user/millerg/ANTH_200/A200Unit1/EmicEtic.html).

The true cost of development isn't just the number of lines it took to deliver
the feature. Even if development time might be close to zero and the feature is
in the lower left quadrant of the
[action priority matrix](https://www.productplan.com/glossary/action-priority-matrix/).
The ratio of value-to-maintenance cost will approach zero for a poorly vetted
feature when it has to be maintained in perpetuity, and time could be spent
doing something more valuable.

## To summarize this rant

I think there is a lot of value in being cognizant of when you are writing a
feature that stands on its own legs, a _Mario_, or when it's not justified fully
unto itself, a _Waluigi_, and when you do make a Waluigi, it's worth being
upfront about the maintenance and opportunity cost. Only after factoring these
costs in should you decide if it's truly worth doing, or if it's just easy.

## Disclaimers

###### People do buy WinRAR.

###### Postman does more than put a GUI over cURL, but $500M is a lot of money.

###### Waluigi is my favorite Nintendo character and I picked him all the time when playing Mario Tennis on the N64.

###### This is a bad idea, we're now in bad abstraction land.
