import React from 'react';
import { Control, Form } from 'react-redux-form';
import { Button, Icon, Table, Input } from 'semantic-ui-react';
import './style.css';

/***
 * Returns true if there exists a value inside the array that is different from others.
 * @param arr
 * @param selector selects value to compare
 */
const allNotEqual = (arr, selector = u => u) =>
  arr.map(selector).some((value, index, a) => value !== a[0]);

const UserMergeFormRow = ({ versions, name, selector, model }) => (
  <Table.Row error={allNotEqual(versions, selector)}>
    <Table.Cell>{name}</Table.Cell>
    <Table.Cell>
      <Control.text component={Input} model={model} />
    </Table.Cell>
    {versions.map(user => (
      <Table.Cell key={user._rev}>{selector(user)}</Table.Cell>
    ))}
  </Table.Row>
);

const UserMergeForm = ({ onSubmit, versions }) => (
  <Form model="editableUser" onSubmit={user => onSubmit(user, versions)}>
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
          name="First Name"
          selector={user => user.firstName}
          model=".firstName"
        />
        <UserMergeFormRow
          versions={versions}
          name="Last Name"
          selector={user => user.lastName}
          model=".lastName"
        />
        <UserMergeFormRow
          versions={versions}
          name="E-mail"
          selector={user => user.email}
          model=".email"
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
