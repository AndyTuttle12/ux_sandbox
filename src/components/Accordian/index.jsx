import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

import AccordionSection from './AccordionSection';

export default class Accordion extends Component {
  static propTypes = {
    allowMultipleOpen: PropTypes.bool,
    isDisabled: PropTypes.bool,
    theme: PropTypes.string,
    children: PropTypes.instanceOf(Object).isRequired,
  };

  constructor(props) {
    super(props);

    const openSections = {};

    this.props.children.forEach(child => {
      if (child.props.isOpen) {
        openSections[child.props.label] = true;
      }
    });

    this.state = { openSections };
  }

  onClick = label => {
    const {
      props: { allowMultipleOpen },
      state: { openSections },
    } = this;

    const isOpen = !!openSections[label];

    if (allowMultipleOpen) {
      this.setState({
        openSections: {
          ...openSections,
          [label]: !isOpen
        }
      });
    } else {
      this.setState({
        openSections: {
          [label]: !isOpen
        }
      });
    }
  };

  render() {
    const {
      onClick,
      props: { children, isDisabled, theme, style },
      state: { openSections },
    } = this;

    return (
      <div className={`accordian-root ${theme ? theme : ''}`} style={{ ...style }}>
        {children.map(child => (
          <AccordionSection
            style={{ ...style }}
            isOpen={!!openSections[child.props.label]}
            label={child.props.label}
            icon={child.props.icon}
            onClick={onClick}
            key={child.props.label}
            isDisabled={isDisabled}
            theme={theme}
            {...this.props}
          >
            {child.props.children}
          </AccordionSection>
        ))}
      </div>
    );
  }
}
