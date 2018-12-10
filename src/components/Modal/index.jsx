import React, { Component, lazy } from 'react';
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

    const Button = lazy(() => import('../Button'));
    const AppContext = lazy(() => import('../../AppContext'));

    return (<AppContext.Consumer>
      {(value) => (
        <div className={`modal-overlay${!show ? ' hidden' : ''}`}>
          <div className="modal-card">
            <div className="modal-header">
              <span className="modal-title">{value.modalContent.title}</span>
              <Button className="modal-close" onClick={closeModal}>X</Button>
            </div>
            <div className="modal-body">
              {value.modalContent.body}
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
