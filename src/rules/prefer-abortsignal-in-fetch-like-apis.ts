import { docsUrl } from '../utils/docs-url';
import { messages } from '../utils/messages';

export const preferAbortsignalInFetchLikeApis = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Encourage an AbortSignal option for recognized fetch-like calls.',
      recommended: false,
      url: docsUrl('prefer-abortsignal-in-fetch-like-apis'),
    },
    messages: {
      missing: messages.preferAbortsignalInFetchLikeApis.missing,
    },
    schema: [
      {
        type: 'object',
        properties: {
          apis: {
            type: 'array',
            items: { type: 'string' },
            description: 'API function names to check for AbortSignal',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context: any) {
    const options = context.options[0] || {};
    const apis = new Set(options.apis || ['fetch', 'request']);

    function hasAbortSignalOption(node: any): boolean {
      if (node.arguments.length < 2) {
        return false;
      }

      const lastArg = node.arguments[node.arguments.length - 1];
      if (lastArg.type !== 'ObjectExpression') {
        return false;
      }

      return lastArg.properties.some((prop: any) => {
        if (prop.type === 'Property' && prop.key.type === 'Identifier') {
          return prop.key.name === 'signal';
        }
        if (prop.type === 'SpreadElement') {
          return true;
        }
        return false;
      });
    }

    return {
      CallExpression(node: any) {
        if (node.callee.type === 'Identifier' && apis.has(node.callee.name)) {
          if (!hasAbortSignalOption(node)) {
            context.report({
              node,
              messageId: 'missing',
            });
          }
        }
      },
    };
  },
};
