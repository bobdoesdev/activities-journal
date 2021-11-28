import { useMutation } from '@apollo/client';
import { Formik, Form, useField, resetForm, ErrorMessage } from 'formik';
import gql from 'graphql-tag';
import * as Yup from 'yup';
import Router from 'next/router';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';
import TextInput from './TextInput';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset(props) {
  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION
  );

  return (
    <>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string().email().required('No email provided.'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const res = await signup({
            variables: {
              email: values.email,
            },
          }).catch(console.error);
        }}
      >
        <FormStyles>
          <h2>Reset your password</h2>
          <DisplayError error={error} />
          <Form method="POST">
            {data?.sendUserPasswordResetLink === null && (
              <p>Success! Check your email for a link!</p>
            )}
            <TextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
            />

            <button type="submit">Send reset link</button>
          </Form>
        </FormStyles>
      </Formik>
    </>
  );
}
