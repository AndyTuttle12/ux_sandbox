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
    updateCard: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      configure: false,
      settings: {
        title: props.title,
        collapsible: props.collapsible,
        spanWidth: props.spanWidth,
        spanHeight: props.spanHeight,
        areaWidth: props.areaWidth,
        areaHeight: props.areaHeight,
        offsetWidth: props.offsetWidth,
        offsetHeight: props.offsetHeight,
        footerText: props.footerText,
      },
      placeholderSettings: {},
    };
  }

  handleCollapsed = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  handleConfigure = () => {
    this.setState({ configure: true, placeholderSettings: this.state.settings });
  }

  closeConfigure = () => {
    this.setState({ configure: false, settings: this.state.placeholderSettings, placeholderSettings: {} });
  }

  submitConfigure = (settings) => {
    this.setState({ configure: false, settings }, () => {
      if (this.props.updateCard) {
        this.props.updateCard(settings);
      }
    });
  }

  render() {
    const {
      handleCollapsed,
      handleConfigure,
      closeConfigure,
      submitConfigure,
      props: {
        configurable,
        children,
        footerActions,
        theme,
        style,
      },
      state: {
        collapsed,
        configure,
        settings,
      },
    } = this;

    return (
      <wrappedContext.Consumer>
        {(context) => (
          <Fragment>
            <div
              className={`card-root${theme ? ' '+theme : ''}`}
              context={context}
              style={{
                ...style,
                width: `calc(${(settings.spanWidth/settings.areaWidth || settings.spanWidth/12) * 100 + '%' || 'auto' } - 10px )`,
                height: `calc(${(settings.spanHeight) * 150 + 'px' || 'auto'} - 10px )`,
                marginTop: `calc(${(settings.offsetHeight) * 150 + 'px' || 'auto'})`,
                marginLeft: `calc(${(settings.offsetWidth/settings.areaWidth || settings.offsetWidth/12) * 100 + '%' || 'auto' } - 10px )`,
              }}
            >
              {(settings.title || configurable || settings.collapsible) && (
                <div className={`card-header${theme ? ' '+theme : ''}`}>
                  {settings.title && (
                    <span className={`card-title${theme ? ' '+theme : ''}`}>{settings.title}</span>
                  )}
                  <div className="header-actions">
                    {configurable && (
                      <button
                        className={`card-btn${theme ? ' '+theme : ''} config-btn`}
                        onClick={handleConfigure}
                      >
                        <img src={Gear} alt="configure" />
                      </button>
                    )}
                    {settings.collapsible && (
                      <button
                        className={`card-btn${theme ? ' '+theme : ''}${!collapsed?' close':' open'}-btn`}
                        onClick={handleCollapsed}
                      >
                        <img src={Arrow} alt="collapse" />
                      </button>
                    )}
                  </div>
                </div>
              )}
              {!collapsed && (
                <React.Fragment>
                  <div
                    className={`card-body${theme ? ' '+theme : ''}`}
                    style={{
                      height: `calc(100% - ${(footerActions || settings.footerText) ? '60px': '30px'} + ${(settings.title || configurable || settings.collapsible) ? '0px' : '30px'}`
                    }}
                  >
                    {children}
                  </div>
                  <div className={`card-footer${theme ? ' '+theme : ''}`} style={{ height: `${(footerActions || settings.footerText) ? '30px': '0px'}`}}>
                    <div className={`footer-text${theme ? ' '+theme : ''}`}>{settings.footerText}</div>
                    <div className={`footer-actions${theme ? ' '+theme : ''}`}>{footerActions}</div>
                  </div>
                </React.Fragment>
              )}
            </div>
            {configure && (
              <Modal
                show
                title="Card Settings"
                closeModal={closeConfigure}
                submitModal={() => submitConfigure(settings)}
              >
                <div className="settings-content">
                  <div className="settings-content-row">
                    <label htmlFor="width">Width:</label>
                    <TextInput
                      id="width"
                      placeholder={settings.spanWidth ? settings.spanWidth.toString() : 'N/A'}
                      onKeyPress={() => {}}
                      onChange={(e) => {
                        this.setState({ settings: { ...settings, spanWidth: e.target.value } })
                      }}
                    />
                  </div>
                  <div className="settings-content-row">
                    <label htmlFor="height">Height:</label>
                    <TextInput
                      id="height"
                      placeholder={settings.spanHeight ? settings.spanHeight.toString() : 'N/A'}
                      onKeyPress={() => {}}
                      onChange={(e) => {
                        this.setState({ settings: { ...settings, spanHeight: e.target.value } })
                      }}
                    />
                  </div>
                  <div className="settings-content-row">
                    <label htmlFor="areaWidth">Area Width:</label>
                    <TextInput
                      id="areaWidth"
                      placeholder={settings.areaWidth ? settings.areaWidth.toString() : 'N/A'}
                      onKeyPress={() => {}}
                      onChange={(e) => {
                        this.setState({ settings: { ...settings, areaWidth: e.target.value } })
                      }}
                    />
                  </div>
                  <div className="settings-content-row">
                    <label htmlFor="areaHeight">Area Height:</label>
                    <TextInput
                      id="areaHeight"
                      placeholder={settings.areaHeight ? settings.areaHeight.toString() : 'N/A'}
                      onKeyPress={() => {}}
                      onChange={(e) => {
                        this.setState({ settings: { ...settings, areaHeight: e.target.value } })
                      }}
                    />
                  </div>
                  <div className="settings-content-row">
                    <label htmlFor="offsetWidth">Offset Width:</label>
                    <TextInput
                      id="offsetWidth"
                      placeholder={settings.offsetWidth ? settings.offsetWidth.toString() : 'N/A'}
                      onKeyPress={() => {}}
                      onChange={(e) => {
                        this.setState({ settings: { ...settings, offsetWidth: e.target.value } })
                      }}
                    />
                  </div>
                  <div className="settings-content-row">
                    <label htmlFor="offsetHeight">Offset Height:</label>
                    <TextInput
                      id="offsetHeight"
                      placeholder={settings.offsetHeight ? settings.offsetHeight.toString() : 'N/A'}
                      onKeyPress={() => {}}
                      onChange={(e) => {
                        this.setState({ settings: { ...settings, offsetHeight: e.target.value } })
                      }}
                    />
                  </div>
                  <div className="settings-content-row">
                    <label htmlFor="collapsible">Collapsible:</label>
                    <TextInput
                      id="collapsible"
                      placeholder={settings.collapsible ? settings.collapsible.toString() : 'N/A'}
                      onKeyPress={() => {}}
                      onChange={(e) => {
                        const collapsible = e.target.value === 'true' ? true : false;
                        this.setState({ settings: { ...settings, collapsible } })
                      }}
                    />
                  </div>
                  <div className="settings-content-row">
                    <label htmlFor="titleControl">Title:</label>
                    <TextInput
                      id="titleControl"
                      placeholder={settings.title ? settings.title.toString() : 'N/A'}
                      onKeyPress={() => {}}
                      onChange={(e) => {
                        this.setState({ settings: { ...settings, title: e.target.value } })
                      }}
                    />
                  </div>
                  <div className="settings-content-row">
                    <label htmlFor="footerTextControl">Footer Text:</label>
                    <TextInput
                      id="footerTextControl"
                      placeholder={settings.footerText ? settings.footerText.toString() : 'N/A'}
                      onKeyPress={() => {}}
                      onChange={(e) => {
                        this.setState({ settings: { ...settings, footerText: e.target.value } })
                      }}
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