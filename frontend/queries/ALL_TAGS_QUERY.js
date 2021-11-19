import gql from 'graphql-tag';

const ALL_TAGS_QUERY = gql`
  query ALL_TAGS_QUERY($user: ID!) {
    allTags(where: { user: { id: $user } }) {
      id
      name
    }
  }
`;

export default ALL_TAGS_QUERY;
