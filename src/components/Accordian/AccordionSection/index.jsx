import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class AccordionSection extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Object).isRequired,
    isOpen: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    this.props.onClick(this.props.label);
  };

  render() {
    const {
      onClick,
      props: {
        isOpen,
        label,
        isDisabled,
        icon
      },
    } = this;

    return (
      <div className={`accordian-section-root ${isOpen && 'active'} ${isOpen && !isDisabled && 'open'}`}>
        <div onClick={onClick} className={`accordian-section-header ${isOpen && 'active'}`}>
          <img className='accordian-section-icon' src={icon} alt='' />
          {!isDisabled && (<span className='accordian-section-label'>{label}</span>)}
        </div>
        {isOpen && !isDisabled && (
          <div className='accordian-section-body'>
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}
