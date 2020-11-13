import { ParserField, TypeDefinition } from 'graphql-zeus';

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
