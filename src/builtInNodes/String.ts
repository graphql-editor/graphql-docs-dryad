import { ParserField, TypeDefinition } from 'graphql-js-tree';

export const StringNode: ParserField = {
  name: 'String',
  data: {
    type: TypeDefinition.ScalarTypeDefinition,
  },
  type: {
    name: 'scalar',
  },
  description: `Built-in`,
};
