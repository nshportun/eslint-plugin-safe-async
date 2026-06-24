/* Utilities for rule option schemas */

export function createStringArraySchema(description: string): any {
  return {
    type: 'array',
    items: {
      type: 'string',
    },
    description,
  };
}

export function createObjectSchema(properties: Record<string, any>): any {
  return {
    type: 'object',
    properties,
    additionalProperties: false,
  };
}
