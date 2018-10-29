import React, { Component } from 'react';
import Context from '../ContextContainer';

export default class MessageContainer extends Component {
  render() {
    return (
      <Context.Consumer>
        {(value) => (
          <div className="message-container-root">
            {value.toasts}
            {value.notifications}
          </div>
        )}
      </Context.Consumer>
    )
  }
}
