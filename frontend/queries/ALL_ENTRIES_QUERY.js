import gql from 'graphql-tag';

export const ALL_ENTRIES_QUERY = gql`
  query ALL_ENTRIES_QUERY($date: [String!], $user: ID!) {
    allEntries(where: { actualDate_in: $date, user: { id: $user } }) {
      id
      title
      actualDate
      notes
      tag {
        name
      }
      user {
        id
      }
    }
  }
`;
