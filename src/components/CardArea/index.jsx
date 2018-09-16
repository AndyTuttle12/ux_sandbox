import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class CardArea extends Component {
  static propTypes = {
    spanWidth: PropTypes.number,
    spanHeight: PropTypes.number,
    direction: PropTypes.string,
    children: PropTypes.instanceOf(Object).isRequired,
  };

  render() {
    const {
      props: {
        spanWidth,
        spanHeight,
        direction,
        children,
      },
    } = this;

    return (
      <div
        className={`card-area-root`}
        style={{
          width: `${(spanWidth/12) * 100 + '%' || 'auto' }`,
          height: `${(spanHeight) * 150 + 'px' || 'auto'}`,
          flexDirection: `${direction}`,
        }}
      >
        {children}
      </div>
    );
  }
}