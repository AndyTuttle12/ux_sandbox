import React, { Component } from 'react';
import Accordian from '../Accordian';
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
                <Accordian min={!this.state.open} />
                <button className='nav-close-btn' onClick={this.handleOpen}>
                    { open ? 'close' : 'open' }
                </button>
            </div>
        );
    }
};