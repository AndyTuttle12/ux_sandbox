import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const wrappedContext = React.createContext();

export default class CardDashboard extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.instanceOf(Object).isRequired,
  };

  render() {
    const {
      props: {
        title,
        children,
      },
    } = this;

    return (
      <wrappedContext.Provider>
        <div>
          className={`card-dashboard-root`}
        >
          {title && (
            <React.Fragment>
              <div className="card-dashboard-header">
                <div className="card-dashboard-title">{title}</div>
              </div>
              <div className="card-dashboard-body">
                {children}
              </div>
            </React.Fragment>
          )}
          {!title && (
            <div className="card-dashboard-body alone">
              {children}
            </div>
          )}
        </div>
      </wrappedContext.Provider>
    );
  }
}