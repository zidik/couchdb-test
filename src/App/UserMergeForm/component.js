import React from 'react';
import { Button, Icon, Table, Form } from 'semantic-ui-react';
import './style.css';
import { UserSchema } from '../Schemas/UserSchema';
import { isRequiredBySchema } from '../Schemas/schemaHelpers';
import { generateUniqueId } from '../helpers';
import { Field, Formik } from 'formik';
import { InputField } from '../InputField';

/***
 * Returns true if there exists a value inside the array that is different from others.
 * @param arr
 * @param selector selects value to compare
 */
const allNotEqual = (arr, selector = u => u) =>
  arr.map(selector).some((value, index, a) => value !== a[0]);

const UserMergeFormRow = ({ versions, label, name, selector }) => (
  <Table.Row error={allNotEqual(versions, selector)}>
    <Table.Cell>{name}</Table.Cell>
    <Table.Cell>
      <Field
        id={generateUniqueId()}
        name={name}
        required={isRequiredBySchema(UserSchema, name)}
        component={InputField}
      />
    </Table.Cell>
    {versions.map(user => (
      <Table.Cell key={user._rev}>{selector(user)}</Table.Cell>
    ))}
  </Table.Row>
);

const UserMergeForm = ({ user, versions, handleSubmit }) => (
  <Formik
    initialValues={user}
    onSubmit={async (updatedUser, { setSubmitting }) => {
      await handleSubmit(updatedUser, versions);
      setSubmitting(false);
    }}
    validationSchema={UserSchema}
    render={props => <RenderUserMergeForm {...props} versions={versions} />}
  />
);

const RenderUserMergeForm = ({ versions, handleSubmit, isSubmitting }) => (
  <Form onSubmit={handleSubmit}>
    <Table compact celled definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Result</Table.HeaderCell>
          {versions.map((user, index) => (
            <Table.HeaderCell key={user._rev}>#{index + 1}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <UserMergeFormRow
          versions={versions}
          label="First Name"
          selector={user => user.firstName}
          name="firstName"
        />
        <UserMergeFormRow
          versions={versions}
          label="Last Name"
          selector={user => user.lastName}
          name="lastName"
        />
        <UserMergeFormRow
          versions={versions}
          label="E-mail"
          selector={user => user.email}
          name="email"
        />
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell colSpan="4">
            <Button
              primary
              type="submit"
              size="small"
              icon
              labelPosition="left"
              disabled={isSubmitting}
            >
              <Icon name="shuffle" /> Merge
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  </Form>
);

export default UserMergeForm;
