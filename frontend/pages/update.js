import { useQuery } from '@apollo/client';
import UpdateEntry from '../components/UpdateEntry';
import { useUser } from '../components/User';
import getFormattedDate from '../lib/getFormattedDate';
import getIsoDate from '../lib/getIsoDate';
import { ALL_ENTRIES_QUERY } from '../queries/ALL_ENTRIES_QUERY';

export default function UpdatePage({ query }) {
  const user = useUser();
  const userId = user?.id;

  const formattedDate = getFormattedDate();

  // todo check if date is equal to today and if not, run a different function
  const isoString = getIsoDate();

  const { data, error, loading } = useQuery(ALL_ENTRIES_QUERY, {
    variables: {
      date: isoString,
      user: userId,
    },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>{formattedDate}</h1>
      <UpdateEntry id={query.id} />
    </>
  );
}
