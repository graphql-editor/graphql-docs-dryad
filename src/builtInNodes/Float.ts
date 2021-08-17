import { ParserField, TypeDefinition } from 'graphql-js-tree';

export const FloatNode: ParserField = {
  name: 'Float',
  data: {
    type: TypeDefinition.ScalarTypeDefinition,
  },
  type: {
    name: 'scalar',
  },
  description: `Built-in`,
};
