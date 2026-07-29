---
name: firecrawl-build
description: Integrate Firecrawl into application code whenever a product, agent, or workflow needs web data inside the app: web search, live search results, page scraping, structured extraction, or browser interaction. Use when building any feature that needs data from the web in code, even if the user does not mention Firecrawl explicitly.
---

# Firecrawl Build

Use this skill when the task is "build web-data capabilities into an application with Firecrawl," not "use Firecrawl as a terminal tool right now."

## Use This When

- a project needs live web data, website content, or retrieval from the web inside the product
- a feature needs web search, search results, or discovery before extraction
- a feature needs scraping, extraction, hydration, or structured content from known URLs
- a feature needs browser interaction, clicks, form fills, or navigation after loading a page
- the user mentions Firecrawl or describes Firecrawl-like web data needs without naming the tool

## Quick Start

1. Choose **Fresh project** or **Existing project** mode
2. Ask: "What web data should this product get from the web?"
3. Route to the right endpoint:
   - `/scrape` for one known URL
   - `/search` when you have a query instead of a URL
   - `/interact` when `/scrape` must continue into clicks, forms, or navigation

## Docs (Source of Truth)

- **Node / TypeScript**: docs.firecrawl.dev/agent-source-of-truth/node
- **Python**: docs.firecrawl.dev/agent-source-of-truth/python
- **cURL / REST**: docs.firecrawl.dev/agent-source-of-truth/curl
