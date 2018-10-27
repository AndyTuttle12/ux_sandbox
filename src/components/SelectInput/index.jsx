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
      onInputChange,
      state: {
        active,
        value,
      },
      props: {
        direction,
        disabled,
        list,
        theme,
        style,
      },
    } = this;
    const listMap = list && list.map((item, index) => (
      <input
        type='button'
        className='option-item'
        style={{ ...style }}
        value={item.value}
        onClick={onInputChange}
        key={index}
        name={item.name}
      />
    ))
    if (direction && direction.toUpperCase() === 'UP') {
      return (
        <div
          className={`select-input-root${theme ? ''+theme : ''} up${active ? ' active' : ''}${disabled ? ' disabled' : ''}`}
          style={{ ...style }}
          onClick={onClick}
          disabled={disabled}
        >
          <div className={`select-options-area${theme ? ''+theme : ''} up${active ? ' active' : ''}`}>
            {listMap}
          </div>
          <div
            className={`select-input-area${theme ? ''+theme : ''} up${active ? ' active' : ''}`}
            disabled={disabled}
          >
            {value}
          </div>
        </div>
      );
    }
    return (
      <div
        className={`select-input-root${theme ? ''+theme : ''} down${active ? ' active' : ''}${disabled ? ' disabled' : ''}`}
        style={{ ...style }}
        onClick={onClick}
        disabled={disabled}
      >
        <div
          className={`select-input-area${theme ? ''+theme : ''} down${active ? ' active' : ''}`}
          disabled={disabled}
        >
          {value}
        </div>
        <div className={`select-options-area${theme ? ''+theme : ''} down${active ? ' active' : ''}`}>
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
        style,
      },
    } = this;

    return (
      <React.Fragment>
        { !active && (
          <div
            className={`select-input-root${theme ? ''+theme : ''}${disabled ? ' disabled' : ''}${active ? ' active' : ''}`}
            style={{ ...style }}
            disabled={disabled}
            onClick={onClick}
            {...this.props}
          >
            <div
              className={`select-input-area${theme ? ''+theme : ''}${disabled ? ' disabled' : ''}`}
              style={{ ...style }}
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