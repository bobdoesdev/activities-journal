import { useMutation } from '@apollo/client';
import { Formik, Form, useField, resetForm, ErrorMessage } from 'formik';
import gql from 'graphql-tag';
import * as Yup from 'yup';
import Router from 'next/router';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';
import TextInput from './TextInput';
import { CURRENT_USER_QUERY } from './User';
import { ALL_ENTRIES_QUERY } from '../queries/ALL_ENTRIES_QUERY';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }

      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn(props) {
  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION);

  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  // console.log(error);
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string().email().required('No email provided.'),
          password: Yup.string().required('No password provided.'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const res = await signin({
            variables: {
              email: values.email,
              password: values.password,
            },
            // refetch currently logged in user
            refetchQueries: [
              {
                query: CURRENT_USER_QUERY,
              },
            ],
          });
          // go to daily page viewquery:
          // console.log(res.data.authenticateUserWithPassword.item);
          if (res.data.authenticateUserWithPassword.item) {
            Router.push({
              pathname: `dailyView`,
              refetchQueries: [{ query: ALL_ENTRIES_QUERY }],
            });
          }
        }}
      >
        <FormStyles>
          <h2>Sign into your account</h2>
          <DisplayError error={error} />
          <Form method="POST">
            <TextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
            />

            <TextInput
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
            />

            <button type="submit">Sign In</button>
          </Form>
        </FormStyles>
      </Formik>
    </>
  );
}

// todo redirect on signin
