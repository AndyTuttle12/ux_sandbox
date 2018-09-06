import React, { Component } from 'react';
import Accordian from '../Accordian';
import AppLogo from './images/placeholderApp.svg';
import AppMenu from './images/placeholderMenu.svg';
import Device from './images/placeholderDevice.svg';
import Group from './images/placeholderGroup.svg';
import Backups from './images/placeholderBackups.svg';
import Config from './images/placeholderConfig.svg';
import './style.css';

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }

    handleOpen = () => {
        this.setState({ open: !this.state.open });
    }

    render() {
        const { open } = this.state;
        return (
            <div className={`nav-root ${open ? 'open' : 'closed'}`}>
                <div className='nav-header'>
                    <img className='app-logo' src={AppLogo} alt='' />
                    {open && (
                        <React.Fragment>
                            <span className='app-title'>Manager</span>
                            <button className='home-btn'>
                                <img className='home-menu' src={AppMenu} alt='' />
                            </button>
                        </React.Fragment>
                    )}
                </div>
                <Accordian disabled={!open}>
                    <div icon={Device} label='Devices' isOpen>
                        <p>
                            <strong>Name:</strong> Test
                        </p>
                        <p>
                            <strong>Date:</strong> Some date
                        </p>
                        <p>
                            <strong>Something:</strong> Else
                        </p>
                    </div>
                    <div icon={Group} label='Groups'>
                        <p>
                            <strong>Name:</strong> Test
                        </p>
                        <p>
                            <strong>Date:</strong> Some date
                        </p>
                        <p>
                            <strong>Something:</strong> Else
                        </p>
                    </div>
                    <div icon={Backups} label='Backups'>
                        <p>
                            <strong>Name:</strong> Test
                        </p>
                        <p>
                            <strong>Date:</strong> Some date
                        </p>
                        <p>
                            <strong>Something:</strong> Else
                        </p>
                    </div>
                    <div icon={Config} label='Config'>
                        <p>
                            <strong>Name:</strong> Test
                        </p>
                        <p>
                            <strong>Date:</strong> Some date
                        </p>
                        <p>
                            <strong>Something:</strong> Else
                        </p>
                    </div>
                </Accordian>
                <button className='nav-close-btn' onClick={this.handleOpen}>
                    { open ? 'close' : 'open' }
                </button>
            </div>
        );
    }
};