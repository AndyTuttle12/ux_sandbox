import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

import AccordionSection from './AccordionSection';

export default class Accordion extends Component {
  static propTypes = {
    allowMultipleOpen: PropTypes.bool,
    isDisabled: PropTypes.bool,
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
      props: { children, isDisabled },
      state: { openSections },
    } = this;

    return (
      <div className={`accordian-root`}>
        {children.map(child => (
          <AccordionSection
            isOpen={!!openSections[child.props.label]}
            label={child.props.label}
            icon={child.props.icon}
            onClick={onClick}
            key={child.props.label}
            isDisabled={isDisabled}
            {...this.props}
          >
            {child.props.children}
          </AccordionSection>
        ))}
      </div>
    );
  }
}
