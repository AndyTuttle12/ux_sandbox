import React, { Component } from 'react';
import AccordianPanel from './AccordianPanel';
import './style.css';

export default class Accordian extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
        };
    }

    handlePanel = () => {
        this.setState({ active: !this.state.active })
    }

    render() {
        const { active } = this.state;
        return (
            <div className={`accordian-root ${active ? 'active': ''}`}>
                <AccordianPanel key={0} title='Devices' body='List' onActive={this.handlePanel} min={this.props.min} />
                <AccordianPanel key={1} title='Groups' body='List' onActive={this.handlePanel} min={this.props.min} />
                <AccordianPanel key={2} title='Backups' body='List' onActive={this.handlePanel} min={this.props.min} />
                <AccordianPanel key={3} title='Config' body='List' onActive={this.handlePanel} min={this.props.min} />
            </div>
        );
    }
}
