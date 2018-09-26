import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Context = React.createContext();

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
      <Context.Provider value={context}>
        {children}
      </Context.Provider>
    );
  }
}