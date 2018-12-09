import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class CardArea extends Component {
  static propTypes = {
    spanWidth: PropTypes.number,
    spanHeight: PropTypes.number,
    direction: PropTypes.string,
    collapsible: PropTypes.bool,
    children: PropTypes.instanceOf(Object).isRequired,
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    }
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
        direction,
        children,
        collapsible,
        theme,
      },
      state: {
        collapsed,
      },
    } = this;

    const Arrow = lazy(() => import('./images/placeholderArrow.svg'));

    return (
      <div
        className={`card-area-root${theme ? ''+theme : ''}`}
        style={{
          ...this.props.style,
          width: `${(spanWidth/12) * 100 + '%' || 'auto' }`,
          height: `${(spanHeight) * 150 + 'px' || 'auto'}`,
          flexDirection: `${direction}`,
        }}
      >
        {!collapsible && children}
        {collapsible && (
          <div
            className={`card-area-body${collapsed ? ' collapsed' : ''}`}
            style={{
              flexDirection: `${direction}`
            }}
          >
            {children}
          </div>
        )}
        {collapsible && (
          <button
            className={`card-area-btn${!collapsed ?' close': ' open'}-btn`}
            onClick={handleCollapsed}
          >
            <img src={Arrow} alt="" />
          </button>
        )}
      </div>
    );
  }
}