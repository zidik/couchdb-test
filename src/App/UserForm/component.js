import React from 'react';
import { Field, Formik } from 'formik';
import { Button, Form } from 'semantic-ui-react';

import { UserSchema } from '../Schemas/UserSchema';
import { isRequiredBySchema } from '../Schemas/schemaHelpers';
import { generateUniqueId } from '../helpers';
import { InputField } from '../InputField';

class UserForm extends React.Component {
  state = {
    enableReinitialize: true,
    user: null
  };
  setReinitialization = bool => this.setState({ enableReinitialize: bool });

  static getDerivedStateFromProps(props, state) {
    if (!state.enableReinitialize) return null;
    //Update user only, if reinitialization is enabled
    return { user: props.user };
  }

  render() {
    return (
      <Formik
        enableReinitialize={this.state.enableReinitialize}
        initialValues={this.state.user}
        onSubmit={async (updatedUser, { setSubmitting, resetForm }) => {
          await this.props.handleSubmit(this.state.user, updatedUser);
          setSubmitting(false);
          resetForm();
        }}
        validationSchema={UserSchema}
        render={props => (
          <StatefulUserForm
            {...props}
            setReinitialization={this.setReinitialization}
          />
        )}
      />
    );
  }
}

class StatefulUserForm extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    //has there been a change?
    if (this.props.dirty === prevProps.dirty) return;
    // disable reinitialization, if now dirty
    // enable reinitialization, it now clean
    this.props.setReinitialization(!this.props.dirty);
  }
  render() {
    return <RenderForm {...this.props} />;
  }
}

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
