import React from 'react';
import { Field, Formik } from 'formik';
import { Form, Header, Label } from 'semantic-ui-react';
import { UserSchema, isRequiredBySchema } from './UserSchema';

const UserFormField = ({
  type,
  name,
  label,
  errors,
  touched,
  disabled = false
}) => (
  <UserFormFieldComponent
    disabled={disabled}
    type={type}
    name={name}
    label={label}
    required={isRequiredBySchema(UserSchema, name)}
    error={errors[name] && touched[name]}
    errorText={errors[name]}
  />
);

export const UserFormFieldComponent = ({
  disabled = false,
  type,
  name,
  label,
  required,
  error,
  errorText
}) => (
  <Form.Field disabled={disabled} required={required} error={error}>
    <label htmlFor={name}>{label}</label>
    <Field type={type} name={name} />
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
      {user == null ? 'New User' : `User: ${user.firstName} ${user.lastName}`}
    </Header>
    <Label basic>Revision: {user._rev.split('-')[0]}</Label>
    <Formik
      enableReinitialize={true}
      initialValues={
        user || { email: '', firstName: '', lastName: '', country: [] }
      }
      validationSchema={UserSchema}
      onSubmit={onSubmit}
      render={({ values, errors, touched, handleSubmit, setFieldValue }) => (
        <Form error={Object.keys(errors).length !== 0} onSubmit={handleSubmit}>
          <UserFormField
            name="firstName"
            label="First Name"
            type="text"
            errors={errors}
            touched={touched}
          />
          <UserFormField
            name="lastName"
            label="Last Name"
            type="text"
            errors={errors}
            touched={touched}
          />
          <UserFormField
            name="email"
            label="Email"
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
