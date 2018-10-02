import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class ToolTip extends Component {
  static propTypes = {
    message: PropTypes.string,
    direction: PropTypes.string,
    children: PropTypes.instanceOf(Object).isRequired,
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
      },
      state: {
        hovering,
      },
    } = this;

    if(direction === 'up' || direction === 'left') {
      return (
        <div
          className={`tool-tip-root ${direction}`}
          onMouseEnter={onHover}
          onMouseLeave={onHide}
          {...this.props}
        >
        { hovering && (
          <div className="tool-tip-area">
            <div className="tool-tip-banner">
              <span className="tool-tip-message">{message}</span>
            </div>
            <div className="tool-tip-arrow"></div>
          </div>
        )}
        {children}
      </div>
      );
    }

    return (
      <div
        className={`tool-tip-root ${direction}`}
        onMouseEnter={onHover}
        onMouseLeave={onHide}
        {...this.props}
      >
        {children}
        { hovering && (
          <div className="tool-tip-area">
            <div className="tool-tip-arrow"></div>
            <div className="tool-tip-banner">
              <span className="tool-tip-message">{message}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}
