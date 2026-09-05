# Family Recipes | Shared Family Recipe Library & PWA

Family Recipes is a collaborative, mobile-first product for turning scattered family recipes into a shared library that is easy to capture, organize, search, cook from, and maintain together.

> **Portfolio showcase:** this repository is a curated snapshot of product thinking and selected engineering work from a private codebase. Production identifiers, credentials, private family data, deployment configuration, migration history, and operational scripts are intentionally excluded.

## Product problem

Family recipes rarely live in one place. They are often spread across WhatsApp messages, screenshots, social-media links, handwritten notes, bookmarks, and memory.

The product question behind Family Recipes is:

> How can a family turn all of those fragmented sources into one useful, shared recipe system without making recipe capture feel like admin work?

The product is designed around three jobs:

1. **Capture quickly** from the place where a recipe is already found.
2. **Structure and find later** through search, categories, tags, folders, and normalized metadata.
3. **Share safely** within a family workspace with clear roles and ownership.

## Core product journey

```text
Find a recipe
   ↓
Share link / image / text into the app
   ↓
Normalize and detect duplicates
   ↓
Review extracted recipe details
   ↓
Save to the family library
   ↓
Organize, search, favorite, and cook
   ↓
Edit or maintain together over time
```

## Key product areas

### Frictionless recipe capture

The app supports multiple intake paths so saving a recipe does not depend on manually retyping it:

- manual recipe creation
- recipe links
- Android Web Share Target
- shared text or images
- structured inbox and review flow
- extensible adapters for additional intake sources

A shared intake model keeps the downstream experience consistent regardless of where the recipe originated.

### Searchable family knowledge

Recipes are modeled as structured content rather than flat notes. The product supports ingredients, steps, notes, images, categories, tags, folders, favorites, source links, and archive state.

This makes the collection useful as it grows instead of becoming another unsearchable message history.

### Duplicate prevention

Shared URLs are normalized before saving. Tracking parameters and common social-platform URL variations are reduced to a canonical form, and duplicates are checked within the family library.

See [`code-samples/intake/normalize-source-url.ts`](code-samples/intake/normalize-source-url.ts).

### Family collaboration and permissions

The workspace supports three roles:

- `owner`
- `editor`
- `viewer`

The product protects important ownership states, including preventing removal or demotion of the final owner. UI permissions are backed by server and database authorization rather than relying only on hidden buttons.

See [`code-samples/permissions/permissions.config.ts`](code-samples/permissions/permissions.config.ts).

### Mobile-first PWA

The product is designed for the context in which recipes are actually found and used: on a phone. PWA behavior, responsive RTL UI, share-target intake, private images, and limited offline reading are part of the product model rather than desktop features adapted later.

## My role

I defined the product flows and built the system end to end, with a focus on reducing friction around recipe capture and making a growing family collection easy to use.

My work includes:

- product definition and feature prioritization
- information architecture for recipes, categories, tags, folders, inbox, and archive
- mobile-first Hebrew RTL UX
- recipe capture and review flows
- family membership and permission behavior
- duplicate-prevention rules and source normalization
- search, filtering, favorites, and organization behavior
- PWA and Android share-target experience
- data modeling and Supabase integration
- private storage, RLS, and authorization design
- testing, QA, and iterative product refinement

The technical implementation supports the product goal, but the main portfolio story is how a messy real-world behavior was translated into a structured, low-friction product.

## Product decisions worth discussing

### Capture first, organize second

A common failure mode in personal knowledge tools is requiring users to classify everything before saving it. Family Recipes separates quick intake from later review so the user can save first without losing context.

### One intake model for multiple sources

Links, shared text, images, and future external adapters feed a common intake flow. This reduces product inconsistency and makes new capture channels easier to add.

### Canonical URLs instead of exact-string duplicate checks

The same recipe may arrive with tracking parameters or platform-specific URL variants. Normalization makes duplicate prevention align with the user's mental model of "this is the same recipe."

### Roles remain simple

For a family product, a complex enterprise permission matrix would create unnecessary friction. `owner`, `editor`, and `viewer` cover the main collaboration cases while ownership protections handle the important edge cases.

### Archive before permanent deletion

Recipes move through a reversible archive state before scheduled deletion, reducing the cost of accidental actions while keeping the product maintainable.

## Architecture overview

```text
UI routes and feature components
        ↓
Application actions and providers
        ↓
Domain services and validation
        ↓
Supabase repositories / protected route handlers
        ↓
PostgreSQL + RLS + private Storage
```

Sensitive actions are enforced at the server or database boundary. Recipe and family data is scoped by family membership, and private images are exposed through temporary signed URLs.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Supabase Auth, PostgreSQL, Storage, RLS and RPCs
- TanStack React Query
- Zod and React Hook Form
- Tailwind CSS
- Vitest and Playwright
- PWA / Web Share Target
- Hebrew RTL interface

## Selected code samples

This showcase contains a small number of real, sanitized modules from the private codebase:

- [`normalize-source-url.ts`](code-samples/intake/normalize-source-url.ts) | canonical URL normalization for duplicate prevention
- [`permissions.config.ts`](code-samples/permissions/permissions.config.ts) | compact application-level permission model

The showcase is intentionally not a deployable production copy.

## Product case study

For the deeper product reasoning, see [`docs/PRODUCT_CASE_STUDY.md`](docs/PRODUCT_CASE_STUDY.md).

## Repository scope

The private source repository remains separate. This showcase does not contain:

- production Supabase identifiers or URLs
- real credentials or environment files
- private family recipe data or user accounts
- database migration history
- production operational scripts
- private storage assets
- deployment-only configuration

See [`SECURITY.md`](SECURITY.md).

---

**Project:** Family Recipes  
**Status:** Product in development  
**Focus:** Product management · information architecture · mobile UX · collaborative workflows · technical execution
