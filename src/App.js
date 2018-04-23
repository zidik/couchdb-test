import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PouchDB from 'pouchdb';

const db = new PouchDB('kittens');
const remoteDB = new PouchDB('http://localhost:5984/kittens');

class App extends Component {
    state = {
        remoteDbStatus: "unknown",
        kittens: {}
    };
    getKitten = async id => await db.get(id);
    updateKitten = async kitten => {
        const response = await db.put(kitten);
        console.assert(response.ok);
        return await db.get(response.id);
    };
    addKitten = async () => {
        const kitten = {name: ''};
        const response = await db.post(kitten);
        console.assert(response.ok);
        return {id: response.id, rev: response.rev}
    };
    handleDbChange = ({id, seq, changes, doc}) => {
        this.setState((state, props) => ({
            kittens: {
                ...state.kittens,
                [id]: doc,
            }
        }))
    };
    async componentDidMount(){
        db.sync(remoteDB, {
            live: true,
            retry: true
        })
            .on('change', change => {})
            .on('paused', info => this.setState({remoteDbStatus:"disconnected"}))
            .on('active', info => this.setState({remoteDbStatus:"active"}))
            .on('error', err => this.setState({remoteDbStatus:"error"}));


        db.changes({
            since: 'now',
            live: true,
            include_docs: true,
        }).on('change', this.handleDbChange);
        const response = await await db.allDocs({
            include_docs: true,
            descending: true
        });
        const newKittens = response.rows.reduce((acc,row) => {acc[row.id] = row.doc; return acc}, {});
        this.setState((state, props) => ({
            kittens: {
                ...state.kittens,
                ...newKittens,
            }
        }))
    }
    render() {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
              <input type="button" value="Lisa kass" onClick={this.addKitten} />
              {Object.values(this.state.kittens).map(kitten =>
                  <Kitten
                      key={kitten._id}
                      kitten={kitten}
                      handleUpdate={this.updateKitten} />)}
          </div>
        );
    }
}

class Kitten extends React.Component {

    state = {
        name: this.props.kitten.name,
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const kitten = {
            ...this.props.kitten,
            name: this.state.name,
        };
        this.props.handleUpdate(kitten);
    };
    handleChange = (event) => {
        const name = event.target.value;
        this.setState((state,props) => ({name: name}))
    };
    static getDerivedStateFromProps = (props, prevState) => ({...prevState, name: props.kitten.name});

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">
                    Nimi:
                </label>
                <input
                    id="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange} />
                <input
                    type="submit"
                    value="Salvesta" />
            </form>
        )
    }
}

export default App;
