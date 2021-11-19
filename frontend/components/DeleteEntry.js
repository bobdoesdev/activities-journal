import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import getIsoDate from '../lib/getIsoDate';
import { ALL_ENTRIES_QUERY } from '../queries/ALL_ENTRIES_QUERY';
import { useUser } from './User';

const DELETE_ENTRY_MUTATION = gql`
  mutation DELETE_ENTRY_MUTATION($id: ID!) {
    deleteEntry(id: $id) {
      id
      title
    }
  }
`;

function update(cache, payload) {
  console.log(payload);
  cache.evict(cache.identify(payload.data.deleteEntry));
}

export default function DeleteEntry({ id, children }) {
  const user = useUser();
  const userId = user?.id;

  const isoString = getIsoDate();

  const [deleteEntry, { loading, error }] = useMutation(DELETE_ENTRY_MUTATION, {
    variables: { id },
    update,
  });

  function handleClick() {
    if (
      confirm(
        'Are you sure you would like to delete this entry? This action is not reversible.'
      )
    ) {
      // delete it
      deleteEntry().catch((err) => alert(err.message));
    }
  }

  return (
    <button type="button" id={id} onClick={handleClick} disabled={loading}>
      {children}
    </button>
  );
}
