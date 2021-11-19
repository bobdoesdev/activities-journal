import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

// And now we can use these
const SignupForm = () => (
  <>
    <h1>Subscribe!</h1>
    <Formik
      initialValues={{
        title: '',
        notes: '',
        tag: '', // added for our select
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        notes: Yup.string(),
        tag: Yup.string()
          .oneOf(
            ['designer', 'development', 'product', 'other'],
            'Invalid Job Type'
          )
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <TextInput label="Title" name="title" type="text" placeholder="Title" />

        <TextInput
          label="Notes"
          name="notes"
          type="text"
          placeholder="DNotesoe"
        />

        <Select label="Tag" name="tag">
          <option value="">Select a job type</option>
          <option value="designer">Designer</option>
          <option value="development">Developer</option>
          <option value="product">Product Manager</option>
          <option value="other">Other</option>
        </Select>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </>
);
export default SignupForm;
