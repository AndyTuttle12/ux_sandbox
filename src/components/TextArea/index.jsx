import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class TextArea extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    rows: PropTypes.number,
    columms: PropTypes.number,
    readOnly: PropTypes.bool,
    spellCheck: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    theme: PropTypes.string,
  };

  onChange = (e) => {
    this.props.onChange(e);
    if (this.props.updateForm) {
      this.props.updateForm({ textarea: e.target.value });
    }
  };

  onBlur = (e) => {
    if (this.props.updateForm) {
      this.props.updateForm({ textarea: e.target.value });
    }
    this.props.onBlur(e);
  }

  render() {
    const {
      onChange,
      onBlur,
      props: {
        label,
        value,
        id,
        rows,
        columns,
        readOnly,
        spellCheck,
        placeholder,
        disabled,
        theme,
        style,
        resize,
      },
    } = this;

    return (
      <React.Fragment>
        {label && (
          <label
            className={`text-area-label${theme ? ''+theme : ''}`}
            htmlFor={id ? id : 'text-area'}
          >
            {label}
          </label>
        )}
        <textarea
          className={`text-area-root${theme ? ''+theme : ''}`}
          id={id ? id : 'text-area'}
          disabled={disabled}
          value={value}
          rows={rows}
          columns={columns}
          readOnly={readOnly}
          spellCheck={spellCheck}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          style={{...style, resize: resize }}
        />
      </React.Fragment>
    );
  }
}
