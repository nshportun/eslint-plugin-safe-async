# Contributing

Thank you for your interest in contributing to `eslint-plugin-safe-async`!

## How to contribute

- Report bugs by opening a GitHub issue
- Suggest new rules or improvements via GitHub discussions
- Submit pull requests for bug fixes or new rules

## Before proposing a new rule

Each rule proposal should include:
- Problem statement: What bug does this catch?
- Prior art: Do similar rules exist elsewhere?
- Examples: Show incorrect and correct code
- False-positive risks: What might this rule flag incorrectly?
- Whether autofix is safe or only suggestions

## Pull request process

1. Fork the repository
2. Create a branch for your work
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass: `npm run release:check`
6. Submit a pull request

## Code style

- Use TypeScript with strict mode
- Keep functions small and well-named
- Avoid magic heuristics; prefer explicit rules
- Include clear error messages

## Testing

Every rule must have:
- Valid test cases
- Invalid test cases
- Option coverage
- Edge case coverage

Run tests with:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Release process

Releases follow semantic versioning:
- `0.x` for pre-release validation
- `1.0.0` after stable real-world testing

New rules default off unless extremely low risk.

## Questions?

Open a GitHub discussion or issue—we're happy to help.
