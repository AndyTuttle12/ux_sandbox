import React, { Component } from 'react';
import Accordian from '../Accordian';
import SearchList from '../SearchList';
import ToolTip from '../ToolTip';
import AppLogo from './images/placeholderApp.svg';
import AppMenu from './images/placeholderMenu.svg';
import Device from './images/placeholderDevice.svg';
import Group from './images/placeholderGroup.svg';
import Backups from './images/placeholderBackups.svg';
import Config from './images/placeholderConfig.svg';
import './style.css';

const dummyData = {
  "entity": "device",
  "total": 71,
  "list": [
      {
          "name": "a10-acos-02",
          "authgroup": "default",
          "address": "52.70.104.148",
          "port": "10023",
          "device-type": "cli",
          "ned": "a10-acos",
          "admin": true,
          "tenant": "",
          "host": "nso-01.zone1",
          "actions": [],
          "groups": []
      },
      {
          "name": "accedian-nid-01",
          "authgroup": "default",
          "address": "52.70.104.148",
          "port": "10024",
          "device-type": "cli",
          "ned": "accedian-nid",
          "admin": true,
          "tenant": "",
          "host": "nso-01.zone1",
          "actions": [],
          "groups": []
      },
      {
          "name": "accedian-nid-02",
          "authgroup": "default",
          "address": "52.70.104.148",
          "port": "10025",
          "device-type": "cli",
          "ned": "accedian-nid",
          "admin": true,
          "tenant": "",
          "host": "nso-01.zone1",
          "actions": [],
          "groups": []
      },
      {
          "name": "adtran-aos-01",
          "authgroup": "default",
          "address": "52.70.104.148",
          "port": "10026",
          "device-type": "cli",
          "ned": "adtran-aos",
          "admin": true,
          "tenant": "",
          "host": "nso-01.zone1",
          "actions": [],
          "groups": []
      },
      {
          "name": "adtran-aos-02",
          "authgroup": "default",
          "address": "52.70.104.148",
          "port": "10027",
          "device-type": "cli",
          "ned": "adtran-aos",
          "admin": true,
          "tenant": "",
          "host": "nso-01.zone1",
          "actions": [],
          "groups": []
      },
      {
          "name": "alu-sr-01",
          "authgroup": "default",
          "address": "52.70.104.148",
          "port": "10028",
          "device-type": "cli",
          "ned": "alu-sr",
          "admin": true,
          "tenant": "",
          "host": "nso-01.zone1",
          "actions": [],
          "groups": []
      },
      {
          "name": "alu-sr-02",
          "authgroup": "default",
          "address": "52.70.104.148",
          "port": "10029",
          "device-type": "cli",
          "ned": "alu-sr",
          "admin": true,
          "tenant": "",
          "host": "nso-01.zone1",
          "actions": [],
          "groups": []
      },
      {
          "name": "arista-dcs-01",
          "authgroup": "default",
          "address": "52.70.104.148",
          "port": "10030",
          "device-type": "cli",
          "ned": "arista-dcs",
          "admin": true,
          "tenant": "",
          "host": "nso-01.zone1",
          "actions": [],
          "groups": []
      },
      {
          "name": "arista-dcs-02",
          "authgroup": "default",
          "address": "52.70.104.148",
          "port": "10031",
          "device-type": "cli",
          "ned": "arista-dcs",
          "admin": true,
          "tenant": "",
          "host": "nso-01.zone1",
          "actions": [],
          "groups": []
      },
      {
          "name": "arris-cmts-01",
          "authgroup": "default",
          "address": "52.70.104.148",
          "port": "10032",
          "device-type": "cli",
          "ned": "arris-cmts",
          "admin": true,
          "tenant": "",
          "host": "nso-01.zone1",
          "actions": [],
          "groups": []
      }
  ]
};
export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.navOpen,
      searchValue: '',
    };
  }

  handleOpen = () => {
    this.setState({ open: !this.state.open },() => {
      this.props.handleNav();
    });
  }

  handleSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  }

  handleDummyData = () => {
    const list = dummyData.list.map((device) => device.name);
    return {
      total: dummyData.total,
      list,
    };
  }

  render() {
      const {
        handleOpen,
        handleDummyData,
        state: {
          open,
        }
      } = this;
      return (
        <div className={`nav-root${open ? ' open' : ' closed'}`}>
          <div className='nav-header'>
            <img className='app-logo' src={AppLogo} alt='' />
            {open && (
              <React.Fragment>
                <span className='app-title'>Manager</span>
                <ToolTip message="Hello, I am a tool tip!" direction="down" >
                  <button className='home-btn' onClick={() => window.location = '/'}>
                    <img className='home-menu' src={AppMenu} alt='' />
                  </button>
                </ToolTip>
              </React.Fragment>
            )}
          </div>
          <Accordian isDisabled={!open}>
            <div icon={Device} label='Devices' isOpen>
              <SearchList fetchData={handleDummyData} />
            </div>
            <div icon={Group} label='Groups'>
              <SearchList fetchData={() => {}} />
            </div>
            <div icon={Backups} label='Backups'>
              <SearchList fetchData={() => {}} />
            </div>
            <div icon={Config} label='Config'>
              <SearchList fetchData={() => {}} />
            </div>
          </Accordian>
          <button className='nav-close-btn' onClick={handleOpen}>
            { open ? 'close' : 'open' }
          </button>
      </div>
    );
  }
};
