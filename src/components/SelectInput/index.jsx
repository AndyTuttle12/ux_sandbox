import React, { Component, lazy } from 'react';
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
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || '',
      active: false,
    }
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
        disabled,
        list,
        theme,
      },
    } = this;
    const listMap = list && list.map((item, index) => (
      <input
        type='button'
        className='select-option-item'
        value={item.value}
        onClick={onInputChange}
        key={index}
        name={item.name}
      />
    ))
    const DownArrow = lazy(() => import('./images/placeholderSortDown.svg'));
    return (
      <div
        className={`select-input-root${theme ? ''+theme : ''} down${active ? ' active' : ''}${disabled ? ' disabled' : ''}`}
        onClick={onClick}
        disabled={disabled}
      >
        <div
          className={`select-input-area${theme ? ''+theme : ''} down${active ? ' active' : ''}`}
          disabled={disabled}
        >
          {value}
          <img src={DownArrow} alt=""/>
        </div>
        <div className={`select-options-area${theme ? ''+theme : ''} down${active ? ' active' : ''}`}>
          {listMap}
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
    const DownArrow = lazy(() => import('./images/placeholderSortDown.svg'));
    return (
      <React.Fragment>
        { !active && (
          <div
            className={`select-input-root${theme ? ''+theme : ''}${disabled ? ' disabled' : ''}`}
            disabled={disabled}
            onClick={onClick}
            {...this.props}
          >
            <div
              className={`select-input-area${theme ? ''+theme : ''}${disabled ? ' disabled' : ''}`}
              disabled={disabled}
            >
              {value}
              <img src={DownArrow} alt=""/>
            </div>
          </div>
        )}
        { active && renderItems() }
      </React.Fragment>
    );
  }
}
