---
title: How I do my computing.
status: draft
snippet: This is me documenting the always ongoing project of getting my developer setup nice.
createdAt: 2024-01-24T19:15:00Z
updatedAt: 2024-01-24T19:15:00Z
---

## Table of contents

<!--toc:start-->

- [Table of contents](#table-of-contents)
- [Brief Introduction](#brief-introduction)
- [Font](#font)
- [Colors](#colors)
- [Hardware](#hardware)
  - [Peripherals](#peripherals)
  - [Computer](#computer)
- [Terminal](#terminal)
  - [Emulator](#emulator)
  - [Multiplexer](#multiplexer)
  - [Shell(s)](#shells)
  - [Tools](#tools)
- [Apps](#apps)
  - [Editors](#editors)
  - [Window management](#window-management)
  - [Utility](#utility)

<!--toc:end-->

## Brief Introduction

I'll attempt to keep this post up-to-date with my latest configurations, mostly
because it's fun to dive deep into these things to find small optimisations in
my own workflow. I have all my configuration for all tools in a
[dotfiles repository](https://github.com/damoonrashidi/dotfiles) on Github.

## Font

The rest of these things might seem more esoteric, or a bit too much in some
cases, so typography seems like a safe choice ot start with.
[Monaspace Krypton](https://monaspace.githubnext.com/) is my font of choice for
editors and terminals, it's free and open source and provides a variable font
version so it fits almost anywhere. When possible I also disable italics. The
most controverersial thing here is that I bump line height up to 2.5 _em_ as I
find it to improve legability by _a lot_ in codebases.

Here is a screenshot of how it looks in my editor

![alphabet](/articles/how-i-do-my-computing/alphabet.png)
![code](/articles/how-i-do-my-computing/font.png)

## Colors

Pretty much all my apps use the [Rose Pine Theme](https://rosepinetheme.com/).
It's high enough contrast without being jarring and it provides a very good
light theme as well as a dark theme. Here comes the first controversy. I use
both light and dark theme depending on time of day. This is done by a tiny rust
application I've written that checks the sunrise and sunset times for my current
location and changes the config files for my terminal and editors when it's dark
out. The terminal application has live-reloading, so when the config changes the
terminal UI updates instantly, and so does my main editor.

My browser is always in light mode though, as well as my operating system, but
that's because I feel that most dark mode designs are much worse than their
lightmode counterparts.

## Hardware

### Peripherals

I use a Ferris Sweep, which is a split keyboard with 34 keys and is loaded with
the [Miryoku](https://github.com/manna-harbour/miryoku_zmk) config which uses
Colemak as the key layout. Besides the obvious ergonomical benefits of using a
split keyboard, this choice will make a lot more sense when paired with the rest
of the software which heavily uses keyboard combinations that are much easier to
reach with things like
[home row mods](https://precondition.github.io/home-row-mods) and Colemak.

### Computer

Apple M1 Macbook Pro for work, but the more fun setup is my personal computing
setup which is just a Samsung S6 Tablet that I connect the Ferris Sweep to and
then SSH into a Github Codespace where the entire terminal section below is set
up as well (via a dotfile configuration that is cloned into the codepsace). It's
ultra portable, pretty cheap with Github Pro and works exactly like developing
locally with the caveat that it's bound to the terminal.

## Terminal

Here comes the bulk of this post, there is a lot of config here.

### Emulator

Currently I swap between the tried and true [iterm2](https://iterm2.com/) which
has great for years, while it's super configurable, the preferences UI and the
XML based config files aren't superfun, so I'm currently evaluating
[alacritty](https://alacritty.org/). Alacritty is also very configurable,
setting up a default shell and having it run [zellij](https://zellij.dev/) on
boot was easy peasy.

### Multiplexer

As mentioned, going with [zellij](https://zellij.dev/) on this one. It has very
good defaults and actually displays the keyboard shortcuts on the screen for the
mode you're in, this can be disabled in the config but really helps when
learning the basics. Zellij is also configured to run when I start alacritty.

### Shell(s)

My default shell is [zsh](https://zsh.sourceforge.io/) with
[oh-my-zsh](https://ohmyz.sh/), but recently I've been experimenting with
[nushell](https://www.nushell.sh/). While `nu` is pretty different from `zsh`

### Utility

## Apps

### Editors

### Window management

### Utility
