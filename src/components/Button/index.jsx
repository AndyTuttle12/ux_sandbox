import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class Button extends Component {
  static propTypes = {
    type: PropTypes.oneOf([
      'success',
      'warn',
      'info',
      'danger',
      'primary',
      'secondary',
      'tertiary',
    ]),
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
        value,
        disabled,
        className,
        children,
      },
    } = this;

    return (
      <button
        className={className || (type && `btn-${type}`) || 'btn-default'}
        disabled={disabled}
        value={value}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}
