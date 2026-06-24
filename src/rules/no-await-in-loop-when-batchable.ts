import { docsUrl } from '../utils/docs-url';
import { messages } from '../utils/messages';

export const noAwaitInLoopWhenBatchable = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Detect serial awaits in loops when the pattern can likely be replaced by Promise.all.',
      recommended: false,
      url: docsUrl('no-await-in-loop-when-batchable'),
    },
    messages: {
      serial: messages.noAwaitInLoopWhenBatchable.serial,
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowIntentionalSequencing: {
            type: 'boolean',
            description: 'Allow intentional sequential awaiting',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context: any) {
    const options = context.options[0] || {};
    const allowIntentionalSequencing = options.allowIntentionalSequencing || false;

    return {
      AwaitExpression(node: any) {
        let parent: any = node;
        let inLoop = false;

        while (parent) {
          if (parent.type === 'ForStatement' || parent.type === 'ForInStatement' || parent.type === 'ForOfStatement' || parent.type === 'WhileStatement' || parent.type === 'DoWhileStatement') {
            inLoop = true;
            break;
          }
          parent = (parent as any).parent;
        }

        if (!inLoop) {
          return;
        }

        if (allowIntentionalSequencing) {
          return;
        }

        context.report({
          node,
          messageId: 'serial',
        });
      },
    };
  },
};
