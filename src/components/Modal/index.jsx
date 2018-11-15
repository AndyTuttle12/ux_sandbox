import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Object),
  };

  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
    }
  }

  render() {
    const {
      state: {
        hidden,
      }
    } = this;
    return (
      <div className={`modal-overlay${hidden ? ' hidden' : ''}`}>
        <div className="modal-card">
          <div className="modal-header">
            <span className="modal-title">Sample Modal</span>
            <button className="modal-close">X</button>
          </div>
          <div className="modal-body">
            body
          </div>
          <div className="modal-footer">
            <div className="modal-actions">
              <button className="modal-cancel">Cancel</button>
              <button className="modal-accept">OK</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
