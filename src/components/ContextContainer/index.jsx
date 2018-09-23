import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class ContextContainer extends Component {
  static propTypes = {
    context: PropTypes.string,
    children: PropTypes.instanceOf(Object).isRequired,
  };

  render() {
    const {
      props: {
        context,
        children,
      },
    } = this;

    return (
      <div
        className={`context-container-root`}
      >
        {children}
      </div>
    );
  }
}