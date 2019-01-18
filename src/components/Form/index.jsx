import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class Form extends Component {

  static propTypes = {
    action: PropTypes.any,
    children: PropTypes.any,
  }

  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
    };
  }

  updateForm = (values) => {
    console.log(values)
    this.setState({ formValues: values });
  }

  render() {
    const {
      updateForm,
      props: {
        action,
        children,
      },
    } = this;
    return (
      <form
        action={action}
        onSubmit={updateForm}
      >
        {children}
      </form>
    );
  }
}

export default Form;
