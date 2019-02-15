import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class Carousel extends Component {
  static propTypes = {
    children: PropTypes.any,
    items: PropTypes.instanceOf('Array'),
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
        children,
        items,
      },
    } = this;
    return (
      <div className="carousel-root">
        <div className="carousel-items">
          {items && items.map(item => (
            <div className="carousel-item">{item}</div>
          ))}
          {children}
        </div>
      </div>
    );
  }
}