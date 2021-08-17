import { ParserField, TypeDefinition } from 'graphql-js-tree';

export const IntNode: ParserField = {
  name: 'Int',
  data: {
    type: TypeDefinition.ScalarTypeDefinition,
  },
  type: {
    name: 'scalar',
  },
  description: `Built-in`,
};
