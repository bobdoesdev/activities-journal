import { useMutation } from '@apollo/client';
import { Formik, Form, useField, resetForm, ErrorMessage } from 'formik';
import gql from 'graphql-tag';
import * as Yup from 'yup';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';
import TextInput from './TextInput';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION);

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

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
          const res = await reset({
            variables: {
              email: values.email,
              password: values.password,
              token,
            },
          }).catch(console.error);
          console.log(res);
        }}
      >
        <FormStyles>
          <h2>Reset your password</h2>
          <DisplayError error={error || successfulError} />
          <Form method="POST">
            {data?.redeemUserPasswordResetToken === null && (
              <p>Success! You can now sign in!</p>
            )}
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

            <button type="submit">Reset password</button>
          </Form>
        </FormStyles>
      </Formik>
    </>
  );
}
