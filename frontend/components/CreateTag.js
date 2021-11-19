import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import FormStyles from './styles/FormStyles';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { useUser } from './User';
import ALL_TAGS_QUERY from '../queries/ALL_TAGS_QUERY';

const CREATE_TAG_MUTATION = gql`
  mutation CREATE_TAG_MUTATION($name: String!, $user: ID!) {
    createTag(data: { name: $name, user: { connect: { id: $user } } }) {
      id
      name
    }
  }
`;

const TagFormStyles = styled.div`
  display: flex;
  justify-content: space-between;

  label {
    width: 100%;
  }

  button {
    margin-left: 20px;
    background: var(--blue);
    line-height: 1;
    padding: 1.3rem 1.5rem;
  }
`;

export default function CreateTag(props) {
  const { id: userId } = useUser();
  const { inputs, handleChange, clearForm } = useForm({
    user: userId,
  });

  //   TODO make sure this tag doesn't already exist
  const [createTag, { data, error, loading }] = useMutation(
    CREATE_TAG_MUTATION,
    {
      variables: inputs,
      refetchQueries: [
        {
          query: ALL_TAGS_QUERY,
          variables: {
            user: userId,
          },
        },
      ],
    }
  );

  return (
    <FormStyles>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await createTag();
          clearForm();
        }}
      >
        <DisplayError error={error} />
        <TagFormStyles>
          <label htmlFor="name">
            Add New Tag
            <input
              type="name"
              id="name"
              name="name"
              placeholder="Add New Tag"
              value={inputs.name}
              onChange={handleChange}
            />
          </label>

          <button type="submit">+</button>
        </TagFormStyles>
      </form>
    </FormStyles>
  );
}
