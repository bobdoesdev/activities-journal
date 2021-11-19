import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import CreateEntry from '../components/CreateEntry';
import Entry from '../components/Entry';
import { useUser } from '../components/User';
import getFormattedDate from '../lib/getFormattedDate';
import getIsoDate from '../lib/getIsoDate';
import { ALL_ENTRIES_QUERY } from '../queries/ALL_ENTRIES_QUERY';

export default function DailyViewPage() {
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
      <CreateEntry />
      {data.allEntries.map((entry) => (
        <Entry entry={entry} key={entry.id} />
      ))}
    </>
  );
}

// todo find out why 400 error when first redirected here
