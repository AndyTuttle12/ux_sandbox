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
      },
    } = this;
    const list = this.props.list && this.props.list.map((item, index) => (
      <input
        type='button'
        className='option-item'
        value={item.value}
        onClick={this.onInputChange}
        key={index}
        name={item.name}
      />
    ))
    if (direction && direction.toUpperCase() === 'UP') {
      return (
        <div className={`select-input-root up ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`} onClick={onClick} disabled={disabled}>
          <div className={`select-options-area up ${active ? 'active' : ''}`}>
            {list}
          </div>
          <div className={`select-input-area up ${active ? 'active' : ''}`} disabled={disabled}>{value}</div>
        </div>
      );
    }
    return (
      <div className={`select-input-root down ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`} onClick={onClick} disabled={disabled}>
        <div className={`select-input-area down ${active ? 'active' : ''}`} disabled={disabled}>{value}</div>
        <div className={`select-options-area down ${active ? 'active' : ''}`}>
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
      },
    } = this;

    return (
      <React.Fragment>
        { !active && (<div className={`select-input-root ${disabled ? 'disabled' : ''} ${active ? 'active' : ''}`} disabled={disabled} onClick={onClick}>
          <div className={`select-input-area ${disabled ? 'disabled' : ''}`} disabled={disabled}>{value}</div>
        </div>)}
        { active && renderItems() }
      </React.Fragment>
    );
  }
}