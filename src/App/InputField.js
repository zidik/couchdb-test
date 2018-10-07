import React from 'react';
import { Form } from 'semantic-ui-react';

export const InputField = ({ field, form: { touched, errors }, ...props }) => (
  <Form.Field error={!!(touched[field.name] && errors[field.name])}>
    <label htmlFor={props.id}>{props.label}</label>
    <input id={props.id} {...field} />
    <label>{touched[field.name] && errors[field.name]}</label>
  </Form.Field>
);
