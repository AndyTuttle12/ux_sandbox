import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class Button extends Component {
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
        children,
        style,
      },
    } = this;

    return (
      <button
        className={theme || className || (type && `btn-${buttonType}`) || 'btn-default'}
        style={{ ...style }}
        type={type}
        disabled={disabled}
        value={value}
        onClick={onClick}
        {...this.props}
      >
        {children}
      </button>
    );
  }
}
