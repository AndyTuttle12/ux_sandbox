import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export const wrappedContext = React.createContext();

export default class CardDashboard extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.instanceOf(Object).isRequired,
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {...props, shared: {}};
  }

  render() {
    return (
      <wrappedContext.Provider value={this.state.shared}>
        <div className={`card-dashboard-root ${this.props.theme}`} style={{ ...this.props.style }}>
          <div className={`card-dashboard-header ${this.props.theme}`} style={{ ...this.props.style }}>
            {this.props.title && <div className={`card-dashboard-title ${this.props.theme}`} style={{ ...this.props.style }}>{this.props.title}</div>}
          </div>
          <div className={`card-dashboard-body ${this.props.theme}`} style={{ ...this.props.style }}>
            {this.props.children}
          </div>
        </div>
      </wrappedContext.Provider>
    );
  }
}
