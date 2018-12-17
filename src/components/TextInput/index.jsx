import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cancel from './images/cancel.svg';
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
    clearable: PropTypes.bool,
    clearInput: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || '',
    }
  }

  onChange = (e) => {
    this.props.onChange(e);
    this.setState({ value: e.target.value });
  };

  onKeyPress = (e) => {
    e.key === 'Enter' && this.props.onKeyPress(e);
  };

  clearInput = () => {
    this.setState({ value: '' });
  }

  render() {
    const {
      onChange,
      onKeyPress,
      clearInput,
      props: {
        label,
        placeholder,
        disabled,
        theme,
        style,
        clearable,
      },
      state: {
        value,
      }
    } = this;

    return (
      <label className="text-input-root-label">
        {label && (
          <p className={`text-input-label${theme ? ''+theme : ''}`}>
            {label}
          </p>
        )}
        <input
          className={`text-input-field${theme ? ''+theme : ''}`}
          style={{ ...style }}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyPress={onKeyPress}
          spellCheck={false}
        />
        {clearable && value && (<button
            className={`clear-button`}
            onClick={clearInput}
          >
            <img src={Cancel} alt="clear"/>
          </button>)}
      </label>
    );
  }
}