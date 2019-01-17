import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class Form extends Component {

  static propTypes = {
    action: PropTypes.func.isRequired,
    children: PropTypes.any,
  }

  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
    };
  }

  updateForm = (values) => {
    this.setState({ formValues: values });
  }

  render() {
    const {
      updateForm,
      props: {
        action,
        children,
      },
      state: {
        formValues,
      },
    } = this;
    return (
      <form
        action={action}
        updateForm={updateForm}
        formValues={formValues}
      >
        {children}
      </form>
    );
  }
}

export default Form;
