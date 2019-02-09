import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class NumberInput extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    placeholder: PropTypes.string,
    autoComplete: PropTypes.bool,
    list: PropTypes.string,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    theme: PropTypes.string,
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

  render() {
    const {
      onChange,
      props: {
        label,
        id,
        min,
        max,
        step,
        placeholder,
        autoComplete,
        list,
        readOnly,
        disabled,
        theme,
        style,
      },
      state: {
        value,
      }
    } = this;

    return (
      <React.Fragment>
        {label && (
          <label
            htmlFor={id ? id : 'number-input'}
            className={`number-input-label${theme ? ''+theme : ''}`}
          >
            {label}
          </label>
        )}
        <input
          type="number"
          id={id ? id : 'number-input'}
          className={`number-input-field${theme ? ''+theme : ''}`}
          style={{ ...style }}
          disabled={disabled}
          value={value}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          autoComplete={autoComplete}
          list={list}
          readOnly={readOnly}
          onChange={onChange}
        />
      </React.Fragment>
    );
  }
}