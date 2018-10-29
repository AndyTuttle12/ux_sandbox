import React, { Component } from 'react';
import Context from '../ContextContainer';

export default class MessageContainer extends Component {
  render() {
    return (
      <Context.Consumer>
        {(value) => (
          <div className="message-container-root">
            {value.toasts.map((toast, index) => (
              <div className="toast-root" key={index}>
                <span>{toast.msg}</span>
              </div>
            ))}
            {value.notifications.map((notification, index) => (
              <div className="notification-root" key={index}>
                <span>{notification.msg}</span>
              </div>
            ))}
          </div>
        )}
      </Context.Consumer>
    )
  }
}
