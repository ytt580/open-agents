---
name: shadcn
description: Manages shadcn components and projects — adding, searching, fixing, debugging, styling, and composing UI. Applies when working with shadcn/ui, component registries, or any project with a components.json file.
---

# shadcn/ui

A framework for building UI, components and design systems. Components are added as source code to the user's project via the CLI.

## Principles

1. **Use existing components first.** Use `npx shadcn@latest search` to check registries before writing custom UI.
2. **Compose, don't reinvent.** Settings page = Tabs + Card + form controls. Dashboard = Sidebar + Card + Chart + Table.
3. **Use built-in variants before custom styles.** `variant="outline"`, `size="sm"`, etc.
4. **Use semantic colors.** `bg-primary`, `text-muted-foreground` — never raw values like `bg-blue-500`.

## Critical Rules

### Styling & Tailwind

- **`className` for layout, not styling.** Never override component colors or typography.
- **No `space-x-*` or `space-y-*`.** Use `flex` with `gap-*`.
- **Use `size-*` when width and height are equal.**
- **Use `truncate` shorthand.**
- **No manual `dark:` color overrides.** Use semantic tokens.
- **Use `cn()` for conditional classes.**

### Forms & Inputs

- **Forms use `FieldGroup` + `Field`.** Never use raw `div` with `space-y-*`.
- **Option sets (2–7 choices) use `ToggleGroup`.**
- **Field validation uses `data-invalid` + `aria-invalid`.**

### Component Structure

- **Items always inside their Group.**
- **Dialog, Sheet, and Drawer always need a Title.**
- **Use full Card composition.**
- **`TabsTrigger` must be inside `TabsList`.**
- **`Avatar` always needs `AvatarFallback`.**

### Use Components, Not Custom Markup

- **Callouts use `Alert`.**
- **Empty states use `Empty`.**
- **Use `Separator`** instead of `<hr>`.
- **Use `Skeleton`** for loading placeholders.
- **Use `Badge`** instead of custom styled spans.

## Quick Reference

```bash
# Create a new project.
npx shadcn@latest init --name my-app --preset base-nova

# Add components.
npx shadcn@latest add button card dialog

# Search registries.
npx shadcn@latest search @shadcn -q "sidebar"

# Get component docs.
npx shadcn@latest docs button dialog select
```
