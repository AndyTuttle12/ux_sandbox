import React, { Component } from 'react';
import AppContext from '../../AppContext';
import PropTypes from 'prop-types';
import Button from '../Button';
import './style.css';

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Object),
    closeModal: PropTypes.func.isRequired,
    submitModal: PropTypes.func.isRequired,
    modalContent: PropTypes.instanceOf(Object),
    title: PropTypes.string,
    body: PropTypes.string,
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
        title,
        body,
      },
    } = this;

    return (<AppContext.Consumer>
      {(value) => (
        <div className={`modal-overlay${!show ? ' hidden' : ''}`}>
          <div className="modal-card">
            <div className="modal-header">
              <span className="modal-title">{value.modalContent.title || title}</span>
              <Button className="modal-close" onClick={closeModal}>X</Button>
            </div>
            <div className="modal-body">
              {value.modalContent.body || body}
            </div>
            <div className="modal-footer">
              <div className="modal-actions">
                {value.modalContent.actions && value.modalContent.actions.map((action, index) => (
                  <Button key={index} className="modal-action" onClick={action.onClick}>{action.name}</Button>
                ))}
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
