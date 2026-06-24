# Launch Post Outline: Introducing eslint-plugin-safe-async

## Post structure

### Hook (first 30 seconds)
- Title: "We built an ESLint plugin to catch the async bugs that cost us production incidents"
- Visual: GIF showing ESLint errors being caught in real time
- Tagline: "5 focused rules. Zero dependencies. Catches real bugs in async/await code."

### The problem
- Modern async/await is cleaner than callbacks, but introduces new classes of bugs
- Common incidents:
  - Forgotten `await` → unhandled promise rejections → process crashes
  - Sequential awaiting in loops → 10x slower than necessary
  - Empty catch blocks → errors disappear, debugging becomes impossible
  - Uncontrolled requests → resource leaks, memory spikes
- Most teams only catch these on postmortems

### Why existing tools miss them
- Broad promise linters are too noisy (high false positive rate)
- General ESLint rules don't target async patterns
- Type-checking is overkill for these bugs
- Most async libraries don't enforce safe patterns

### Introducing safe-async
- 5 focused, high-confidence rules
- Works in flat config (modern ESLint)
- Ships with excellent docs, examples, tests
- Zero runtime dependencies
- Designed for adoption in production teams

### The rules
1. **no-floating-async-calls** — Catch forgotten awaits
2. **no-await-in-loop-when-batchable** — Spot parallelization opportunities
3. **no-empty-catch-in-async** — Stop swallowing errors
4. **require-await-inside-try** — Encourage local error handling
5. **prefer-abortsignal-in-fetch-like-apis** — Support request cancellation

### Installation and quick start
```bash
npm install --save-dev @nshportun/eslint-plugin-safe-async
```

Show flat config example (2-3 lines)

### Why we built this way
- Quality > quantity
- Focus on real bugs, not style
- Low false-positive rate (trust is earned)
- Community adoption first

### What's next
- We want feedback from production teams
- Plan to iterate based on real-world usage
- v1.0 after validation

### Call to action
- Try it: "npm install eslint-plugin-safe-async"
- Report issues
- Contribute

---

## Distribution channels

- **dev.to** (main)
- **Hacker News** (if strong reception)
- **ESLint discussions** (where allowed)
- **Twitter/X** (with demo GIF)
- **GitHub discussions** (for feedback collection)

## Before publishing

- [ ] Populate GitHub repository
- [ ] Update all placeholder URLs (YOUR_USERNAME → actual username)
- [ ] Create GitHub release notes with changelog
- [ ] Publish npm package with provenance
- [ ] Create short demo GIF (5-10 seconds)
- [ ] Prepare launch post
- [ ] Schedule announcements across channels
