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
    console.log(this.props.validationRules);
    // TODO: Add validation for types here
    this.props.submitForm(this.state.formValues);
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
