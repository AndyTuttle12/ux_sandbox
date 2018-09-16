import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class SwitchInput extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  onChange = (e) => {
    this.props.onChange(e);
  };

  render() {
    const {
      onChange,
      props: {
        label,
        value,
        disabled,
      },
    } = this;

    return (
      <label className='switch-input-label'>
        {label && (<p>{label}</p>)}
        <input
          className='switch-input-root'
          type='checkbox'
          disabled={disabled}
          value={value}
          onChange={onChange}
        />
        <span className='slider round'></span>
      </label>
    );
  }
}