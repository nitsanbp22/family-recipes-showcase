# Family Recipes Product Case Study

## Context

Family Recipes started from a familiar problem: valuable recipes exist, but the system around them is fragmented.

A single family may have recipes stored in:

- WhatsApp chats
- screenshots
- Instagram, TikTok, Facebook, or recipe-site links
- handwritten notes
- browser bookmarks
- individual family members' phones
- memory

The product opportunity was not simply to build a recipe database. It was to reduce the effort required to turn scattered recipe knowledge into a useful shared family resource.

## Product hypothesis

If recipe capture is quick enough and organization happens in a structured shared library, family members will be more likely to save recipes consistently and actually find them again later.

That led to a product model centered on two different moments:

```text
Discovery moment
"I found something worth saving"
        ↓
Fast intake
        ↓
Review / structure
        ↓
Library
        ↓
Cooking moment
"I need the recipe now"
```

The UX requirements are different in each moment. Capture needs to be fast; retrieval needs to be structured.

## Primary users

The core user is a family member who wants access to the shared recipe collection without needing to understand how the data is organized internally.

Different family members may contribute differently:

- someone who adds and edits recipes frequently
- someone who mostly searches and cooks
- someone who maintains categories or folders
- someone who only needs read access

This is why the product uses a simple role model instead of assuming every member has identical permissions.

## Key product decisions

### 1. Intake is separate from the final recipe

Content can first enter an inbox before becoming a fully structured recipe.

This separation allows the product to accept incomplete input without lowering the quality of the recipe library.

A saved link, text block, or image can be reviewed later instead of forcing the user to complete every field during capture.

### 2. Sharing from the phone is a first-class flow

Recipes are often discovered in other apps. Requiring the user to copy a URL, open the recipe app, navigate to Add Recipe, and paste it creates unnecessary friction.

The Android Web Share Target lets the product participate directly in the operating-system sharing flow.

```text
Other app
   ↓ Share
Family Recipes
   ↓
Validate user + family
   ↓
Normalize shared content
   ↓
Check duplicate
   ↓
Inbox / review
```

This is a product decision as much as a technical feature. It shortens the distance between "I want to keep this" and "saved."

### 3. Duplicates are evaluated by meaning, not raw URL text

Social and content URLs often include tracking parameters or alternative host/path formats.

Exact-string comparison would let the same recipe enter the family collection multiple times.

The product therefore normalizes known URL patterns before duplicate checks. The database also maintains a family-scoped uniqueness boundary for canonical source URLs.

### 4. Organization is flexible but structured

The library combines several mechanisms with different jobs:

- categories for broad classification
- tags for cross-cutting attributes
- folders for user-defined grouping
- favorites for personal retrieval
- search and filters for direct discovery

The goal is to avoid forcing every organizational need into one taxonomy.

### 5. Permissions are intentionally understandable

The model uses:

```text
owner
editor
viewer
```

A family product should not require users to learn an enterprise permission system. The complexity is handled in the edge cases and security layer, such as protecting the final owner and preventing cross-family access.

### 6. Deletion is reversible before it becomes permanent

Archiving separates "I do not want this in my active library" from "this data should be permanently destroyed."

Archived recipes have a scheduled deletion window. This gives users a recovery path while keeping eventual cleanup deterministic.

## Information architecture

```text
Family workspace
├── Recipe library
│   ├── categories
│   ├── tags
│   ├── folders
│   ├── favorites
│   └── search / filters
├── Inbox
│   └── captured content waiting for review
├── Archive
├── Notifications / activity
└── Family members / permissions
```

The important distinction is between the **library**, which should remain high quality, and **intake**, which is allowed to be incomplete.

## Mobile UX principles

### Minimize input at the discovery moment

The user should not have to fill a long recipe form to preserve a link or image.

### Optimize for scanning while cooking

Recipe information needs strong hierarchy, large tap targets, readable steps, and predictable navigation when the user's attention is split between the screen and cooking.

### Keep Hebrew RTL behavior native

The interface is designed RTL-first rather than mirrored as an afterthought. Free-form recipe content can retain its source-language direction where needed.

### Use progressive disclosure

Advanced organization and management actions should not compete with the primary jobs of saving, finding, and reading a recipe.

## What I would validate next

Product research questions include:

1. Which intake source is used most often in real family behavior?
2. How often do users review inbox items immediately versus later?
3. Do categories, folders, and tags each have a clear mental model?
4. Which recipe fields are essential during cooking and which are secondary?
5. Do family members understand the difference between editor and owner?
6. How useful is offline recipe access in real kitchen environments?
7. When duplicate content is detected, should the user merge, replace, or simply open the existing recipe?
8. Which imported content should be auto-structured versus explicitly reviewed?

## Success measures

For a real household pilot I would look at metrics that reflect usefulness rather than only activity:

- percentage of capture attempts completed successfully
- time from external share to saved inbox item
- duplicate rate after normalization
- search success and recipe open rate
- percentage of recipes revisited after initial save
- inbox items successfully converted into recipes
- archive restoration rate
- family-member contribution distribution
- qualitative confidence that users can find "the family recipe" when they need it

## Product scope versus technical scope

The implementation includes full-stack infrastructure because the product requires identity, shared ownership, private media, and reliable persistence.

However, the core portfolio story is not "a Next.js recipe app." It is the translation of a fragmented real-world behavior into a coherent capture, organization, collaboration, and retrieval system.
