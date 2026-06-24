# Release Process

## Before releasing

1. Ensure all CI checks pass
2. Update CHANGELOG.md with new version and changes
3. Bump version in package.json using semantic versioning
4. Create a git tag matching the version (e.g., `v1.0.0`)
5. Push tag to GitHub

## Publishing via GitHub Actions

This project uses **npm trusted publishing with GitHub OIDC** for secure, provenance-enabled releases.

### Setup (one-time)

1. On npm.com:
   - Enable 2FA on your account
   - Go to Settings → Access Tokens → Granular Access Tokens
   - Create a new token with:
     - Expiration: 30 days (rotate regularly)
     - Permissions: Publish to npm registry
     - Scopes: This package only
   - **Do not** use classic tokens or broad-scope tokens

2. On GitHub:
   - Repo → Settings → Secrets and variables → Actions
   - Create `NPM_TOKEN` secret (if not using OIDC)
   - **Better:** Configure OIDC integration (see GitHub docs)

3. Ensure CI/CD workflow has:
   - `npm ci` for clean installs
   - Build and test validation
   - `npm publish` with provenance flag

### Release workflow

Releases can be automated via GitHub Actions:

```yaml
name: Release
on:
  push:
    tags:
      - 'v*'
jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run release:check
      - run: npm publish --provenance
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Manual publish (development)

For pre-release or manual publishing:

```bash
# Build and validate
npm run release:check

# Publish with provenance
npm publish --provenance

# Or for pre-release
npm publish --tag beta
```

### Post-release

1. Create GitHub Release with changelog excerpt
2. Announce on relevant channels (dev.to, Twitter, etc.)
3. Monitor for issues and respond quickly

## Version policy

- Follow semver: MAJOR.MINOR.PATCH
- New rules default off (minor version bump)
- Rule changes that increase detection may be breaking (major bump)
- Bug fixes and docs updates are patch bumps
- Use pre-release tags (beta, rc) for testing

## Rollback

If a critical bug is discovered post-publish:

```bash
npm deprecate eslint-plugin-safe-async@VERSION "Deprecated due to [reason]"
npm publish --tag next  # publish next version
```

Then coordinate with users to upgrade.
