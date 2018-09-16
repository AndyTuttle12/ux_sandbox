import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Arrow from './images/placeholderArrow.svg';
import './style.css';

export default class Card extends Component {
  static propTypes = {
    collapsed: PropTypes.bool,
    spanWidth: PropTypes.number,
    spanHeight: PropTypes.number,
    title: PropTypes.string,
    children: PropTypes.instanceOf(Object).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }

  handleCollapsed = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const {
      handleCollapsed,
      props: {
        spanWidth,
        spanHeight,
        title,
        children,
      },
      state: {
        collapsed,
      },
    } = this;

    return (
      <div
        className={`card-root`}
        style={{
          width: `calc(${(spanWidth/12) * 100 + '%' || 'auto' } - 10px )`,
          height: `calc(${(spanHeight/12) * 100 + '%' || 'auto'} - 10px )`
        }}
      >
        <div className="card-header">
          {title && (
            <span className="card-title">{title}</span>
          )}
          <button
            className={`card-btn ${!collapsed?'close':'open'}-btn`}
            onClick={handleCollapsed}
          >
            <img src={Arrow} alt="" />
          </button>
        </div>
        {!collapsed && (
          <div className="card-body">
            {children}
          </div>
        )}
      </div>
    );
  }
}