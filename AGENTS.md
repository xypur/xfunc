# Xfunc

A modern collection of utility functions for TypeScript/JavaScript projects (Vite/pnpm).

## Basic Info

- I'm using Ubuntu for development
- Communication in Chinese, code and comments uniformly use English

## Build/Lint/Test Commands

- Build: `pnpm build`
- Test: `pnpm test` (watch mode) or `pnpm test:run` (single run)
- Single test: `pnpm test path/to/file.spec.ts`
- Lint: `pnpm lint` (auto-fix) or `pnpm lint:check` (check only)

## Code Style Guidelines

- Use TypeScript with strict mode enabled
- ES modules with .ts extension
- 2-space indentation, single quotes, no semicolons
- camelCase for functions/variables, PascalCase for types/interfaces
- Prefer template literals over string concatenation
- Use const by default, let only when reassignment needed
- Error handling: return early with empty arrays/objects for invalid inputs
- Import style: named imports from internal modules, avoid wildcards
- Testing: use Vitest with .spec.ts suffix, test both happy and error paths

## Formatting

- Do not reformat existing code unless I specifically request formatting of existing code

## Committing

- ALWAYS use semantic commits (fix:, feat:, chore:, refactor:, docs:).
