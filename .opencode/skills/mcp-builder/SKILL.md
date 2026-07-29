---
name: mcp-builder
description: Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. Use when building MCP servers to integrate external APIs or services, whether in Python (FastMCP) or Node/TypeScript (MCP SDK).
---

# MCP Server Development Guide

## Overview

Create MCP servers that enable LLMs to interact with external services through well-designed tools.

## High-Level Workflow

### Phase 1: Deep Research and Planning

1. Understand Modern MCP Design (API Coverage, Tool Naming, Context Management)
2. Study MCP Protocol Documentation (https://modelcontextprotocol.io)
3. Study Framework Documentation (TypeScript SDK or Python SDK)
4. Plan Your Implementation

### Phase 2: Implementation

1. Set Up Project Structure
2. Implement Core Infrastructure (API client, error handling, response formatting)
3. Implement Tools (Input/Output Schema, Descriptions, Annotations)

### Phase 3: Review and Test

1. Code Quality (DRY, error handling, type coverage)
2. Build and Test (npm run build, MCP Inspector)

### Phase 4: Create Evaluations

Create 10 evaluation questions to test LLM effectiveness with your server.

## Recommended Stack

- **Language**: TypeScript
- **Transport**: Streamable HTTP for remote, stdio for local
- **Schema**: Zod (TypeScript) or Pydantic (Python)
