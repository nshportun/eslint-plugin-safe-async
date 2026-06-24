import { docsUrl } from '../utils/docs-url';
import { messages } from '../utils/messages';

export const requireAwaitInsideTry = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Encourage local error handling for awaited operations.',
      recommended: false,
      url: docsUrl('require-await-inside-try'),
    },
    messages: {
      missingTry: messages.requireAwaitInsideTry.missingTry,
    },
    schema: [
      {
        type: 'object',
        properties: {
          ignoredFunctionNames: {
            type: 'array',
            items: { type: 'string' },
          },
          ignoredWrappers: {
            type: 'array',
            items: { type: 'string' },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context: any) {
    const options = context.options[0] || {};
    const ignoredFunctionNames = new Set(options.ignoredFunctionNames || []);

    return {
      AwaitExpression(node: any) {
        if (node.argument.type !== 'CallExpression') {
          return;
        }

        const callExpr = node.argument;
        if (callExpr.callee.type === 'Identifier' && ignoredFunctionNames.has(callExpr.callee.name)) {
          return;
        }

        let parent: any = node;
        while (parent) {
          if (parent.type === 'TryStatement') {
            return;
          }
          parent = (parent as any).parent;
        }

        context.report({
          node,
          messageId: 'missingTry',
        });
      },
    };
  },
};
