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

// (where: {
//   id: "6192a8ad5686783fd4f6aa28",
//   sser: { id: "6192a36d09beb53b60a0dc4e" }
// })
