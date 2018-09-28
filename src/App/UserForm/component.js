import React from 'react';
import { Field, Formik } from 'formik';
import { Button, Form } from 'semantic-ui-react';

import { UserSchema } from '../Schemas/UserSchema';
import { isRequiredBySchema } from '../Schemas/schemaHelpers';
import { generateUniqueId } from '../helpers';
import { InputField } from '../InputField';

const UserForm = ({ user, handleSubmit }) => (
  <Formik
    initialValues={user}
    onSubmit={async (updatedUser, { setSubmitting }) => {
      await handleSubmit(user, updatedUser);
      setSubmitting(false);
    }}
    validationSchema={UserSchema}
    render={RenderForm}
  />
);

const RenderForm = ({ errors, touched, isSubmitting, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      id={generateUniqueId()}
      name="firstName"
      label="First Name"
      required={isRequiredBySchema(UserSchema, 'firstName')}
      component={InputField}
    />

    <Field
      id={generateUniqueId()}
      name="lastName"
      label="Last Name"
      required={isRequiredBySchema(UserSchema, 'lastName')}
      component={InputField}
    />

    <Field
      id={generateUniqueId()}
      name="email"
      label="E-mail"
      type="email"
      required={isRequiredBySchema(UserSchema, 'email')}
      component={InputField}
    />

    <Button type="submit" disabled={isSubmitting}>
      Submit
    </Button>
  </Form>
);

export default UserForm;
