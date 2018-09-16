import React, { Component } from 'react';
import './App.css';
import Nav from './components/NavPanel';
import Switch from './components/SwitchInput';
import CardDashboard from './components/CardDashboard';
import Card from './components/Card';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navOpen: true,
    };
  }

  handleNav = () => {
    this.setState({ navOpen: !this.state.navOpen });
  }

  render() {
    const { navOpen } = this.state;
    return (
      <div className={`App ${navOpen?'standard':'expanded'}`}>
        <header className="App-header">
          <h1 className="App-title">Testing Component Designs...</h1>
          <Switch disabled onChange={e => e}/>
        </header>
        <div className="App-body">
          <CardDashboard title="Dashboard">
            <Card title="1ST" spanWidth={12}>
              <p>Some content</p>
              <div style={{ width: '100%', height: '100px', backgroundColor: '#777', color: '#fff'}}>I am a chart</div>
            </Card>
            <Card title="2ND" spanWidth={2}>
              <p>Some content</p>
              <div style={{ width: '100%', height: '100px', backgroundColor: '#777', color: '#fff'}}>I am a chart</div>
            </Card>
            <Card title="3RD" spanWidth={6}>
              <p>Some content</p>
              <div style={{ width: '100%', height: '100px', backgroundColor: '#777', color: '#fff'}}>I am a chart</div>
            </Card>
            <Card title="4TH" spanWidth={2}>
              <p>Some content</p>
              <div style={{ width: '100%', height: '100px', backgroundColor: '#777', color: '#fff'}}>I am a chart</div>
            </Card>
            <Card title="5TH" spanWidth={2}>
              <p>Some content</p>
              <div style={{ width: '100%', height: '100px', backgroundColor: '#777', color: '#fff'}}>I am a chart</div>
            </Card>
            <Card title="6TH" spanWidth={4}>
              <p>Some content</p>
              <div style={{ width: '100%', height: '100px', backgroundColor: '#777', color: '#fff'}}>I am a chart</div>
            </Card>
            <Card title="7TH" spanWidth={2}>
              <p>Some content</p>
              <div style={{ width: '100%', height: '100px', backgroundColor: '#777', color: '#fff'}}>I am a chart</div>
            </Card>
            <Card title="8TH" spanWidth={6}>
              <p>Some content</p>
              <div style={{ width: '100%', height: '100px', backgroundColor: '#777', color: '#fff'}}>I am a chart</div>
            </Card>
            <Card title="9TH" spanWidth={3}>
              <p>Some content</p>
              <div style={{ width: '100%', height: '100px', backgroundColor: '#777', color: '#fff'}}>I am a chart</div>
            </Card>
            <Card title="10TH" spanWidth={3}>
              <p>Some content</p>
              <div style={{ width: '100%', height: '100px', backgroundColor: '#777', color: '#fff'}}>I am a chart</div>
            </Card>
            <Card title="11TH" spanWidth={3}>
              <p>Some content</p>
              <div style={{ width: '100%', height: '100px', backgroundColor: '#777', color: '#fff'}}>I am a chart</div>
            </Card>
            <Card title="12TH" spanWidth={3}>
              <p>Some content</p>
              <div style={{ width: '100%', height: '100px', backgroundColor: '#777', color: '#fff'}}>I am a chart</div>
            </Card>
          </CardDashboard>
        </div>
        <Nav {...this.props} navOpen={navOpen} handleNav={this.handleNav} />
      </div>
    );
  }
}

export default App;
