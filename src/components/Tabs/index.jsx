import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class Tabs extends Component {
  static propTypes = {
    type: PropTypes.string,
    buttonType: PropTypes.oneOf([
      'success',
      'warn',
      'info',
      'danger',
      'primary',
      'secondary',
      'tertiary',
    ]),
    theme: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    className: PropTypes.string,
    names: PropTypes.array.isRequired,
    openTab: PropTypes.func,
    selectedTab: PropTypes.string,
    children: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: 0,
    }
  }

  onClick = (e) => {
    this.setState({ selected: e.target.name });
    this.props.opentab(e.target.name);
  };

  openTab = (tab) => {
    this.setState({ selected: tab });
    this.props.opentab(tab);
  }

  componentDidMount() {
    if (this.props.selectedTab) {
      this.setState({ selected: this.props.selectedTab });
    }
  }

  render() {
    const {
      onClick,
      state: {
        selected,
      },
      props: {
        type,
        buttonType,
        value,
        disabled,
        className,
        theme,
        names,
        children,
        openTab,
        style,
      },
    } = this;

    const tabs = names.map((name, index) => (
      <button
        key={index}
        className={theme || className || (type && `tab-btn-${buttonType}`) || `btn-default${selected === name ? ' selected' : ''}` }
        style={{ ...style }}
        type={type}
        disabled={disabled}
        value={value}
        name={name}
        onClick={(e) => onClick(e)}
      >
        {name}
        {children}
      </button>
    ));
    return (
      <div className="tabs-root" opentab={openTab}>
        {tabs}
      </div>
    );
  }
}
