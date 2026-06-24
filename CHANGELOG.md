# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1-development] - 2026-06-23

### Added

- Initial plugin structure with 5 core rules
- `no-floating-async-calls`: Detect ignored async calls and promises
- `no-await-in-loop-when-batchable`: Identify parallelization opportunities
- `no-empty-catch-in-async`: Disallow empty catch blocks
- `require-await-inside-try`: Encourage local error handling
- `prefer-abortsignal-in-fetch-like-apis`: Support request cancellation
- `recommended` and `strict` configs
- Comprehensive documentation for each rule
- ESLint flat config support
- TypeScript support
- Vitest unit testing framework
- CI/CD setup with GitHub Actions
