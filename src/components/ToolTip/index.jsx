import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class ToolTip extends Component {
  static propTypes = {
    message: PropTypes.string,
    direction: PropTypes.string,
    children: PropTypes.instanceOf(Object).isRequired,
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      hovering: false,
    }
  }

  onHover = (e) => {
    this.setState({ hovering: true });
  }

  onHide = (e) => {
    this.setState({ hovering: false });
  }

  render() {
    const {
      onHover,
      onHide,
      props: {
        message,
        direction,
        children,
        theme,
      },
      state: {
        hovering,
      },
    } = this;

    if(direction === 'up' || direction === 'left') {
      return (
        <div
          className={`tool-tip-root ${theme} ${direction}`}
          onMouseEnter={onHover}
          onMouseLeave={onHide}
          {...this.props}
        >
        { hovering && (
          <div className={`tool-tip-area ${theme}`}>
            <div className={`tool-tip-banner ${theme}`}>
              <span className={`tool-tip-message ${theme}`}>{message}</span>
            </div>
            <div className={`tool-tip-arrow ${theme}`}></div>
          </div>
        )}
        {children}
      </div>
      );
    }

    return (
      <div
        className={`tool-tip-root ${theme} ${direction}`}
        onMouseEnter={onHover}
        onMouseLeave={onHide}
        {...this.props}
      >
        {children}
        { hovering && (
          <div className={`tool-tip-area ${theme}`}>
            <div className={`tool-tip-arrow ${theme}`}></div>
            <div className={`tool-tip-banner ${theme}`}>
              <span className={`tool-tip-message ${theme}`}>{message}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}
