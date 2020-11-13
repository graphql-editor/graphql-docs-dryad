import { ParserField, TypeDefinition } from 'graphql-zeus';

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
