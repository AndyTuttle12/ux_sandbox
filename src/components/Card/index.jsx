import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Arrow from './images/placeholderArrow.svg';
import { wrappedContext } from '../CardDashboard';
import './style.css';

export default class Card extends Component {
  static propTypes = {
    collapsed: PropTypes.bool,
    collapsible: PropTypes.bool,
    spanWidth: PropTypes.number,
    spanHeight: PropTypes.number,
    areaWidth: PropTypes.number,
    areaHeight: PropTypes.number,
    offsetHeight: PropTypes.number,
    offsetWidth: PropTypes.number,
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
        areaWidth,
        offsetHeight,
        offsetWidth,
        collapsible,
        title,
        children,
      },
      state: {
        collapsed,
      },
    } = this;

    return (
      <wrappedContext.Consumer>
        {(context) => (
          <div
            className={`card-root`}
            context={context}
            style={{
              width: `calc(${(spanWidth/areaWidth || spanWidth/12) * 100 + '%' || 'auto' } - 10px )`,
              height: `calc(${(spanHeight) * 150 + 'px' || 'auto'} - 10px )`,
              marginTop: `calc(${(offsetHeight) * 150 + 'px' || 'auto'})`,
              marginLeft: `calc(${(offsetWidth/areaWidth || offsetWidth/12) * 100 + '%' || 'auto' } - 10px )`,
            }}
          >
            <div className="card-header">
              {title && (
                <span className="card-title">{title}</span>
              )}
              {collapsible && (
                <button
                  className={`card-btn ${!collapsed?'close':'open'}-btn`}
                  onClick={handleCollapsed}
                >
                  <img src={Arrow} alt="" />
                </button>
              )}
            </div>
            {!collapsed && (
              <div className="card-body">
                {children}
              </div>
            )}
          </div>
        )}
      </wrappedContext.Consumer>
    );
  }
}