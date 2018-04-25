import React from 'react';
import { Formik } from 'formik';
import { Form, Header, Label } from 'semantic-ui-react';
import { UserFormFieldComponent } from './UserForm';
import UserForm from './UserForm';
import { UserSchema, isRequiredBySchema } from './UserSchema';
import './ConflictResolution.css';

const ConflictResolution = ({ winningUser, conflictingUser, onSubmit }) => (
  <div className="ConflictResolution">
    <UserForm
      user={winningUser}
      onSubmit={updatedUser => onSubmit(updatedUser, conflictingUser)}
    />
    <ConflictForm user={conflictingUser} />
  </div>
);

const ConflictForm = ({ user }) => (
  <div>
    <Header as="h2">
      {user == null ? 'New User' : `User: ${user.firstName} ${user.lastName}`}
    </Header>
    <Label basic>Revision: {user && user._rev.split('-')[0]}</Label>
    <Formik
      enableReinitialize={true}
      initialValues={user}
      validationSchema={UserSchema}
      render={({ values, errors }) => (
        <Form error={Object.keys(errors).length !== 0}>
          <ConflictField
            name="firstName"
            label="First Name"
            type="text"
            errors={errors}
          />
          <ConflictField
            name="lastName"
            label="Last Name"
            type="text"
            errors={errors}
          />
          <ConflictField
            name="email"
            label="Email"
            type="email"
            errors={errors}
          />
        </Form>
      )}
    />
  </div>
);

const ConflictField = ({ type, name, label, errors }) => (
  <UserFormFieldComponent
    disabled
    type={type}
    name={name}
    label={label}
    required={isRequiredBySchema(UserSchema, name)}
    error={errors[name] !== undefined}
    errorText={errors[name]}
  />
);

export default ConflictResolution;
