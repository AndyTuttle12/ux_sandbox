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

  submitForm = (e) => {
    e.preventDefault();
    if (this.props.validationRules) {
      this.validateForm(this.props.validationRules);
    } else {
      this.props.submitForm();
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
