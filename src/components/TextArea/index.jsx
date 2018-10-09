import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class TextArea extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.string,
    rows: PropTypes.number,
    columms: PropTypes.number,
    readOnly: PropTypes.bool,
    spellCheck: PropTypes.bool,
    placeholder: PropTypes.string,
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
        rows,
        columns,
        readOnly,
        spellCheck,
        placeholder,
        disabled,
        theme,
      },
    } = this;

    return (
      <label>
        {label && (<p className={`text-area-label ${theme ? theme : ''}`}>{label}</p>)}
        <textarea
          className={`text-area-root ${theme ? theme : ''}`}
          disabled={disabled}
          value={value}
          rows={rows}
          columns={columns}
          readOnly={readOnly}
          spellCheck={spellCheck}
          placeholder={placeholder}
          onChange={onChange}
          style={{...this.props.style, resize: this.props.resize }}
          {...this.props}
        />
      </label>
    );
  }
}
