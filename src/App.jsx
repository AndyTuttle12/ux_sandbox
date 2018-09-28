import React, { Component } from 'react';
import './App.css';
import Nav from './components/NavPanel';
import Switch from './components/SwitchInput';
import CardDashboard from './components/CardDashboard';
import CardArea from './components/CardArea';
import Card from './components/Card';
import ToolTip from './components/ToolTip';
import TextArea from './components/TextArea';

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
          <ToolTip message="This is a tool tip for the switch component! Switch me on!" direction="down">
            <Switch onChange={e => e}/>
          </ToolTip>
          <TextArea placeholder="Type Something" onChange={() => {}}></TextArea>
        </header>
        <div className="App-body">
          <CardDashboard title="Test Dashboard">
            <Card title="Cards can be anywhere from 1-12 units wide." spanWidth={12} collapsible>
              <p>They can be any amount high, just based on the child content.</p>
              <div style={{ width: '100%', height: '120px', backgroundColor: '#777', color: '#fff'}}>I am content</div>
            </Card>

            <CardArea spanWidth={6} direction="row">
              <Card title="1ST" areaWidth={6} spanWidth={3}>
                <p>Content</p>
                <div style={{ width: '100%', height: '220px', backgroundColor: '#777', color: '#fff'}}>Content</div>
              </Card>
              <Card title="2ND" areaWidth={6} spanWidth={3}>
                <p>Some content</p>
                <div style={{ width: '100%', height: '220px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
              </Card>
              <Card title="3RD" areaWidth={6} spanWidth={2}>
                <p>Some content</p>
                <div style={{ width: '100%', height: '220px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
              </Card>
              <Card title="4TH" areaWidth={6} spanWidth={4}>
                <p>Some content</p>
                <div style={{ width: '100%', height: '220px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
              </Card>
            </CardArea>

            <CardArea spanWidth={6} direction="row">
              <Card title="5TH" areaWidth={6} spanWidth={2}>
                <p>Some content</p>
                <div style={{ width: '100%', height: '20px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
              </Card>
              <Card title="6TH" areaWidth={6} spanWidth={4}>
                <p>Some content</p>
                <div style={{ width: '100%', height: '20px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
              </Card>
              <Card title="7TH" areaWidth={6} spanWidth={6}>
                <p>Some content</p>
                <div style={{ width: '100%', height: '420px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
              </Card>
            </CardArea>

            <CardArea spanWidth={4} direction="column">
              <Card title="8TH" areaWidth={4} spanWidth={4}>
                <p>Some content</p>
                <div style={{ width: '100%', height: '120px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
              </Card>
              <Card title="9TH" areaWidth={4} spanWidth={4}>
                <p>Some content</p>
                <div style={{ width: '100%', height: '120px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
              </Card>
            </CardArea>

            <CardArea spanWidth={8} direction="column">
              <Card title="10TH" areaWidth={8} spanWidth={8}>
                <p>Some content</p>
                <div style={{ width: '100%', height: '20px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
              </Card>
              <Card title="11TH" areaWidth={8} spanWidth={8}>
                <p>Some content</p>
                <div style={{ width: '100%', height: '220px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
              </Card>
            </CardArea>

            <Card title="12TH" spanWidth={12}>
              <p>Some content</p>
              <div style={{ width: '100%', height: '20px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
            </Card>

          </CardDashboard>
        </div>
        <Nav {...this.props} navOpen={navOpen} handleNav={this.handleNav} />
      </div>
    );
  }
}

export default App;
