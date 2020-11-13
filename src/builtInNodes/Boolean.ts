import { ParserField, TypeDefinition } from 'graphql-zeus';

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
