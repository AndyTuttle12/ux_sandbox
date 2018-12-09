import React, { Component } from 'react';
import './style.css';

export default class MessageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
    }
  }

  render() {
    return (
      <div className={`message-container-root${this.state.open ? ' open' : ''}`}>
        {this.props.children}
      </div>
    )
  }
}
