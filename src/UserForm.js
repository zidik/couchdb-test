import React from 'react';
import { Formik, Field } from 'formik';
import { Form, Message, Dropdown, Header, Label } from 'semantic-ui-react';
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

const isRequiredBySchema = (schema, name) =>
  Yup.reach(schema, name)
    .describe()
    .tests.some(test => test === 'required');

const CustomField = ({ type, name, label, placeholder, errors, touched }) => (
  <CustomFieldComponent
    type={type}
    name={name}
    label={label}
    placeholder={placeholder}
    required={isRequiredBySchema(NewUserSchema, name)}
    error={errors[name] && touched[name]}
    errorText={errors[name]}
  />
);

const CustomFieldComponent = ({
  type,
  name,
  label,
  placeholder,
  required,
  error,
  errorText
}) => (
  <Form.Field required={required} error={error}>
    <label htmlFor={name}>{label}</label>
    <Field type={type} name={name} placeholder={placeholder} />
    {error && (
      <Label basic color="brown" pointing>
        {errorText}
      </Label>
    )}
  </Form.Field>
);

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
          <CustomField
            name="firstName"
            label="First Name"
            placeholder="Jane"
            type="text"
            errors={errors}
            touched={touched}
          />
          <CustomField
            name="lastName"
            label="Last Name"
            placeholder="Doe"
            type="text"
            errors={errors}
            touched={touched}
          />
          <CustomField
            name="email"
            label="Email"
            placeholder="jane@acme.com"
            type="email"
            errors={errors}
            touched={touched}
          />

          {/*<Form.Field value={values.country} onChange={(e, { name, value }) => setFieldValue(name, value)} control={Dropdown} label='Country' name='country' error={errors.country} placeholder='Country' fluid multiple search selection options={countryOptions} />*/}

          <Form.Button>Save</Form.Button>
        </Form>
      )}
    />
  </div>
);

export default UserForm;
