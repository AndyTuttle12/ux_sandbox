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

  updateForm = (values) => {
    if (values instanceof Object && Object.keys(values) > 0) {
      let newValues = {};
      const currentKeys = Object.keys(this.props.formValues);
      const newKeys = Object.keys(values);
      const staticTypes = ['string', 'number', 'boolean'];
      newKeys.forEach(key => {
        if (currentKeys.indexOf(key) !== -1) {
          newValues[key] = values[key];
        } else if (
          staticTypes.indexOf(typeof this.props.formValues[key]) !== -1
          && typeof this.props.formValues[key] === typeof values[key]) {
          newValues[key] = values[key];
        }
      })
      this.props.updateForm(newValues);
    }
  }

  validateForm = (values) => {
    let formValid = true;
    Object.keys(this.props.validationRules).forEach(rule => {
      if (values.hasOwnProperty(rule)) {
        const regexComparison = new RegExp(this.props.validationRules[rule], 'gmi');
        formValid = regexComparison.test(values[rule]);
      }
    })
    if (formValid) {
      this.props.submitForm(values);
    } else {
      console.log('INVALID FORM');
    }
  }

  submitForm = (values) => {
    if (this.props.validationRules) {
      this.validateForm(values);
    } else {
      this.props.submitForm(values);
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
