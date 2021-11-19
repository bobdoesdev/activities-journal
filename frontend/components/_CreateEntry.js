import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import useForm from '../lib/useForm';
import Form from './styles/Form';
import ButtonStyles from './styles/ButtonStyles';
import { useUser } from './User';
import DisplayError from './ErrorMessage';
import getIsoDate from '../lib/getIsoDate';
import { ALL_ENTRIES_QUERY } from '../queries/ALL_ENTRIES_QUERY';
import CreateTag from './CreateTag';
import ButtonList from './styles/ButtonList';
import Basic from './Basic';
import SignupForm from './Basic';

const CREATE_ENTRY_MUTATION = gql`
  mutation CREATE_ENTRY_MUTATION(
    $title: String!
    $notes: String
    $actualDate: String!
    $user: ID!
    $tag: ID!
  ) {
    createEntry(
      data: {
        title: $title
        notes: $notes
        actualDate: $actualDate
        user: { connect: { id: $user } }
        tags: { connect: { id: $tag } }
      }
    ) {
      id
      title
      notes
    }
  }
`;

export const ALL_TAGS_QUERY = gql`
  query ALL_TAGS_QUERY($user: ID!) {
    allTags(where: { user: { id: $user } }) {
      id
      name
    }
  }
`;

export default function CreateEntry() {
  const { id: userId } = useUser();

  // todo check if date is equal to today and if not, run a different function
  const isoString = getIsoDate();

  const { inputs, handleChange, clearForm } = useForm({
    title: '',
    notes: '',
    tag: '',
    actualDate: isoString,
    user: userId,
  });

  const [createEntry, { data, error, loading }] = useMutation(
    CREATE_ENTRY_MUTATION,
    {
      variables: inputs,
      refetchQueries: [
        {
          query: ALL_ENTRIES_QUERY,
          variables: {
            date: isoString,
            user: userId,
          },
        },
      ],
    }
  );

  const tagQuery = useQuery(ALL_TAGS_QUERY, {
    variables: {
      user: userId,
    },
  });

  return (
    <>
      {/* <Form
        onSubmit={async (e) => {
          e.preventDefault();
          //   todo if you don't know variables at time of start, add them at submit here
          // submit input fields to backend
          await createEntry();
          clearForm();
        }}
      >
        <DisplayError error={error} />
        <fieldset disabled={loading} aria-busy={loading}>
          <h2>Add an Entry</h2>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={inputs.title}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="notes">
            Notes
            <textarea
              id="notes"
              name="notes"
              placeholder="Notes"
              value={inputs.notes}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="tag">
            Tag
            <select name="tag" id="tag" onChange={handleChange}>
              <option value="" defaultValue>
                Choose a Tag
              </option>
              {tagQuery.data?.allTags.map((tag) => (
                <option value={tag.id} key={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </label>

          <ButtonList>
            <button type="submit">Add Entry</button>
            <button type="button" className="clear" onClick={clearForm}>
              Clear form
            </button>
          </ButtonList>
        </fieldset>
      </Form>

      <CreateTag /> */}
      <SignupForm />
    </>
  );
}

// TODO add a new tag for each one that doesn't already exist
// TODO allow for selecting multiple tags per entry
