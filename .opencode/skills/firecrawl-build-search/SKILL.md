---
name: firecrawl-build-search
description: Integrate Firecrawl `/search` into product code and agent workflows. Use when an app needs discovery before extraction, when the feature starts with a query instead of a URL.
---

# Firecrawl Build Search

Use this when the application starts with a query, not a URL.

## Use This When

- the user asks a question and the product must discover sources first
- the feature needs current web results
- you want to turn a search query into a shortlist of pages for later scraping

## Default Recommendations

- Use `/search` first when URL discovery is part of the product behavior.
- Keep search and extraction conceptually separate.

## Escalation Rules

- If you already have the URL, use `firecrawl-build-scrape`.
- If the result page then requires clicks or form interaction, escalate to `firecrawl-build-interact`.
