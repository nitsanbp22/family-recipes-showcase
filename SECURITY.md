# Security and Public Showcase Scope

This repository is a curated portfolio showcase, not the production application.

## Intentionally excluded

The showcase does not include:

- `.env` files
- Supabase project identifiers or production URLs
- service-role credentials
- cron secrets
- private family or recipe data
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

## Publication checklist

Before this showcase is made public or materially updated:

- inspect every copied file for credential-like values
- search for project-specific URLs and identifiers
- confirm no real family data is included
- confirm screenshots contain only approved content
- keep production migration and operational tooling out of this repository
- verify selected code still represents the current product accurately

The original private repository remains the canonical implementation.
