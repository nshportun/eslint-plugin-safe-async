# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-06-23

### Added

- `no-floating-async-calls` rule — detect ignored async calls and unhandled promises
- `no-await-in-loop-when-batchable` rule — identify parallelization opportunities in loops
- `no-empty-catch-in-async` rule — disallow silent error swallowing in async functions
- `require-await-inside-try` rule — encourage local error handling for critical awaited operations
- `prefer-abortsignal-in-fetch-like-apis` rule — encourage AbortSignal usage in fetch-like calls
- `recommended` config with `no-floating-async-calls` and `no-empty-catch-in-async` enabled
- `strict` config with all stable rules enabled
- Flat config (ESLint 9+) as primary configuration format
- TypeScript support with full type declarations
- Rule documentation for all 5 rules
- Examples for flat config JS, flat config TS, and incremental adoption
- GitHub Actions CI/CD with automated npm publishing
- Issue templates for bug reports, false positives, false negatives, and rule proposals
