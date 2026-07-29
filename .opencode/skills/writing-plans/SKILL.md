---
name: writing-plans
description: Use when you have a spec or requirements for a multi-step task, before touching code
---

# Writing Plans

## Overview

Write comprehensive implementation plans assuming the engineer has zero context for the codebase. Document everything they need to know: which files to touch, code, testing, how to test it.

## Plan Document Header

**Every plan MUST start with this header:**

```markdown
# [Feature Name] Implementation Plan

**Goal:** [One sentence describing what this builds]

**Architecture:** [2-3 sentences about approach]

**Tech Stack:** [Key technologies/libraries]

## Global Constraints
[The spec's project-wide requirements]
```

## Task Structure

Each task should contain:

1. **Files:** Create/Modify/Test paths
2. **Interfaces:** Consumes/Produces
3. **Steps** with actual code (no placeholders!)
4. **Test commands** with expected output
5. **Commit** step

## No Placeholders

Every step must contain the actual content. These are plan failures:
- "TBD", "TODO", "implement later"
- "Add appropriate error handling"
- "Write tests for the above" (without actual test code)
- "Similar to Task N" (repeat the code)

## Self-Review

After writing the complete plan:

1. **Spec coverage:** Can you point to a task that implements each requirement?
2. **Placeholder scan:** Search for red flags and fix them
3. **Type consistency:** Do types/signatures match across tasks?
