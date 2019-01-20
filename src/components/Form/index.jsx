import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class Form extends Component {

  static propTypes = {
    action: PropTypes.string,
    children: PropTypes.any,
    validationRules: PropTypes.instanceOf(Object),
    submitForm: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
    };
  }

  validateForm = () => {
    let formValid = true;
    Object.keys(this.props.validationRules).forEach(rule => {
      if (this.state.formValues.hasOwnProperty(rule)) {
        const regexComparison = new RegExp(this.props.validationRules[rule], 'gmi');
        formValid = regexComparison.test(this.state.formValues[rule]);
      }
    })
    if (formValid) {
      this.props.submitForm(this.state.formValues);
    } else {
      console.log('INVALID FORM');
    }
  }

  submitForm = (e) => {
    e.preventDefault();
    if (this.props.validationRules) {
      this.validateForm();
    } else {
      this.props.submitForm(this.state.formValues);
    }
  }

  render() {
    const {
      submitForm,
      props: {
        action,
        children,
      },
    } = this;
    return (
      <form
        action={action || 'submit'}
        onSubmit={submitForm}
      >
        {children}
      </form>
    );
  }
}

export default Form;
