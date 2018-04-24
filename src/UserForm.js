import React from 'react';
import { Formik, Field } from 'formik';
import { Form, Message, Dropdown, Header } from 'semantic-ui-react';
import countryOptions from './countryOptions';
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
    .max(50, 'Nice try, nobody has a first name that long')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .max(50, 'Nice try, nobody has a last name that long')
    .required('Required')
});

const UserForm = ({ user, onSubmit }) => (
  <div>
    <Header as="h2">
      {user == null
        ? 'New User'
        : `Kasutaja: ${user.firstName} ${user.lastName}`}
    </Header>
    <Formik
      enableReinitialize={true}
      initialValues={
        user || { email: '', firstName: '', lastName: '', country: [] }
      }
      validationSchema={NewUserSchema}
      onSubmit={onSubmit}
      render={({ values, errors, touched, handleSubmit, setFieldValue }) => (
        <Form error={Object.keys(errors).length !== 0} onSubmit={handleSubmit}>
          <Form.Field
            required
            label="First Name"
            control={Field}
            name="firstName"
            error={errors.firstName}
            placeholder="Jane"
            type="text"
          />
          {errors.firstName &&
            touched.firstName && (
              <div className="field-error">{errors.firstName}</div>
            )}

          <Form.Field
            required
            label="Last Name"
            control={Field}
            name="lastName"
            error={errors.lastName}
            placeholder="Doe"
            type="text"
          />
          {errors.lastName &&
            touched.lastName && (
              <div className="field-error">{errors.lastName}</div>
            )}

          <Form.Field
            required
            label="Email"
            control={Field}
            name="email"
            error={errors.email}
            placeholder="jane@acme.com"
            type="email"
          />
          {errors.email &&
            touched.email && <div className="field-error">{errors.email}</div>}

          {/*<Form.Field value={values.country} onChange={(e, { name, value }) => setFieldValue(name, value)} control={Dropdown} label='Country' name='country' error={errors.country} placeholder='Country' fluid multiple search selection options={countryOptions} />*/}

          <Form.Button>Save</Form.Button>
        </Form>
      )}
    />
  </div>
);

export default UserForm;
