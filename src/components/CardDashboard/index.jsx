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
    const {
      state: {
        shared,
      },
      props: {
        theme,
        style,
        title,
        children,
      },
    } = this;
    return (
      <wrappedContext.Provider value={shared}>
        <div className={`card-dashboard-root${theme ? ''+theme : ''}`} style={{ ...style }}>
          <div className={`card-dashboard-header${theme ? ''+theme : ''}`} style={{ ...style }}>
            {title && <div className={`card-dashboard-title${theme ? ''+theme : ''}`} style={{ ...style }}>{title}</div>}
          </div>
          <div className={`card-dashboard-body${theme ? ''+theme : ''}`} style={{ ...style }}>
            {children}
          </div>
        </div>
      </wrappedContext.Provider>
    );
  }
}
