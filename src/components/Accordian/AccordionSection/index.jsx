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
    theme: PropTypes.string,
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
        icon,
        theme,
      },
    } = this;

    return (
      <div className={`accordian-section-root ${theme ? theme : ''} ${isOpen ? 'active' : ''} ${(isOpen && !isDisabled) ? 'open' : ''}`} style={{ ...this.props.style }}>
        <div onClick={onClick} className={`accordian-section-header ${theme ? theme : ''} ${isOpen ? 'active' : ''}`} style={{ ...this.props.style }}>
          <img className={`accordian-section-icon ${theme ? theme : ''}`} src={icon} alt='' style={{ ...this.props.style }} />
          {!isDisabled && (<span className={`accordian-section-label ${theme ? theme : ''}`} style={{ ...this.props.style }}>{label}</span>)}
        </div>
        {isOpen && !isDisabled && (
          <div className={`accordian-section-body ${theme ? theme : ''}`} style={{ ...this.props.style }}>
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}
