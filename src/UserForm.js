import React from 'react';
import { Formik, Field, Form } from 'formik';
import Yup from 'yup';

// While you can use any validation library (or write you own), Formik
// comes with special support for Yup by @jquense. It has a builder API like
// React PropTypes / Hapi.js's Joi. You can define these inline or, you may want
// to keep them separate so you can reuse schemas (e.g. address) across your application.
const NewUserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  firstName: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .max(20, 'Nice try, nobody has a first name that long')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .max(20, 'Nice try, nobody has a last name that long')
    .required('Required')
});

const UserForm = ({ user, onSubmit }) => (
  <div>
    <h1>
      {user == null
        ? 'New User'
        : `Kasutaja: ${user.firstName} ${user.lastName}`}
    </h1>
    <Formik
      enableReinitialize={true}
      initialValues={user || { email: '', firstName: '', lastName: '' }}
      validationSchema={NewUserSchema}
      onSubmit={onSubmit}
      render={({ errors, touched }) => (
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" placeholder="Jane" type="text" />

          {errors.firstName &&
            touched.firstName && (
              <div className="field-error">{errors.firstName}</div>
            )}

          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" placeholder="Doe" type="text" />

          {errors.lastName &&
            touched.lastName && (
              <div className="field-error">{errors.lastName}</div>
            )}

          <label htmlFor="email">Email</label>
          <Field name="email" placeholder="jane@acme.com" type="email" />

          {errors.email &&
            touched.email && <div className="field-error">{errors.email}</div>}

          <button type="submit">Save</button>
        </Form>
      )}
    />
  </div>
);

export default UserForm;
