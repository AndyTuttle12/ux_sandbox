import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
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
    footerText: PropTypes.string,
    footerActions: PropTypes.any,
    theme: PropTypes.string,
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
        footerText,
        footerActions,
        theme,
        style,
      },
      state: {
        collapsed,
      },
    } = this;

    const Arrow = lazy(() => import('./images/placeholderArrow.svg'));

    return (
      <wrappedContext.Consumer>
        {(context) => (
          <div
            className={`card-root${theme ? ''+theme : ''}`}
            context={context}
            style={{
              ...style,
              width: `calc(${(spanWidth/areaWidth || spanWidth/12) * 100 + '%' || 'auto' } - 10px )`,
              height: `calc(${(spanHeight) * 150 + 'px' || 'auto'} - 10px )`,
              marginTop: `calc(${(offsetHeight) * 150 + 'px' || 'auto'})`,
              marginLeft: `calc(${(offsetWidth/areaWidth || offsetWidth/12) * 100 + '%' || 'auto' } - 10px )`,
            }}
          >
            <div className={`card-header${theme ? ''+theme : ''}`}>
              {title && (
                <span className={`card-title${theme ? ''+theme : ''}`}>{title}</span>
              )}
              {collapsible && (
                <button
                  className={`card-btn${theme ? ''+theme : ''}${!collapsed?' close':' open'}-btn`}
                  onClick={handleCollapsed}
                >
                  <img src={Arrow} alt="" />
                </button>
              )}
            </div>
            {!collapsed && (
              <React.Fragment>
                <div className={`card-body${theme ? ''+theme : ''}`} style={{ height: `calc(100% - ${(footerActions || footerText) ? '60px': '30px'}`}}>
                  {children}
                </div>
                <div className={`card-footer${theme ? ''+theme : ''}`} style={{ height: `${(footerActions || footerText) ? '30px': '0px'}`}}>
                  <div className={`footer-text${theme ? ''+theme : ''}`}>{footerText}</div>
                  <div className={`footer-actions${theme ? ''+theme : ''}`}>{footerActions}</div>
                </div>
              </React.Fragment>
            )}
          </div>
        )}
      </wrappedContext.Consumer>
    );
  }
}