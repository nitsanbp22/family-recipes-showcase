# AI-Assisted Recipe Intake

Family Recipes uses Gemini API as part of a server-side intake workflow that turns messy recipe inputs into structured data that can be reviewed before saving.

## Product goal

The goal is not to add AI as a standalone feature. The goal is to reduce the amount of manual transcription required when a recipe arrives as:

- a screenshot
- one or more images
- copied text
- a social-media caption
- a shared link with unstructured context

The user should be able to capture the recipe quickly and then review a structured proposal instead of starting from a blank form.

## Workflow

```text
User shares recipe input
        ↓
Authentication and family scope validation
        ↓
Source detection
        ↓
Input normalization
        ↓
Gemini-assisted extraction when relevant
        ↓
Structured proposal
        ↓
Review and correction
        ↓
Save into the family library
```

## Human review is part of the feature

AI output is treated as a proposal, not authoritative data.

The review stage exists because recipe inputs can be incomplete, visually ambiguous, or poorly formatted. Ingredients, quantities, steps, and titles may need correction before the result becomes shared family knowledge.

This creates a deliberate product boundary:

```text
AI reduces effort
User keeps ownership of accuracy
```

## Image intake

When images are shared, the server validates accepted formats and file size before processing. The production implementation can work with multiple recipe images and pass supported image data into the extraction layer.

The resulting structured payload can then be attached to an inbox item for review rather than being written directly into the final recipe collection.

## Text intake

Text can be parsed into a proposed recipe structure using the same general product pattern:

```text
Raw text
   ↓
Extraction
   ↓
Proposed recipe
   ↓
Review
   ↓
Final structured record
```

This keeps image and text capture conceptually consistent for the user.

## Duplicate handling

If a source URL exists, it is normalized before duplicate checking. This happens before the recipe becomes a new library item, helping prevent several tracked or platform-specific versions of the same source from becoming separate recipes.

## Trust boundaries

The showcase intentionally does not include Gemini credentials or production configuration.

In the production architecture:

- Gemini API access is invoked from server-side code
- privileged credentials are not exposed to the browser
- authenticated user and family scope are established before intake data is stored
- extracted content remains reviewable before final acceptance

## Why this matters as a product decision

A fully automatic flow would be faster but less trustworthy. A fully manual flow would be reliable but tedious.

The chosen interaction model uses AI where it provides leverage while keeping the final decision with the user. This is especially important in a shared family library, where incorrectly extracted recipes would create ongoing maintenance work for everyone.
