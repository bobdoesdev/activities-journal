import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import addUniqueTag from './addUniqueTag';

// make fake graphql agged template literal
const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addUniqueTag(name: String, user: ID): Tag
    }
  `,
  resolvers: {
    Mutation: {
      addUniqueTag,
    },
  },
});
