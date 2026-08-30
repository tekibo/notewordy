# @notewordy/convert_as

Converts Assamese text between Geetanjali (legacy font) encoding and Unicode.

## Install

```sh
pnpm add @lachit-ts/core
```

## Usage

```ts
import { geetToUni, uniToGeet, sanitise } from '@lachit-ts/core';

// Geetanjali font text to Unicode
const unicode = geetToUni('Î¦¤Á±');

// Unicode to Geetanjali font text
const geetanjali = uniToGeet('অসম');

// Spell-correct and normalise punctuation
const cleaned = sanitise('অসমীয়া');

// Convert and sanitise in one step
const result = geetToUni('Î¦¤Á±', { sanitise: true });
```

## API

### `geetToUni(text, options?)`

Convert text from Geetanjali font encoding to Unicode Assamese.

### `uniToGeet(text, options?)`

Convert text from Unicode Assamese to Geetanjali font encoding.

### `sanitise(text)`

Perform spelling corrections and punctuation normalisation on Assamese text. Replaces common misspellings, normalises diacritics, and fixes punctuation spacing.

Both `geetToUni` and `uniToGeet` accept an optional `sanitise` option (`{ sanitise: true }`) to also run spell correction on the result. Spell correction is not applied by default.
