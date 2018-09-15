import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class Card extends Component {
  static propTypes = {
    collapsed: PropTypes.bool,
    title: PropTypes.string,
    children: PropTypes.instanceOf(Object).isRequired,
  };

  onChange = (e) => {
    this.props.onChange(e);
  };

  render() {
    const {
      props: {
        collapsed,
        title,
        children,
      },
    } = this;

    return (
      <div className="card-root" collapsed={collapsed}>
        {title && (
            <span className="title">{title}</span>
        )}
        {children}
      </div>
    );
  }
}