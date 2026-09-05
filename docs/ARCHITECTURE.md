# Family Recipes Architecture Overview

## Design goals

The private application is structured around a few product and engineering constraints:

1. recipe and family data must remain scoped to the active family
2. UI components should not own database logic
3. capture from different sources should converge into one intake model
4. multi-step writes should remain transactional where appropriate
5. private media should not depend on permanent public URLs
6. mobile and RTL behavior are first-class product requirements
7. authorization must be enforced beyond the interface

## Layered structure

```text
Routes / UI
    ↓
Feature components
    ↓
Application actions / providers
    ↓
Domain services + validation
    ↓
Repositories / protected route handlers
    ↓
Supabase Auth + PostgreSQL + Storage + RLS
```

### Presentation

Routes and feature components are responsible for interaction, rendering, form state, and product feedback.

They do not directly encode the database model as UI behavior.

### Application layer

Application actions coordinate authenticated operations such as family management, recipe mutations, taxonomy changes, notifications, and cache refreshes.

### Domain and services

Reusable logic covers areas such as:

- URL normalization
- intake processing
- recipe extraction
- category classification
- storage behavior
- validation

This keeps business behavior reusable outside a particular screen.

### Data access

Supabase repositories map rows and relations into the models consumed by the app. Server-side flows use protected handlers or database RPCs where a mutation spans multiple related changes.

## Read flow

```text
Authenticated route / provider
        ↓
Repository query
        ↓
RLS-protected PostgreSQL data
        ↓
Domain mapping
        ↓
Application state
        ↓
UI
```

## Write flow

```text
UI action
   ↓
Input validation
   ↓
Application action
   ↓
RPC / protected mutation / route handler
   ↓
RLS + database constraints
   ↓
Refresh relevant application state
```

## Family boundary

The primary collaboration boundary is the family workspace.

```text
Family
├── memberships
├── recipes
├── categories
├── tags
├── folders
├── inbox items
├── notifications
└── private media
```

Roles are intentionally compact:

```text
owner
editor
viewer
```

Every family-scoped data path is designed around membership rather than trusting a client-provided family identifier as authorization.

## Intake architecture

Different capture sources converge before entering the library:

```text
Manual form
External link
Web Share Target
Shared image
Shared text
Future adapters
      ↓
Normalized intake payload
      ↓
Authentication + family context
      ↓
Canonicalization / validation
      ↓
Duplicate detection
      ↓
Inbox and review
      ↓
Structured recipe
```

This lets the product add new capture channels without inventing a new recipe workflow for each source.

## Private media

Recipe and profile images are stored in family-scoped private storage paths. The application resolves temporary signed URLs rather than exposing a permanent public bucket as the default access model.

## Archive lifecycle

Deletion is modeled as a lifecycle rather than an immediate destructive action:

```text
Active recipe
   ↓ archive
Archived recipe
   ↓ restore OR wait
Scheduled deletion
   ↓ secure server cleanup
Permanent deletion
```

The delay creates a product recovery window while keeping long-term cleanup predictable.

## Why this architecture supports the product

The architecture is intentionally not complex for its own sake. Each boundary supports a product requirement:

- repositories make the UI easier to evolve
- RLS supports private family workspaces
- canonical URLs support duplicate prevention
- intake adapters support low-friction capture
- RPCs protect multi-step operations
- private storage supports personal family content
- PWA behavior supports real mobile usage

The result is a technical model aligned with the product's core jobs: capture quickly, organize reliably, share safely, and retrieve easily.
