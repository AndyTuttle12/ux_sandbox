import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class AccordionSection extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Object).isRequired,
    isOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    this.props.onClick(this.props.label);
  };

  render() {
    const {
      onClick,
      props: { isOpen, label },
    } = this;

    return (
      <div>
        <div onClick={onClick} className='accordian-section-header'>
          {label}
        </div>
        {isOpen && (
          <div className='accordian-section-body'>
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}
