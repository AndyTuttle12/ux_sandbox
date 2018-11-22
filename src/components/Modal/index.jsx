import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import AppContext from '../../App';
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
    return (<AppContext.Consumer>
      {(value) => (
        <div className={`modal-overlay${!show ? ' hidden' : ''}`}>
          <div className="modal-card">
            <div className="modal-header">
              <span className="modal-title">Sample Modal</span>
              <Button className="modal-close" onClick={closeModal}>X</Button>
            </div>
            <div className="modal-body">
              body
            </div>
            <div className="modal-footer">
              <div className="modal-actions">
                <Button className="modal-cancel" onClick={closeModal}>Cancel</Button>
                <Button className="modal-accept" onClick={submitModal}>OK</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppContext.Consumer>);
  }
}
