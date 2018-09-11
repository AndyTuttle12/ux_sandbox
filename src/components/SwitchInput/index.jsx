import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class SwitchInput extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func,
  };

  onChange = (e) => {
    this.props.onChange(e);
  };

  onKeyPress = (e) => {
    e.key === 'Enter' && this.props.onKeyPress(e);
  };

  render() {
    const {
      onChange,
      onKeyPress,
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
          onKeyPress={onKeyPress}
        />
        <span className='slider round'></span>
      </label>
    );
  }
}