import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class SelectInput extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    list: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
    direction: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || '',
      active: false,
    };
  }

  onInputChange = (e) => {
    e.persist()
    this.setState({ value: e.target.value, active: false }, () => this.props.onChange(e));
  };

  onClick = (e) => {
    if (this.props.disabled) return;
    this.setState({ active: !this.state.active });
  };

  renderItems = (e) => {
    const {
      onClick,
      state: {
        active,
        value,
      },
      props: {
        direction,
        disabled,
        theme,
      },
    } = this;
    const list = this.props.list && this.props.list.map((item, index) => (
      <input
        type='button'
        className='option-item'
        style={{ ...this.props.style }}
        value={item.value}
        onClick={this.onInputChange}
        key={index}
        name={item.name}
      />
    ))
    if (direction && direction.toUpperCase() === 'UP') {
      return (
        <div className={`select-input-root ${theme} up ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`} style={{ ...this.props.style }} onClick={onClick} disabled={disabled}>
          <div className={`select-options-area ${theme} up ${active ? 'active' : ''}`}>
            {list}
          </div>
          <div className={`select-input-area ${theme} up ${active ? 'active' : ''}`} disabled={disabled}>{value}</div>
        </div>
      );
    }
    return (
      <div className={`select-input-root ${theme} down ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`} style={{ ...this.props.style }} onClick={onClick} disabled={disabled}>
        <div className={`select-input-area ${theme} down ${active ? 'active' : ''}`} disabled={disabled}>{value}</div>
        <div className={`select-options-area ${theme} down ${active ? 'active' : ''}`}>
          {list}
        </div>
      </div>
    );
  };

  render() {
    const {
      onClick,
      renderItems,
      state: {
        active,
        value,
      },
      props: {
        disabled,
        theme,
      },
    } = this;

    return (
      <React.Fragment>
        { !active && (
          <div
            className={`select-input-root ${theme} ${disabled ? 'disabled' : ''} ${active ? 'active' : ''}`}
            style={{ ...this.props.style }}
            disabled={disabled}
            onClick={onClick}
            {...this.props}
          >
            <div
              className={`select-input-area ${theme} ${disabled ? 'disabled' : ''}`}
              style={{ ...this.props.style }}
              disabled={disabled}
            >
              {value}
            </div>
          </div>
        )}
        { active && renderItems() }
      </React.Fragment>
    );
  }
}