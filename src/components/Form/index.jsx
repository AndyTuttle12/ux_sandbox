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
      formValues: {
        submitForm: this.submitForm,
        updateForm: this.updateForm,
      },
    };
  }

  updateForm = (values) => {
    if (values instanceof Object && Object.keys(values) > 0) {
      let newValues = {};
      const currentKeys = Object.keys(this.state.formValues);
      const newKeys = Object.keys(values);
      const staticTypes = ['string', 'number', 'boolean'];
      newKeys.forEach(key => {
        if (currentKeys.indexOf(key) !== -1) {
          newValues[key] = values[key];
        } else if (
          staticTypes.indexOf(typeof this.state.formValues[key]) !== -1
          && typeof this.state.formValues[key] === typeof values[key]) {
          newValues[key] = values[key];
        }
      })
      this.setState({ formValues: { ...this.state.formValues, ...newValues } })
    }
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
    const validChildren = children.filter(child => React.isValidElement(child));
    return (
      <form
        action={action || 'submit'}
        onSubmit={submitForm}
      >
        {React.Children.map(validChildren, child =>
          React.cloneElement(child, {...this.state.formValues})
        )}
      </form>
    );
  }
}

export default Form;
