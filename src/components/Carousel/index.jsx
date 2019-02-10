import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class Carousel extends Component {
  static propTypes = {
    children: PropTypes.any,
  }
  constructor(props) {
    super(props);
    this.state = {
      initial: true,
    }
  }
  render() {
    const {
      props: {
        children
      },
    } = this;
    return (
      <div className="carousel-root">
        <div className="carousel-items">
          {children}
        </div>
      </div>
    );
  }
}