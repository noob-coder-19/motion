# Ultracite Code Standards

This project uses **Ultracite**, a zero-config preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `pnpm dlx ultracite fix`
- **Check for issues**: `pnpm dlx ultracite check`
- **Diagnose setup**: `pnpm dlx ultracite doctor`

Biome (the underlying engine) provides robust linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**
- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**
- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**
- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Biome Can't Help

Biome's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Biome can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Biome. Run `pnpm dlx ultracite fix` before committing to ensure compliance.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server on port 8000
pnpm build        # Type-check (tsc -b) then Vite production build
pnpm check        # Ultracite/Biome lint check
pnpm fix          # Auto-fix Ultracite/Biome issues
```

Pre-commit hooks (via Husky + lint-staged) automatically run `ultracite fix` on staged JS/TS/CSS/JSON/MD files.

There is no test suite configured.

## Architecture

This is a **React 19 + Vite** single-page app that renders a scroll-triggered animation of Squid Game symbols using **Framer Motion**.

### How animations work

The entire page is `500dvh` tall — the extra height is scroll space, not visible content. All animated elements are `position: fixed`, so the viewport stays static while the user scrolls.

`squid-game.tsx` is the root animation component. It:
1. Calls `useScroll()` to get a `scrollYProgress` value (0–1)
2. Multiplies it by 2 via `useTransform` to create a `progress` value (0–2)
3. Passes `progress` (and derived `useTransform` values) down to every child component

### Scroll progress constants (`src/constants.ts`)

All animation keypoints are defined here as named constants (e.g. `P_5`, `P_6_25`, `P_50`). Each child component imports only the constants for its animation window. Never use raw numbers for scroll positions — always add a named constant.

### Shape rendering pattern

Shapes are built from **trapezoids** as building blocks:
- `src/ui/trapezoid.tsx` — base CSS `clip-path` shape, accepts `variant` (`top`/`bottom`/`left`/`right`), `width`, `height`, `angle`, `color`
- `src/components/motion-components/trapezoid.tsx` — wraps `Trapezoid` with `motion.create()` so its props can be driven by `MotionValue`s

Circles are rendered as SVG `<circle>` elements with animated `strokeDashoffset` to produce a "drawing" effect.

### Component structure

- `src/components/squid-game.tsx` — orchestrator; owns `useScroll` and all top-level `useTransform` calls
- `src/components/phase-1-components/` — triangle and square shapes
- `src/components/letters/` — one file per letter (A, Y, U, S, H); each is self-contained with its own `useTransform` calls over the shared `progress` prop
- `src/ui/` — unstyled, reusable primitives (trapezoid)
- `src/components/motion-components/` — motion-enabled wrappers around UI primitives

### Styling

Tailwind CSS v4 (imported in `App.css`). Custom pink palette variables (`--color-pink`, `--color-hot-pink`) are defined in `App.css`. Use these variables for brand colors instead of hardcoding hex values.
