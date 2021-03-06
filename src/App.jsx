import React, { Component } from 'react';
import './App.css';
import AppContext from './AppContext';
import Nav from './components/NavPanel';
import Switch from './components/SwitchInput';
import CardDashboard from './components/CardDashboard';
import CardArea from './components/CardArea';
import Card from './components/Card';
import ToolTip from './components/ToolTip';
import TextInput from './components/TextInput';
import NumberInput from './components/NumberInput';
import TextArea from './components/TextArea';
import Button from './components/Button';
import Tabs from './components/Tabs';
import MiniTable from './components/MiniTable';
import MessageContainer from './components/MessageContainer';
import Modal from './components/Modal';
import icon from './components/NavPanel/images/placeholderApp.svg';
import InfiniteScroll from './components/InfiniteScroll';
import Form from './components/Form';
import Carousel from './components/Carousel';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navOpen: true,
      tab: null,
      list: [],
      toasts: [],
      notifications: [],
      showModal: false,
      switched: false,
      modalContent: '',
      infiniteData: [],
      infiniteLoaded: false,
      formValues: {
        input: '',
        number: null,
        textarea: '',
      },
      validationRules: {
        input: '([0-9]|test|^$)',
        number: '([0-9]+|^$)',
        textarea: '([0-9]|test|^$)',
      },
      formError: '',
    };
  }

  handleNav = () => {
    this.setState({ navOpen: !this.state.navOpen });
  }

  setTab = (name) => {
    this.setState({ tab: name });
  }

  handleList = (options, callback) => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        const list = data.slice(0, 10);
        return callback({
          total: data.length,
          list,
        });
      })
      .catch(error => console.error(error))
  }

  openModal = (modalContent) => {
    this.setState({ showModal: true, modalContent });
  }

  closeModal = () => {
    this.setState({ showModal: false, modalContent: {title: '', body: ''} });
  }

  submitModal = (formData) => {
    this.setState({ showModal: false, modalContent: {title: '', body: ''} });
    return formData;
  }

  handleSwitch = () => {
    this.setState({ switched: !this.state.switched });
  }

  updateForm = (values) => {
    this.setState({ formValues: { ...this.state.formValues, ...values } }, () => {
      if (this.state.validationRules) {
        this.validateForm(values);
      }
    });
  }

  validateForm = (values) => {
    let formValid = true;
    const rules = Object.keys(this.state.validationRules);
    for (let rule of rules) {
      if (values.hasOwnProperty(rule)) {
        const regexComparison = new RegExp(this.state.validationRules[rule], 'gmi');
        formValid = regexComparison.test(values[rule]);
        if (!formValid) {
          console.log('INVALID FORM');
          this.setState({ formError: `Invalid Form`});
          return false;
        }
      }
    }
    if (formValid) {
      console.log('VALID FORM');
      this.setState({ formError: ''});
      return true;
    }
  }

  submitForm = () => {
    const valid = this.validateForm(this.state.formValues);
    if (!valid) {
      console.log('Cannot Submit invalid form.');
      return;
    }
    // Call an API here with the updated data.
    console.log('Submit the form!');
    console.log(this.state.formValues);
    return true;
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
      <AppContext.Provider value={this.state}>
        <div className={`App ${navOpen?'standard':'expanded'}`}>
          <header className="App-header">
            <h1 className="App-title">Testing Component Designs...</h1>
            <ToolTip message="This is a tool tip for the switch component! Switch me on!" direction="down">
              <Switch value={`${this.state.switched}`} onChange={this.handleSwitch}/>
            </ToolTip>
          </header>
          <div className="App-body">
            <CardDashboard title="Test Dashboard">
              <Card title="Cards can be anywhere from 1-12 units wide." spanWidth={6} spanHeight={2} collapsible configurable>
                <p>They can be any amount high, just based on the child content.</p>
                <Form
                  action={'action'}
                  submitForm={() => this.submitForm()}
                  formValues={this.state.formValues}
                >
                  <TextInput placeholder="An Input" onChange={() => {}} onBlur={(e) => this.updateForm({input: e.target.value})} clearable={true} clearInput={() => console.log('CLEAR')}></TextInput>
                  <NumberInput onChange={(e) => this.updateForm({ number: Number(e.target.value) })}/>
                  <TextArea resize="all" placeholder="A Text area. I wonder how big this gets..." onChange={() => {}} onBlur={(e) => this.updateForm({textarea: e.target.value})}></TextArea>
                  <Button
                    onClick={() => this.openModal({
                      title: 'Confirm Button Press',
                      body: 'Are you sure you want to click this button? It may cause something to happen...',
                      actions: [
                        {
                          name: 'info',
                          onClick: () => alert('Here is some info!'),
                        },
                        {
                          name: 'submit',
                          onClick: () => this.submitForm(),
                        },
                      ]
                    })}
                  >
                    <img src={icon} alt="icon" />
                    Submit Form
                  </Button>
                  <div className="form-error">
                    <span className="error">{this.state.formError}</span>
                  </div>
                </Form>
                <Tabs opentab={(name) => this.setTab(name)} selectedTab={tab} names={['1', '2', '3']} />
                {tab === null && (<div style={{ width: '100%', height: '100px', backgroundColor: '#777', color: '#fff'}}>Default content if no tab is selected.</div>)}
                {tab === '1' && (<div style={{ width: '100%', height: '100px', backgroundColor: '#777', color: '#fff'}}>This is tab 1 content</div>)}
                {tab === '2' && (<div style={{ width: '100%', height: '100px', backgroundColor: '#777', color: '#fff'}}>This is tab 2 content</div>)}
                {tab === '3' && (
                  <div style={{ width: '100%', height: '100px', backgroundColor: '#777', color: '#fff'}}>
                    This is tab 3 content
                    <Button
                      onClick={() => this.setState({tab: '1'})}
                    >
                      Open Tab 1!
                    </Button>
                  </div>
                )}
              </Card>
              <Card configurable title="Card with Carousel" spanWidth={6} style={{minWidth: '200px'}}>
                <Carousel
                  items={[
                    'One',
                    'Two',
                    'Three',
                    'Four',
                    'Five',
                    'Six',
                    'Seven',
                    'Eight',
                    'Nine',
                    'Ten',
                  ]}
                />
              </Card>
              <CardArea spanWidth={6} collapsible direction="row">
                <Card configurable title="1ST" areaWidth={6} spanWidth={3} footerText="Testing text." style={{minWidth: '200px'}}>
                  <p>Content</p>
                  <div style={{ width: '100%', height: '130px', backgroundColor: '#777', color: '#fff'}}>Content</div>
                </Card>
                <Card configurable title="2ND" areaWidth={6} spanWidth={3} footerActions={<Button isToggleable onClick={() => console.log('Clicked')}>Action</Button>} style={{minWidth: '200px'}}>
                  <p>Some content</p>
                  <div style={{ width: '100%', height: '130px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
                </Card>
                <Card configurable title="3RD" areaWidth={6} spanWidth={2}>
                  <p>Some content</p>
                  <div style={{ width: '100%', height: '170px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
                </Card>
                <Card configurable title="4TH" areaWidth={6} spanWidth={4}>
                  <p>Some content</p>
                  <div style={{ width: '100%', height: '170px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
                </Card>
              </CardArea>

              <CardArea spanWidth={6} direction="row">
                <Card areaWidth={6} spanWidth={2}>
                  <p>Some content</p>
                  <div style={{ width: '100%', height: '34px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
                </Card>
                <Card areaWidth={6} spanWidth={4}>
                  <p>Some content</p>
                  <div style={{ width: '100%', height: '34px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
                </Card>
                <Card configurable title="7TH" areaWidth={6} spanWidth={6}>
                  <MiniTable
                    title="A Light Table"
                    columns={columns}
                    fetchData={(options, callback) => this.handleList(options, callback)}
                    rowClick={(item) => console.log(item)}
                    selectKey="title"
                    actions={[{name: 'test1', event: () => this.openModal({
                      title: 'Confirm Button Press',
                      body: 'Are you sure you want to click this button? It may cause something to happen...',
                      actions: [{
                        name: 'info',
                        onClick: () => alert('Here is some info!'),
                      }]
                    })},
                    {name: 'test2', event: () => {}}]}
                  />
                </Card>
              </CardArea>
              <CardArea spanWidth={12} direction="row" collapsible>
                <CardArea spanWidth={4} direction="column">
                  <Card configurable title="8TH" areaWidth={4} spanWidth={4}>
                    <p>Some content</p>
                    <div style={{ width: '100%', height: '120px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
                  </Card>
                  <Card configurable title="9TH" areaWidth={4} spanWidth={4}>
                    <p>Some content</p>
                    <div style={{ width: '100%', height: '120px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
                  </Card>
                </CardArea>

                <CardArea spanWidth={8} direction="column">
                  <Card configurable title="10TH" areaWidth={8} spanWidth={8}>
                    <p>Some content</p>
                    <div style={{ width: '100%', height: '20px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
                  </Card>
                  <Card configurable title="11TH" areaWidth={8} spanWidth={8}>
                    <p>Some content</p>
                    <div style={{ width: '100%', height: '220px', backgroundColor: '#777', color: '#fff'}}>Some content</div>
                  </Card>
                </CardArea>
              </CardArea>

              <Card configurable title="12TH" spanWidth={12}>
                <InfiniteScroll
                    threshold={5}
                    loadMore={(callback) => {
                      setTimeout(() => {
                        const more = [
                          {
                            name: 'test',
                            value: '123',
                          },
                          {
                            name: 'test',
                            value: '123',
                          },
                          {
                            name: 'test',
                            value: '123',
                          },
                          {
                            name: 'test',
                            value: '123',
                          },
                          {
                            name: 'test',
                            value: '123',
                          },
                        ]
                        if (this.state.infiniteData.length === 0) {
                          this.setState({ infiniteData: more });
                          return callback(false);
                        }
                        this.setState({ infiniteData: [...this.state.infiniteData, ...more ] }, () => {
                          if (this.state.infiniteData.length >= 50) {
                            this.setState({ infiniteLoaded: true });
                            return callback(true);
                          }
                          return callback(false);
                        })
                      }, 500);
                    }}
                    loaded={this.state.infiniteLoaded}
                    data={this.state.infiniteData}
                >
                  {Array.isArray(this.state.infiniteData) && this.state.infiniteData.map(({ name, value }, index) => (
                    <div key={`${name}-${value}-${index}`} className="infiniteRow">
                      <span>{index + 1}. </span>
                      <span>Name: {name}</span>
                      <span>Value: {value}</span>
                    </div>
                  ))}
                </InfiniteScroll>
              </Card>
            </CardDashboard>
          </div>
          <Nav {...this.props} navOpen={navOpen} handleNav={this.handleNav} />
        </div>
        <Modal show={this.state.showModal} closeModal={this.closeModal} submitModal={(formData) => this.submitModal(formData)}>
          <div>{this.state.modalContent && this.state.modalContent.body}</div>
        </Modal>
        <MessageContainer />
      </AppContext.Provider>
    );
  }
}

export default App;
