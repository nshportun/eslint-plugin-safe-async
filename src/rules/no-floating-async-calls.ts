import { docsUrl } from '../utils/docs-url';
import { messages } from '../utils/messages';

export const noFloatingAsyncCalls = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Detect async calls or promise-returning calls whose results are ignored.',
      recommended: true,
      url: docsUrl('no-floating-async-calls'),
    },
    messages: {
      ignored: messages.noFloatingAsyncCalls.ignored,
    },
    schema: [
      {
        type: 'object',
        properties: {
          ignoreNames: {
            type: 'array',
            items: { type: 'string' },
            description: 'Function names to ignore',
          },
          ignoreWrappers: {
            type: 'array',
            items: { type: 'string' },
            description: 'Wrapper function names that safely handle promises',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context: any) {
    const options = context.options[0] || {};
    const ignoreNames = new Set(options.ignoreNames || []);
    const ignoreWrappers = new Set(options.ignoreWrappers || ['void']);

    function isFunctionNameIgnored(node: any): boolean {
      if (node.callee.type === 'Identifier') {
        return ignoreNames.has(node.callee.name);
      }
      if (node.callee.type === 'MemberExpression' && node.callee.property.type === 'Identifier') {
        return ignoreNames.has(node.callee.property.name);
      }
      return false;
    }

    function isIgnoredWrapper(parent: any): boolean {
      if (parent.type === 'UnaryExpression' && parent.operator === 'void') {
        return true;
      }
      if (parent.type === 'CallExpression') {
        if (parent.callee.type === 'Identifier') {
          return ignoreWrappers.has(parent.callee.name);
        }
        if (parent.callee.type === 'MemberExpression' && parent.callee.property.type === 'Identifier') {
          return ignoreWrappers.has(parent.callee.property.name);
        }
      }
      if (parent.type === 'MemberExpression') {
        if (
          parent.property.type === 'Identifier' &&
          (parent.property.name === 'catch' || parent.property.name === 'then')
        ) {
          return true;
        }
      }
      if (parent.type === 'SequenceExpression') {
        return true;
      }
      return false;
    }

    return {
      ExpressionStatement(node: any) {
        const expr = node.expression;
        if (expr.type !== 'CallExpression') {
          return;
        }

        if (isFunctionNameIgnored(expr)) {
          return;
        }

        if (isIgnoredWrapper(expr)) {
          return;
        }

        context.report({
          node,
          messageId: 'ignored',
          suggest: [
            {
              messageId: 'ignored',
              desc: 'Add `await`',
              fix(fixer: any) {
                return fixer.insertTextBefore(expr, 'await ');
              },
            },
            {
              messageId: 'ignored',
              desc: 'Add `void`',
              fix(fixer: any) {
                return fixer.insertTextBefore(expr, 'void ');
              },
            },
            {
              messageId: 'ignored',
              desc: 'Add `return`',
              fix(fixer: any) {
                return fixer.insertTextBefore(expr, 'return ');
              },
            },
          ],
        });
      },
    };
  },
};
