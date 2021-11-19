import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import { Formik, Form, useField, resetForm } from 'formik';
import * as Yup from 'yup';
import ButtonStyles from './styles/ButtonStyles';
import { useUser } from './User';
import DisplayError from './ErrorMessage';
import getIsoDate from '../lib/getIsoDate';
import { ALL_ENTRIES_QUERY } from '../queries/ALL_ENTRIES_QUERY';
import CreateTag from './CreateTag';
import ButtonList from './styles/ButtonList';
import Select from './Select';
import TextInput from './TextInput';
import FormStyles from './styles/FormStyles';

export const CREATE_ENTRY_MUTATION = gql`
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
        tag: { connect: { id: $tag } }
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

  const [createEntry, { data, error, loading }] = useMutation(
    CREATE_ENTRY_MUTATION,
    {
      // variables: inputs,
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

  // get the datafor all the tags
  const { data: tagData } = useQuery(ALL_TAGS_QUERY, {
    variables: {
      user: userId,
    },
  });

  return (
    <>
      <Formik
        initialValues={{
          title: '',
          notes: '',
          tag: 'Something else', // added for our select
        }}
        validationSchema={Yup.object({
          title: Yup.string().required('Required'),
          notes: Yup.string(),
          tag: Yup.string()
            // .oneOf(
            //   tagData?.allTags.map((tag) => tag.id),
            //   'Invalid Job Type'
            // )
            .required('Required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const res = await createEntry({
            variables: {
              title: values.title,
              notes: values.notes,
              tag: values.tag,
              user: userId,
              actualDate: isoString,
            },
          });

          // actions.resetForm();
          // resetForm({ values: '' });

          console.log(res);
        }}
      >
        <FormStyles>
          <Form>
            <TextInput
              label="Title"
              name="title"
              type="text"
              placeholder="Title"
            />

            <TextInput
              label="Notes"
              name="notes"
              type="text"
              placeholder="Notes"
            />

            <Select label="Tag" name="tag">
              <option value="">Choose a Tag</option>
              {tagData?.allTags.map((tag) => (
                <option value={tag.id} key={tag.id}>
                  {tag.name}
                </option>
              ))}
            </Select>

            <button type="submit">Add Entry</button>
          </Form>
        </FormStyles>
      </Formik>
      <CreateTag />
    </>
  );
}

// TODO add a new tag for each one that doesn't already exist
// TODO allow for selecting multiple tags per entry
