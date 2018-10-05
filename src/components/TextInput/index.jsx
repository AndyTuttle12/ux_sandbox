import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class TextInput extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func,
    theme: PropTypes.string,
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
        placeholder,
        disabled,
        theme,
      },
    } = this;

    return (
      <label>
        {label && (<p className={`text-input-label ${theme}`}>{label}</p>)}
        <input
          className={`text-input-root ${theme}`}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </label>
    );
  }
}