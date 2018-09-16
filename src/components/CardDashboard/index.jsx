import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

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
      <div
        className={`card-dashboard-root`}
      >
        {title && (
          <div className="card-dashboard-header">
            <div className="card-dashboard-title">{title}</div>
          </div>
        )}
        <div className="card-dashboard-body">
          {children}
        </div>
      </div>
    );
  }
}