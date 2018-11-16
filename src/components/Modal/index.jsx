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
      props: {
        show,
        closeModal,
        submitModal,
      },
    } = this;
    return (
      <div className={`modal-overlay${!show ? ' hidden' : ''}`}>
        <div className="modal-card">
          <div className="modal-header">
            <span className="modal-title">Sample Modal</span>
            <button className="modal-close" onClick={closeModal}>X</button>
          </div>
          <div className="modal-body">
            body
          </div>
          <div className="modal-footer">
            <div className="modal-actions">
              <button className="modal-cancel" onClick={closeModal}>Cancel</button>
              <button className="modal-accept" onClick={submitModal}>OK</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
