import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import gql from 'graphql-tag';
import { Formik, Form, useField, resetForm, setValues } from 'formik';
import * as Yup from 'yup';
import getIsoDate from '../lib/getIsoDate';
import FormStyles from './styles/FormStyles';
import { useUser } from './User';
import CreateTag from './CreateTag';
import Select from './Select';
import TextInput from './TextInput';
import ALL_TAGS_QUERY from '../queries/ALL_TAGS_QUERY';

const SINGLE_ENTRY_QUERY = gql`
  query SINGLE_ENTRY_QUERY($id: ID!) {
    Entry(where: { id: $id }) {
      id
      title
      notes
      actualDate
      tag {
        id
        name
      }
    }
  }
`;

const UPDATE_ENTRY_MUTATION = gql`
  mutation UPDATE_ENTRY_MUTATION(
    $id: ID!
    $title: String!
    $notes: String
    $tag: ID!
  ) {
    updateEntry(
      id: $id
      data: { title: $title, notes: $notes, tag: { connect: { id: $tag } } }
    ) {
      id
      title
      notes
    }
  }
`;

export default function UpdateEntry({ id }) {
  const { id: userId } = useUser();

  // get existing product
  const { data, error, loading } = useQuery(SINGLE_ENTRY_QUERY, {
    variables: {
      id,
    },
  });

  // get mutation to update product
  const [
    updateEntry,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_ENTRY_MUTATION);

  const selected = data?.Entry.tag.id;

  const { data: tagData } = useQuery(ALL_TAGS_QUERY, {
    variables: {
      user: userId,
    },
  });

  // we aren't getting the initial values until after the query has finished
  const initial = data?.Entry || {};
  const initialValues = Object.values(initial).join('');
  useEffect(() => {
    //   runs when things we are watching change

    Formik.initialValues = {
      title: data?.Entry.title,
      notes: data?.Entry.notes,
      tag: { value: data?.Entry.tag.id },
    };
  }, [initialValues]);

  // form to handle update
  // TODO fix updating tags

  return (
    <>
      <Formik
        initialValues={initial}
        enableReinitialize
        validationSchema={Yup.object({
          title: Yup.string().required('Required'),
          notes: Yup.string(),
          tag: Yup.string(),
          // .oneOf(
          //   tagData?.allTags.map((tag) => tag.id),
          //   'Invalid Job Type'
          // )
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const res = await updateEntry({
            variables: {
              id,
              title: values.title,
              notes: values.notes,
              tag: values.tag || data?.Entry.tag.name,
            },
          });

          //   actions.resetForm();
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

            <Select
              label="Tag"
              name="tag"
              //   defaultValue={selected}
              //   value={selected}
            >
              <option value="">Choose a Tag</option>
              {tagData?.allTags.map((tag) => (
                <option value={tag.id} key={tag.id}>
                  {tag.name}
                </option>
              ))}
            </Select>

            <button type="submit">Update Entry</button>
          </Form>
        </FormStyles>
      </Formik>
      <CreateTag />
    </>
  );
}
