import React, { Component } from 'react';
import './App.css';
import Nav from './components/NavPanel';
import Switch from './components/SwitchInput';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Testing Component Designs...</h1>
        </header>
        <Nav {...this.props} />
        <Switch disabled onChange={e => e}/>
      </div>
    );
  }
}

export default App;
