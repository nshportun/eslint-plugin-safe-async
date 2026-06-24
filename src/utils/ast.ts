/* Utilities for AST node inspection */

export function isVoidExpression(node: any): boolean {
  return node.type === 'UnaryExpression' && node.operator === 'void';
}
