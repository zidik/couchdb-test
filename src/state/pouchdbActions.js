import PouchDB from 'pouchdb';

const dbName = 'users';
const db = new PouchDB(dbName);
const remoteDbCredentials = {
  username: '6b74720d-7b7e-4faf-aa96-1a52a155a9f7-bluemix',
  password: '2751db3a8d0baa6e827246de7c4c3e823593a2b3ea0035bc21979b4516dba67c',
  host: '6b74720d-7b7e-4faf-aa96-1a52a155a9f7-bluemix.cloudant.com'
};
const getRemoteDbUrl = ({ username, password, host }) =>
  `https://${username}:${password}@${host}`;
const remoteDbUrl = getRemoteDbUrl(remoteDbCredentials);
const remoteDB = new PouchDB(`${remoteDbUrl}/${dbName}`);

const REMOTE_DB_STATUS_CHANGED = 'REMOTE_DB_STATUS_CHANGED';
const ChangeRemoteDbStatus = status => ({
  type: REMOTE_DB_STATUS_CHANGED,
  payload: status
});

const loadAllUsersAsync = async () => {
  const response = await db.allDocs({
    include_docs: true,
    conflicts: true,
    descending: true
  });
  console.log(response);
  //TODO: assert success
  const users = response.rows.map(({ doc }) => doc);

  //Get all conflicts of all documents
  const promises = users.map(getDocConflicts);
  //Wait for requests to finish
  const allConflicts = await Promise.all(promises);
  //Flatten to single list
  const conflictArray = allConflicts.reduce((acc, val) => acc.concat(val), []);
  return {
    users,
    conflicts: conflictArray
  };
};

export const LOAD_ALL_USERS = 'LOAD_ALL_USERS';
export const loadAllUsers = () => ({
  type: LOAD_ALL_USERS,
  payload: loadAllUsersAsync()
});

export const startPouchDB = () => dispatch => {
  dispatch(startSync());
  dispatch(subscribeToChanges(db));
  dispatch(loadAllUsers());
};

//Start Sync between REMOTE and LOCAL DB.
const startSync = () => dispatch => {
  db
    .sync(remoteDB, {
      live: true,
      retry: true
    })
    .on('paused', err => dispatch(ChangeRemoteDbStatus('Idle')))
    .on('active', info => dispatch(ChangeRemoteDbStatus('Active')))
    .on('error', err => dispatch(ChangeRemoteDbStatus('Error')));
};

const subscribeToChanges = db => dispatch => {
  db
    .changes({
      since: 'now',
      live: true,
      conflicts: true,
      include_docs: true
    })
    .on('change', change => dispatch(receiveUserDocumentChange(change)));
};

export const USER_CHANGE_RECEIVED = 'USER_CHANGE_RECEIVED';
export const receiveUserDocumentChange = ({ doc }) => ({
  type: USER_CHANGE_RECEIVED,
  payload: receiveUserDocumentChangeAsync(doc)
});

const receiveUserDocumentChangeAsync = async doc => {
  //Todo: optimize - only get conflicts, that are missing
  const conflicts = await getDocConflicts(doc);
  return {
    user: doc,
    conflicts
  };
};

const getDocConflicts = async doc => {
  if (!doc._conflicts) return [];
  const promises = doc._conflicts.map(rev => db.get(doc._id, { rev }));
  return await Promise.all(promises);
};

export const resolveUserConflict = (
  updatedUser,
  versions
) => async dispatch => {
  await dispatch(updateUser(updatedUser));
  //Delete all other versions:
  const deletionPromises = versions
    .filter(user => user._rev !== updatedUser._rev)
    .map(user => dispatch(removeUser(user)));
  //Wait for deletions to complete
  await Promise.all(deletionPromises);
};

export const CREATE_USER = 'CREATE_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const UPDATE_USER = 'UPDATE_USER';

export const createUser = user => ({
  type: CREATE_USER,
  payload: (async () => {
    const response = await db.post(user);
    console.assert(response.ok);
    return response;
  })()
});

export const removeUser = user => ({
  type: REMOVE_USER,
  payload: (async () => {
    const response = await db.remove(user);
    console.assert(response.ok);
    return response;
  })()
});

export const updateUser = user => ({
  type: UPDATE_USER,
  payload: (async () => {
    const response = await db.put(user, { force: true });
    console.assert(response.ok);
    return response;
  })()
});
