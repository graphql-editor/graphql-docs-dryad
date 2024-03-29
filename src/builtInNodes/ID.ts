import { ParserField, TypeDefinition } from 'graphql-js-tree';

export const IDNode: ParserField = {
  name: 'ID',
  data: {
    type: TypeDefinition.ScalarTypeDefinition,
  },
  type: {
    name: 'scalar',
  },
  description: `Built-in`,
};
