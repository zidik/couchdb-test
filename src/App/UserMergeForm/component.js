import React from 'react';
import { Control, Form } from 'react-redux-form';
import { Button, Icon, Table, Input } from 'semantic-ui-react';
import './style.css';
/*
const MergeField = ({value}) =>
  <div className="mergeField">
    <SemForm.Button/>
    <div>{value}</div>
  </div>;

const UserMergeForm = ({onSubmit, user, conflictingUser}) =>
  <SemForm as={Form} model="editableUser" onSubmit={user => onSubmit(user, conflictingUser)}>
    <SemForm.Field className="mergeRow">
      <label>
        First name:
        <Control.text model=".firstName" />
      </label>
      <MergeField value={conflictingUser && conflictingUser.firstName} />
    </SemForm.Field>

    <SemForm.Field className="mergeRow">
      <label>
        Last name:
        <Control.text model=".lastName" />
      </label>
      <MergeField value={conflictingUser && conflictingUser.lastName} />
    </SemForm.Field>
    <SemForm.Field className="mergeRow">
      <label>
        E-mail:
        <Control.text model=".email" />
      </label>
      <MergeField value={conflictingUser && conflictingUser.email} />
    </SemForm.Field>
    <SemForm.Button type="submit">
      Merge
    </SemForm.Button>
  </SemForm>;

export default UserMergeForm;
*/

const TableExampleApprove = ({ onSubmit, versions }) => (
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
        <Table.Row
          error={versions.some(
            (user, index, arr) => user.firstName !== arr[0].firstName
          )}
        >
          <Table.Cell>First Name</Table.Cell>
          <Table.Cell>
            <Control.text component={Input} model=".firstName" />
          </Table.Cell>
          {versions.map(user => (
            <Table.Cell key={user._rev}>{user.firstName}</Table.Cell>
          ))}
        </Table.Row>
      </Table.Body>

      <Table.Body>
        <Table.Row
          error={versions.some(
            (user, index, arr) => user.lastName !== arr[0].lastName
          )}
        >
          <Table.Cell>Last Name</Table.Cell>
          <Table.Cell>
            <Control.text component={Input} model=".lastName" />
          </Table.Cell>
          {versions.map(user => (
            <Table.Cell key={user._rev}>{user.lastName}</Table.Cell>
          ))}
        </Table.Row>
      </Table.Body>

      <Table.Body>
        <Table.Row
          error={versions.some(
            (user, index, arr) => user.email !== arr[0].email
          )}
        >
          <Table.Cell>E-Mail</Table.Cell>
          <Table.Cell>
            <Control.text component={Input} model=".email" />
          </Table.Cell>
          {versions.map(user => (
            <Table.Cell key={user._rev}>{user.email}</Table.Cell>
          ))}
        </Table.Row>
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

export default TableExampleApprove;
