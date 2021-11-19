import { useMutation } from '@apollo/client';
import { Formik, Form, useField, resetForm, ErrorMessage } from 'formik';
import gql from 'graphql-tag';
import * as Yup from 'yup';
import Router from 'next/router';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';
import TextInput from './TextInput';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
    }
  }
`;

export default function SignUp(props) {
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION);

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          name: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string().email().required('No email provided.'),
          password: Yup.string().required('No password provided.'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const res = await signup({
            variables: {
              email: values.email,
              name: values.name,
              password: values.password,
            },
          });
        }}
      >
        <FormStyles>
          <h2>Sign up for an account</h2>
          <DisplayError error={error} />
          <Form method="POST">
            {data?.createUser && (
              <p>
                Signed up with {data.createUser.email} - Please go ahead and
                signin!
              </p>
            )}
            <TextInput
              label="Name"
              name="name"
              type="name"
              placeholder="Name"
              autoComplete="name"
            />

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

            <button type="submit">Sign Up</button>
          </Form>
        </FormStyles>
      </Formik>
    </>
  );
}

// todo redirect on signin
