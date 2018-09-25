import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const wrappedContext = React.createContext();

export default class CardDashboard extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Object).isRequired,
  };

  render() {
    return (
      <wrappedContext.Provider>
        <div className="context-root">
          {this.props.children}
        </div>
      </wrappedContext.Provider>
    );
  }
}
