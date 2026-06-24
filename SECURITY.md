# Security Policy

## Supported versions

Only the latest major version receives security updates.

## Reporting a vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Report privately using GitHub's security advisory system:

👉 [Open a private security advisory](https://github.com/nshportun/eslint-plugin-safe-async/security/advisories/new)

If you are unable to use GitHub advisories, describe the issue in detail
and send it to the maintainer via GitHub direct message.

Include:
- Description of the vulnerability
- Steps to reproduce
- Affected versions
- Impact assessment
- Suggested mitigation if known

## Security standards

This plugin:
- Uses minimal dependencies
- Avoids postinstall scripts
- Does not collect telemetry
- Makes no network calls at runtime
- Publishes with npm provenance and trusted publishing
- Maintains 2FA on npm account
- Reviews dependencies quarterly

## Supply chain safety

We take npm supply-chain security seriously:
- Dependencies are kept up to date
- Breaking changes are documented
- Releases are published via GitHub Actions with trusted publishing
- Code changes are reviewed before release
