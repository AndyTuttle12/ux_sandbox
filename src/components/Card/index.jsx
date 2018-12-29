import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { wrappedContext } from '../CardDashboard';
import TextInput from '../TextInput';
import Modal from '../Modal';
import Arrow from './images/placeholderArrow.svg';
import Gear from './images/settings.svg';
import './style.css';

export default class Card extends Component {
  static propTypes = {
    collapsed: PropTypes.bool,
    collapsible: PropTypes.bool,
    configurable: PropTypes.bool,
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
      configure: false,
    };
  }

  handleCollapsed = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  handleConfigure = () => {
    console.log('configure a modal here...');
    this.setState({ configure: true });
  }

  closeConfigure = (settings) => {
    this.setState({ configure: false, ...settings });
  }

  render() {
    const {
      handleCollapsed,
      handleConfigure,
      closeConfigure,
      props: {
        spanWidth,
        spanHeight,
        areaWidth,
        areaHeight,
        offsetHeight,
        offsetWidth,
        collapsible,
        configurable,
        title,
        children,
        footerText,
        footerActions,
        theme,
        style,
      },
      state: {
        collapsed,
        configure,
      },
    } = this;

    return (
      <wrappedContext.Consumer>
        {(context) => (
          <Fragment>
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
                {configurable && (
                  <button
                    className={`card-btn${theme ? ''+theme : ''} config-btn`}
                    onClick={handleConfigure}
                  >
                    <img src={Gear} alt="configure" />
                  </button>
                )}
                {collapsible && (
                  <button
                    className={`card-btn${theme ? ''+theme : ''}${!collapsed?' close':' open'}-btn`}
                    onClick={handleCollapsed}
                  >
                    <img src={Arrow} alt="collapse" />
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
            {configure && (
              <Modal
                show
                title="Card Settings"
                closeModal={closeConfigure}
                submitModal={closeConfigure}
              >
                <div className="settings-content">
                  <div className="settings-content-row">
                    <label htmlFor="width">Width:</label>
                    <TextInput
                      id="width"
                      placeholder={spanWidth ? spanWidth.toString() : 'N/A'}
                      onChange={(e) => console.log(`Width: ${e.target.value}`)}
                    />
                  </div>
                  <div className="settings-content-row">
                    <label htmlFor="height">Height:</label>
                    <TextInput
                      id="height"
                      placeholder={spanHeight ? spanHeight.toString() : 'N/A'}
                      onChange={(e) => console.log(`Height: ${e.target.value}`)}
                    />
                  </div>
                  <div className="settings-content-row">
                    <label htmlFor="areaWidth">Area Width:</label>
                    <TextInput
                      id="areaWidth"
                      placeholder={areaWidth ? areaWidth.toString() : 'N/A'}
                      onChange={(e) => console.log(`Area Width: ${e.target.value}`)}
                    />
                  </div>
                  <div className="settings-content-row">
                    <label htmlFor="areaHeight">Area Height:</label>
                    <TextInput
                      id="areaHeight"
                      placeholder={areaHeight ? areaHeight.toString() : 'N/A'}
                      onChange={(e) => console.log(`Area Height: ${e.target.value}`)}
                    />
                  </div>
                  <div className="settings-content-row">
                    <label htmlFor="collapsible">Collapsible:</label>
                    <TextInput
                      id="collapsible"
                      placeholder={collapsible ? collapsible.toString() : 'N/A'}
                      onChange={(e) => console.log(`Collapsible: ${e.target.value}`)}
                    />
                  </div>
                  <div className="settings-content-row">
                    <label htmlFor="titleControl">Title:</label>
                    <TextInput
                      id="titleControl"
                      placeholder={title ? title.toString() : 'N/A'}
                      onChange={(e) => console.log(`Title: ${e.target.value}`)}
                    />
                  </div>
                </div>
              </Modal>
            )}
          </Fragment>
        )}
      </wrappedContext.Consumer>
    );
  }
}