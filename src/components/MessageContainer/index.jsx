import React, { Component } from 'react';
import Context from '../ContextContainer';
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
      <Context.Consumer>
        {(value) => (
          <div className={`message-container-root${this.state.open ? ' open' : ''}`}>
          </div>
        )}
      </Context.Consumer>
    )
  }
}
