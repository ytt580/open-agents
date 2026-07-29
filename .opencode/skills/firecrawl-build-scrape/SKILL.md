---
name: firecrawl-build-scrape
description: Integrate Firecrawl `/scrape` into product code for single-page extraction. Use when an app already has a URL and needs markdown, HTML, links, screenshots, metadata, or structured page output.
---

# Firecrawl Build Scrape

Use this when the application already has the URL and needs content from one page.

## Use This When

- the feature starts from a known URL
- you need page content for retrieval, summarization, enrichment, or monitoring
- you want the default extraction primitive before considering `/interact`

## Default Recommendations

- Return `markdown` unless the feature truly needs another format.
- Use `onlyMainContent` for article-like pages where nav and chrome add noise.

## Escalation Rules

- If you do not have the URL yet, start with `firecrawl-build-search`.
- If content requires clicks, typing, or multi-step navigation, escalate to `firecrawl-build-interact`.
