---
name: subagent-driven-development
description: Use when executing implementation plans with independent tasks in the current session
---

# Subagent-Driven Development

Execute plan by dispatching a fresh implementer subagent per task, a task review after each, and a broad whole-branch review at the end.

**Core principle:** Fresh subagent per task + task review + broad final review = high quality, fast iteration

## The Process

1. **Setup** - Read plan, create todos
2. **Per Task Loop:**
   - Dispatch implementer subagent with task brief
   - Implementer implements, tests, commits, self-reviews
   - Generate review package, dispatch task reviewer
   - If findings: fix loop (rounds 1-5)
   - Complete task, move to next
3. **Final Review** - Whole-branch review on most capable model
4. **Finish** - Clean up, merge/PR

## When to Use

- Have an implementation plan
- Tasks are mostly independent
- Want to stay in this session

## Key Principles

- **Fresh subagent per task** - No context pollution
- **Never skip task review** - Both spec compliance AND code quality
- **Continuous execution** - Don't pause between tasks
- **Ledger tracking** - Track progress in a file, not just todos
