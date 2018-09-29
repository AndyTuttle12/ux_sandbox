import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const wrappedContext = React.createContext();

export default class CardDashboard extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.instanceOf(Object).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {...props};
  }

  render() {
    return (
      <wrappedContext.Provider value={this.state}>
        <div className="card-dashboard-root">
          <div className="card-dashboard-header">
            {this.props.title && <div className="card-dashboard-title">{this.props.title}</div>}
          </div>
          <div className="card-dashboard-body">
            {this.props.children}
          </div>
        </div>
      </wrappedContext.Provider>
    );
  }
}
