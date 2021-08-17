import { ParserField, TypeDefinition } from 'graphql-js-tree';

export const BooleanNode: ParserField = {
  name: 'Boolean',
  data: {
    type: TypeDefinition.ScalarTypeDefinition,
  },
  type: {
    name: 'scalar',
  },
  description: `Built-in`,
};
