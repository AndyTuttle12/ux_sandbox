import React, { Component } from 'react';
import './App.css';
import Nav from './components/NavPanel';
import Switch from './components/SwitchInput';
import CardDashboard from './components/CardDashboard';
import CardArea from './components/CardArea';
import Card from './components/Card';
import ToolTip from './components/ToolTip';
import TextInput from './components/TextInput';
import TextArea from './components/TextArea';
import Button from './components/Button';
import Tabs from './components/Tabs';
import DataList from './components/DataList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navOpen: true,
      tab: null,
      list: [],
    };
  }

  handleNav = () => {
    this.setState({ navOpen: !this.state.navOpen });
  }

  setTab = (name) => {
    this.setState({ tab: name });
  }

  handleList = (options, callback) => {
    console.log(options)
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const list = data.slice(0, 10);
        console.log(list)
        return callback({
          total: data.length,
          list,
        });
      })
      .catch(error => console.error(error))
  }

  render() {
    const { navOpen, tab } = this.state;
    const columns = [
      {
        header: 'Item ID',
        accessor: 'id',
      },
      {
        header: 'Title',
        accessor: 'title',
      },
    ]
    return (
      <div className={`App ${navOpen?'standard':'expanded'}`}>
        <header className="App-header">
          <h1 className="App-title">Testing Component Designs...</h1>
          <ToolTip message="This is a tool tip for the switch component! Switch me on!" direction="down">
            <Switch onChange={e => e}/>
          </ToolTip>
        </header>
        <div className="App-body">
          <CardDashboard title="Test Dashboard">
            <Card title="Cards can be anywhere from 1-12 units wide." spanWidth={12} collapsible>
              <p>They can be any amount high, just based on the child content.</p>
              <TextInput placeholder="An Input" onChange={() => {}}></TextInput>
              <TextArea resize="none" placeholder="A Text area. I wonder how big this gets..." onChange={() => {}}></TextArea>
              <Button onClick={() => console.log(this.props.context)}>Click Me!</Button>
              <Tabs opentab={(name) => this.setTab(name)} selectedTab={tab} names={['1', '2', '3']} />
              {tab === null && (<div style={{ width: '100%', height: '20px', backgroundColor: '#777', color: '#fff'}}>Default content if no tab is selected.</div>)}
              {tab === '1' && (<div style={{ width: '100%', height: '120px', backgroundColor: '#777', color: '#fff'}}>This is tab 1 content</div>)}
              {tab === '2' && (<div style={{ width: '100%', height: '120px', backgroundColor: '#777', color: '#fff'}}>This is tab 2 content</div>)}
              {tab === '3' && (<div style={{ width: '100%', height: '120px', backgroundColor: '#777', color: '#fff'}}>This is tab 3 content</div>)}
            </Card>

            <CardArea spanWidth={6} collapsible direction="row">
              <Card title="1ST" areaWidth={6} spanWidth={3} footerText="Testing text.">
                <p>Content</p>
                <div style={{ width: '100%', height: '130px', backgroundColor: '#777', color: '#fff'}}>Content</div>
              </Card>
              <Card title="2ND" areaWidth={6} spanWidth={3} footerActions={<Button onClick={() => console.log('Clicked')}>Action</Button>}>
                <p>Some content</p>
                <div style={{ width: '100%', height: '130px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
              </Card>
              <Card title="3RD" areaWidth={6} spanWidth={2}>
                <p>Some content</p>
                <div style={{ width: '100%', height: '200px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
              </Card>
              <Card title="4TH" areaWidth={6} spanWidth={4}>
                <p>Some content</p>
                <div style={{ width: '100%', height: '200px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
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
                <DataList columns={columns} fetchData={(options, callback) => this.handleList(options, callback)} rowClick={(item) => console.log(item)} />
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
