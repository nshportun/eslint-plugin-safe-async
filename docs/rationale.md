# Design Rationale

## Philosophy

`@nshportun/eslint-plugin-safe-async` exists to catch real bugs—not style preferences. Every rule must:

1. **Detect a genuine defect** in async code that can cause production incidents
2. **Have a low false-positive rate** to earn trust in CI pipelines
3. **Provide actionable guidance** with clear error messages
4. **Be understandable without external tools** (no type-checking required unless absolutely necessary)

## Rule selection

We prioritize rules that catch bugs in common patterns:

- **Forgotten awaits**: Silent background promises with no error handling
- **Sequential awaiting in loops**: Performance loss from unnecessary serialization
- **Empty catch blocks**: Error swallowing and lost debugging information
- **Missing cancellation signals**: Resource leaks and hangs from uncontrolled requests

We explicitly avoid:

- Style preferences (whitespace, naming conventions)
- Broad linting that duplicates other plugins
- Complex data-flow analysis prone to false positives
- Rules that require type information to be accurate

## Why only 5 rules for v0.1?

Quality beats quantity. One excellent rule with superb docs outperforms five mediocre rules in adoption.

By shipping a focused set, we:
- Keep the codebase maintainable
- Ensure each rule is well-tested and documented
- Establish a baseline of trust with the community
- Allow space to refine based on real-world feedback

## Architecture decisions

### No dependencies (except ESLint)

Every dependency is a maintenance burden and a supply-chain risk. We avoid:
- Promise-analyzing libraries
- AST visitor helpers beyond ESLint
- Runtime dependencies in any form

### Flat config first

Modern ESLint uses flat configs. We support this first-class and only add legacy config support if it's cheap and clearly necessary.

### Conservative rule defaults

- New rules ship off by default unless exceptionally low-risk
- Opts default to strict checking (fewer false negatives is better than fewer false positives)
- Configuration options exist for legitimate use cases, not to silence valid warnings

## Testing strategy

Rules are only considered stable when:
- Edge cases are covered in tests
- Docs examples match test cases
- False-positive and false-negative risks are explicitly acknowledged

## Community adoption

We invest heavily in:
- Clear, concise README
- Excellent rule documentation
- Working examples for both JS and TS
- Fast response times on issues
- Transparent development process

This pays off in organic adoption and community trust—far more valuable than aggressive marketing.
