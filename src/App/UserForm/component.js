import React from 'react';
import { Control, Form } from 'react-redux-form';
import { Form as SemForm } from 'semantic-ui-react';

const UserForm = ({ onSubmit }) => (
  <SemForm as={Form} model="editableUser" onSubmit={onSubmit}>
    <SemForm.Field>
      <label>
        First name:
        <Control.text model=".firstName" />
      </label>
    </SemForm.Field>
    <SemForm.Field>
      <label>
        Last name:
        <Control.text model=".lastName" />
      </label>
    </SemForm.Field>
    <SemForm.Field>
      <label>
        E-mail:
        <Control.text model=".email" />
      </label>
    </SemForm.Field>
    <SemForm.Button type="submit">Save</SemForm.Button>
  </SemForm>
);

export default UserForm;
