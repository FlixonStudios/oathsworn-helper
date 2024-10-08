# Unofficial Oathsworn Might Advisor (UOMA) Module

## Foreword

### Overview

This module provides tools to provide visibility on the probabilties for skill checks and empower combination to help optimize your decision making.

### The Problem

Before drawing cards, you have declare how many cards to draw from each deck. There exists a max of 4 decks and the maximum no. of cards you can declare to draw is 10. The 'state' of these decks may not be 'fresh' (i.e. there may be some cards already drawn and have no chance of being drawn again till the deck is reshuffled) at the point of card declaration.

Each card drawn has a value and the total is summed up and usually compared to some value (in most cases, a higher total is a preferred outcome). The key rule preventing simply declaring the maximum no. of cards to draw each time is that whenever two cards of value 0 is drawn, a 'miss' is triggered bringing the summed total to 0 regardless of what the actual summed total of the drawn cards are.

Another rules that add complexity:

- Every deck has cards that when drawn, allow you to draw another. The extra card drawn will not be counted towards a 'miss'

The distribution of cards remaining in each deck is known and, as mentioned, you are allowed to decide the no. of cards and from which decks to draw. This means that it is technically possible to calculate the probability of certain scenario (e.g. Deck 1: Draw 2, Deck 2: Draw 1, Deck 3: Draw 3 => Probability of hitting total of 5: 70%, if 6 cards are drawn).

Compared to, say, being forced to draw X cards from Deck X. This leads to a tendency to guess-timate the scenario which leads to the highest probability of success - and the no. of scenarios to consider is non-trivial.

## The Solution (The Advisor)

It consists of three main pages: **Skill Check**, **Damage Advice**, and **Decks**. These tools simply present the probabilities of each scenario to the user.

### Definitions

- Might: The 'base' no. of cards that you may draw from the deck

### Assumptions

- No Redraws
- Cards drawn from 'Critical' draws occur after normal cards drawn

### Features:

- **Skill Check**: Given a summed total to achieve, displays the top 4 card draws needed to hit the skill check value.
- **Damage Advice**: Input your empower bonus, and the app calculates the top card permutations for the highest average damage.
- **Decks**: Manage your decks to track card probabilities, affecting the outcomes of draws on other pages.

### Pages

#### 1. Skill Check

This page allows users to:

- **Select Difficulty**: Choose the level of skill check you want to perform.
- **View Suggested Draws**: The app displays the top 4 cards to draw that match or exceed the skill check difficulty.

#### 2. Damage Advice

This page provides:

- **Empower Bonus Input**: Select the empower bonus you currently have.
- **Damage Permutations**: The app calculates all possible might card draws, showing the top 4 cards with the highest average damage output.

#### 3. Decks

On this page, you can:

- **Manage Deck States**: Set up the current state of your decks. This affects the results of card draws in other sections of the app, such as Skill Check and Damage Advice.

### Future features:

- Include analysis for Redraws