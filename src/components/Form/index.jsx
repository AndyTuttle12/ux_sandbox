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
