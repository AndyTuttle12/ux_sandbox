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
    onClick: PropTypes.func.isRequired,
    children: PropTypes.any,
  };

  onClick = (e) => {
    this.props.onClick(e);
  };

  render() {
    const {
      onClick,
      props: {
        type,
        buttonType,
        value,
        disabled,
        className,
        theme,
        names,
        children,
      },
    } = this;

    const tabs = names.map((name, index) => (
        <button
        key={index}
        className={theme || className || (type && `tab-btn-${buttonType}`) || 'btn-default'}
        style={{ ...this.props.style }}
        type={type}
        disabled={disabled}
        value={value}
        name={name}
        onClick={onClick}
        {...this.props}
      >
        {name}
        {children}
      </button>
    ));
    return (
      <React.Fragment>
        {tabs}
      </React.Fragment>
    );
  }
}
