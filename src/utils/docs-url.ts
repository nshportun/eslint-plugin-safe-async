const DOCS_BASE_URL = 'https://github.com/nshportun/eslint-plugin-safe-async/blob/master/docs/rules';

export function docsUrl(ruleName: string): string {
  return `${DOCS_BASE_URL}/${ruleName}.md`;
}
