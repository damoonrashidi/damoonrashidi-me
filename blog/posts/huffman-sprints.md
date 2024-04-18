---
title: Huffman sprints
status: draft
snippet: It is impossible to express an opinion on this without just adding to the endless pile of poorly written noise on the already toxic topic where everyone else has an opinion on how everyone else is doing it wrong, but here I go writing an article and expressing opinions and I guess I hate myself for it
createdAt: 2024-04-14T23:31:00Z
updatedAt: 2024-04-14T23:31:00Z
---

## Modern scrum

There are already thousands upon thousands of articles on scrum, agile, kanban, SAFe, XP and all other types of processes invented to bring some sort of insight into the software delivery life-cycle. It is impossible to express an opinion on this without just adding to the endless pile of poorly written noise on the already toxic topic where everyone else has an opinion on how everyone else is doing it wrong, but here I go writing an article and expressing opinions and I guess I hate myself for it.

Emperically it's also impossible to pitch a scrum alterantive without wrapping it up in needless terminology for no reason other than letting Agile Coaches and Certified Scrum Masters being able to pretend they know something about delivering software that everyone else does not. So that is what I've done. This entire article could be summed into "make the work as small as possible then do the work", but that won't convince an important middle management manager managing a team.

## A brief definition of scrum

Traditionally, scrum works like this, you pick a cadance for your sprint, usually two or three weeks, you then look at the scope of work that has been groomed and estimated into Story Points using Planning Poker to produce Fibonacci numbers, the magical abstraction that cannot be equated to time even though the number of story points you can deliver are tied to the length of the sprint which is measured in time.

You then look that your team velocity which has been measured over several two week sprints to generate some rolling average of how many story points were completed historically, which will in turn give an estimate on how many story points can be delivered this sprint. Let's say that historically your team's velocity has been 100 Story Points, you now go off and start finding prioritized tasks which estimations sum up to 100, even if at the end of it no no real value was produced, since you needed to be able to finish 113 points to finish of that feature that would help your customers.

## A brief history of Tetris.

In 1984, Tetris was released on the original Game Boy. The game features seven different types of Tetriminos (or "pieces" if you're not a nerd and don't know the official name of Tetris pieces), O Z S L J T I.

The strategy used to generate which Tetrimino was next up was simply "pick one at random". This could mean that you got the same useless Z piece three times in a row, or go twenty pieces before you get the coveted I piece.

Later versions of the game had a more balanced approach to the Tetrimino picking algorithm. You start the game with an empty bag and then you fill it with one of each of the possible seven Teriminos. You then reach into the bag and select a piece at random, removing it from the bag and that one is the one the player will get. Next round you reach into the bag that now contains six pieces again, and pick one out. Repeat the process until the bag is empty at which point you refill the bag with all seven pieces.

This ensures that each piece will be drawn after seven draws, while still being able to get the same piece back to back, if it was the last out of one bag and first out of the next bag, making the game still feel somewhat random. However waiting 40 rounds for an I piece if no longer possible.

What wouldn't make sense is to first decide that your Tetrimino bag could only hold five Tetriminos when you need to fill it with seven Tetriminos.

## The Huffman sprint
