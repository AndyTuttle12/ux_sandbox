import React, { Component, createRef } from 'react';
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
    this.modal = createRef();
    this.overlay = createRef();
  }

  componentDidMount() {
    if (this.modal.current) {
      window.addEventListener('keyup', this.handleKeyPress, false);
      this.overlay.current.addEventListener('click', this.handleOutsideClick, false);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.modal.current) {
      window.addEventListener('keyup', this.handleKeyPress, false);
      this.overlay.current.addEventListener('click', this.handleOutsideClick, false);
    }
  }

  componentWillUnmount() {
    if (this.modal.current) {
      window.removeEventListener('keyup', this.handleKeyPress, false);
      this.overlay.current.removeEventListener('click', this.handleOutsideClick, false);
    }
  }

  handleKeyPress = (e) => {
    if(e.keyCode === 27) {
      e.preventDefault();
      this.props.closeModal();
    }
  }

  handleOutsideClick = (e) => {
    e.preventDefault();
    if (!this.modal.current.contains(e.target)) {
      this.props.closeModal();
    }
  }

  render() {
    const {
      props: {
        show,
        closeModal,
        submitModal,
        title,
        children,
      },
    } = this;

    return (<AppContext.Consumer>
      {(value) => (
        <div ref={this.overlay} className={`modal-overlay${!show ? ' hidden' : ''}`}>
          <div ref={this.modal} className="modal-card">
            <div className="modal-header">
              {
                (value.modalContent.title || title)
                ? <span className="modal-title">{value.modalContent.title || title}</span>
                : ''
              }
              <Button className="modal-close" onClick={closeModal}>X</Button>
            </div>
            <div className="modal-body">
              {children}
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
