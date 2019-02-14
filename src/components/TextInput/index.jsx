import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cancel from './images/cancel.svg';
import './style.css';

export default class TextInput extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func,
    onBlur: PropTypes.func,
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
    this.setState({ value: e.target.value });
    if (this.props.updateForm) {
      this.props.updateForm({ input: e.target.value });
    } else {
      this.props.onChange(e);
    }
  };

  onKeyPress = (e) => {
    e.key === 'Enter' && this.props.onKeyPress(e);
  };

  onBlur = (e) => {
    if (this.props.updateForm) {
      this.props.updateForm({ input: e.target.value });
    } else if (this.props.onBlur) {
      this.props.onBlur(e);
    } else {
      console.log('Leaving input');
    }
  }

  clearInput = () => {
    this.setState({ value: '' });
  }

  render() {
    const {
      onChange,
      onKeyPress,
      onBlur,
      clearInput,
      props: {
        id,
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
      <React.Fragment>
        {label && (
          <label
            className={`text-input-root-label${theme ? ''+theme : ''}`}
            htmlFor={id ? id : 'text-input'}
          >
            {label}
          </label>
        )}
        <input
          id={id ? id : 'text-input'}
          className={`text-input-field${theme ? ''+theme : ''}${clearable ? ' clearable' : ''}`}
          style={{ ...style }}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onBlur={onBlur}
          spellCheck={false}
        />
        { clearable && value && (
          <button
            className={`clear-button`}
            onClick={clearInput}
          >
            <img src={Cancel} alt="clear"/>
          </button>
          )
        }
      </React.Fragment>
    );
  }
}