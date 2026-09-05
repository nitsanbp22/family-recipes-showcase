# Security and Public Showcase Scope

This repository is a curated portfolio showcase, not the production application.

## Intentionally excluded

The showcase does not include:

- `.env` files
- Supabase project identifiers or production URLs
- service-role credentials
- Gemini API keys or other provider credentials
- cron secrets
- private family recipe data
- production storage assets
- database migration history
- operational import scripts
- deployment-only configuration
- internal QA artifacts that expose production-specific details

## Why the production history is not reused

The private source repository contains production-specific references and infrastructure details that are unnecessary for a portfolio review.

This showcase therefore uses separate Git history and only selected files that are safe and useful for explaining product and engineering decisions.

## Authorization model

The production design uses family-scoped data access, server-side checks, PostgreSQL Row Level Security, and private storage. Application-level role visibility is not treated as the security boundary by itself.

## AI boundary

Gemini integration is represented only at the product and architecture level in this showcase. Provider credentials and production AI configuration are not included.

The product uses a review step before extracted recipe content is accepted into the shared library. AI output is treated as proposed structured data rather than an authoritative result.

## Screenshot policy

The public screenshot set is intentionally limited to approved product views.

Excluded from the showcase:

- profile screens containing real email addresses
- full family-member views containing identifiable names or photos
- private recipe or account data that is unnecessary for explaining the product

The included family-workspace screenshot is cropped to aggregate product context and does not expose the individual member list.

## Publication checklist

Before this showcase is made public or materially updated:

- inspect every copied file for credential-like values
- search for project-specific URLs and identifiers
- confirm no real family data is included unnecessarily
- confirm screenshots contain only approved content
- keep production migration and operational tooling out of this repository
- verify selected code still represents the current product accurately
- confirm AI provider credentials remain server-side and absent from the showcase

The original private repository remains the canonical implementation.
