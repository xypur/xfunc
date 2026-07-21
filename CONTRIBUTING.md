# Contributing to xfunc

English | [中文](./CONTRIBUTING.zh-CN.md)

Thank you for your interest in contributing to xfunc! This guide will help you get started with contributing to this TypeScript/JavaScript utility library.

## Table of Contents

- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Code Guidelines](#code-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)
- [Submitting Changes](#submitting-changes)
- [Release Process](#release-process)

## Development Setup

### Prerequisites

- Node.js (latest LTS version recommended)
- pnpm (package manager)
- Git

### Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/xfunc.git
   cd xfunc
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Set up git hooks:
   ```bash
   pnpm prepare
   ```

### Available Scripts

- `pnpm test` - Run tests in watch mode
- `pnpm test:run` - Run tests once
- `pnpm build` - Build the library
- `pnpm lint` - Lint and fix code
- `pnpm lint:check` - Check linting without fixing
- `pnpm docs:dev` - Start documentation development server
- `pnpm docs:build` - Build documentation
- `pnpm release` - Create a release (maintainers only)

## Project Structure

```
xfunc/
├── src/                 # Source code
│   ├── array/          # Array utilities
│   ├── function/       # Function utilities
│   ├── number/         # Number utilities
│   ├── object/         # Object utilities
│   ├── string/         # String utilities
│   ├── typed/          # Type checking utilities
│   └── internal/       # Internal shared utilities
├── test/               # Test files (mirrors src structure)
├── docs/               # Documentation
├── dist/               # Build output (generated)
└── scripts/            # Build and release scripts
```

## Code Guidelines

### General Rules

- **Language**: All code and comments must be in English
- **Line Endings**: Use Linux-style line endings (LF)
- **No Semicolons**: Don't add semicolons unless syntactically required
- **TypeScript First**: All source code should be written in TypeScript
- **Zero Dependencies**: Keep the library dependency-free

### Code Style

- Follow the existing ESLint configuration
- Use meaningful variable and function names
- Keep functions small and focused on a single responsibility
- Don't extract single-line code into functions unless reused ≥2 times
- Don't reformat existing code unless explicitly needed

### Adding New Utilities

1. **Choose the right category**: Place your utility in the appropriate folder (`array/`, `function/`, `number/`, `object/`, `string/`, `typed/`)

2. **File naming**: Use camelCase for file names (e.g., `myFunction.ts`)

3. **Function structure**:
   ```typescript
   /**
    * Brief description of what the function does
    * 
    * @param param1 Description of parameter
    * @param param2 Description of parameter
    * @returns Description of return value
    * 
    * @example
    * ```typescript
    * myFunction('example')
    * // => 'result'
    * ```
    */
   export function myFunction(param1: string, param2?: number): string {
     // Implementation
   }
   ```

4. **Export from index**: Add your function to the appropriate `index.ts` file in the category folder

5. **Update main index**: Add your function to the main `src/index.ts` file

## Testing

### Writing Tests

- All new utilities must have comprehensive tests
- Test files should mirror the source structure: `test/category/functionName.spec.ts`
- Use Vitest for testing framework
- Follow the existing test patterns

### Test Structure

```typescript
import { describe, expect, it } from 'vitest'
import { myFunction } from '../../src/category/myFunction'

describe('myFunction', () => {
  it('should handle basic case', () => {
    expect(myFunction('input')).toBe('expected')
  })

  it('should handle edge cases', () => {
    expect(myFunction('')).toBe('')
    expect(myFunction(null)).toBe(null)
  })

  it('should handle invalid input', () => {
    expect(() => myFunction(undefined)).toThrow()
  })
})
```

### Running Tests

```bash
# Run all tests
pnpm test:run

# Run tests in watch mode
pnpm test

# Run tests for specific file
pnpm test myFunction.spec.ts
```

## Documentation

### API Documentation

- Each utility function should have JSDoc comments with:
  - Clear description
  - Parameter descriptions with types
  - Return value description
  - Usage examples
  - Notes about edge cases or special behavior

### VitePress Documentation

- Documentation is built with VitePress
- API docs are located in `docs/docs/` (English) and `docs/zh/docs/` (Chinese)
- Update the appropriate category file when adding new utilities
- Include practical examples and use cases

## Submitting Changes

### Before Submitting

1. **Run the full test suite**: `pnpm test:run`
2. **Check linting**: `pnpm lint:check`
3. **Build the project**: `pnpm build`
4. **Update documentation** if needed

### Commit Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `test:` for test changes
- `refactor:` for code refactoring
- `perf:` for performance improvements
- `chore:` for maintenance tasks

Examples:
```
feat: add pick utility for object property selection
fix: handle null values in isEmpty function
docs: add examples for debounce function
test: add edge cases for toNumber utility
```

### Pull Request Process

1. Create a feature branch from `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/my-new-utility
   ```

2. Make your changes following the guidelines above

3. Commit your changes with conventional commit messages

4. Push to your fork and create a pull request targeting the `dev` branch

5. Fill out the pull request template with:
   - Clear description of changes
   - Testing information
   - Breaking changes (if any)
   - Related issues

### Pull Request Requirements

- [ ] All tests pass
- [ ] Code follows style guidelines
- [ ] Documentation is updated
- [ ] Commit messages follow conventional commits
- [ ] No breaking changes (unless discussed)
- [ ] Branch is up to date with `dev`

## Release Process

Releases are handled by maintainers using automated scripts:

1. **Version bump**: Using semantic versioning
2. **Changelog generation**: Automatically generated from commit messages
3. **Build and publish**: Automated build and npm publication

### Versioning

- **Patch** (`0.1.0` → `0.1.1`): Bug fixes, documentation updates
- **Minor** (`0.1.0` → `0.2.0`): New features, non-breaking changes
- **Major** (`0.1.0` → `1.0.0`): Breaking changes

## Getting Help

- **Issues**: Check existing issues or create a new one
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Code Review**: Maintainers will review all pull requests

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Follow the project's technical standards

Thank you for contributing to xfunc! 🚀