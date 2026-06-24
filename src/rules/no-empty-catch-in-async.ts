import { docsUrl } from '../utils/docs-url';
import { messages } from '../utils/messages';

export const noEmptyCatchInAsync = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow empty catch blocks around async operations.',
      recommended: true,
      url: docsUrl('no-empty-catch-in-async'),
    },
    messages: {
      empty: messages.noEmptyCatchInAsync.empty,
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowCommentMarker: {
            type: 'string',
            description: 'Allow empty catch blocks with this comment marker',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context: any) {
    const options = context.options[0] || {};
    const allowCommentMarker = options.allowCommentMarker || 'intentionally ignored';
    const sourceCode = context.sourceCode;

    return {
      CatchClause(node: any) {
        if (node.body.body.length === 0) {
          const comments = sourceCode.getCommentsInside(node);
          const hasMarkerComment = comments.some((comment: any) =>
            comment.value.toLowerCase().includes(allowCommentMarker.toLowerCase())
          );

          if (!hasMarkerComment) {
            context.report({
              node,
              messageId: 'empty',
            });
          }
        }
      },
    };
  },
};
