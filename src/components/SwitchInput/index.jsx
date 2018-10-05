import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class SwitchInput extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    theme: PropTypes.string,
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
        theme,
      },
    } = this;

    return (
      <label className={`switch-input-label ${theme}`}>
        {label && (<p>{label}</p>)}
        <input
          className={`switch-input-root ${theme}`}
          type='checkbox'
          disabled={disabled}
          value={value}
          onChange={onChange}
        />
        <span className={`slider round ${theme}`}></span>
      </label>
    );
  }
}