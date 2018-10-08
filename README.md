# CouchDB Test
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fzidik%2Fcouchdb-test.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fzidik%2Fcouchdb-test?ref=badge_shield)


Progressive Web App for managing a list of users. 
Works offline and automatically synchronises changes whenever there is a chance.
Simple conflict resolution is also implemented, in order to solve cases when same user has been modified in multiple devices.

## Getting Started

These instructions will get you a copy of the project up and running
on your local machine for development and testing purposes.
See deployment for notes on how to deploy the project on a live system.

### Prerequisites

The development machine should have Node and Yarn installed.

```
node --version
v9.8.0
yarn --version
1.6.0
```

A remote or local CouchDB instance is needed to sync data. Also CORS should be enabled on that instance.
URL of the instance can be configured in App.js

## Start the development server
```
yarn start
```

## Running the tests
```
yarn test
```

## Built With

* [React](https://reactjs.org/) - Library for building UI declaratively
* [Semantic UI React](https://react.semantic-ui.com/) - UI Component framework
* [PouchDB](https://pouchdb.com/) - In-browser database, syncing to CouchDB
* [prettier](https://prettier.io/) - Opinionated Code formatter


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fzidik%2Fcouchdb-test.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fzidik%2Fcouchdb-test?ref=badge_large)