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
    this.setState({ active: !this.state.active });
  };

  renderItems = (e) => {
    const {
      onClick,
      state: {
        active,
        value,
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
    return (
      <div className={`select-input-root ${active ? 'active' : ''}`} onClick={onClick}>
        <div className='select-input-area'>{value}</div>
        <div className='select-options-area'>
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
        { !active && (<div className={`select-input-root ${active ? 'active' : ''}`} onClick={onClick}>
          <div className='select-input-area'>{value}</div>
        </div>)}
        { active && renderItems() }
      </React.Fragment>
    );
  }
}