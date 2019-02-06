import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class Button extends Component {
  static propTypes = {
    type: PropTypes.string,
    buttonType: PropTypes.oneOf([
      'success',
      'warn',
      'info',
      'danger',
      'primary',
      'secondary',
      'tertiary',
    ]),
    theme: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    isToggleable: PropTypes.bool,
    initToggled: PropTypes.bool,
    children: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      toggled: this.props.initToggled ? true : false,
    }
  }

  onClick = (e) => {
    if (this.props.isToggleable) {
      this.setState({ toggled: !this.state.toggled })
    }
    this.props.onClick(e);
  };

  setClassName = () => {
    const { theme, className, buttonType, isToggleable } = this.props;
    let name = '';
    if (isToggleable && this.state.toggled) {
      name = 'toggled ';
    }
    if (theme) {
      return name + theme;
    } else if (className) {
      return name + className;
    } else if (buttonType) {
      return name + `btn-${buttonType}`;
    } else {
      return name + 'btn-default';
    }
  }

  render() {
    const {
      onClick,
      setClassName,
      props: {
        type,
        value,
        disabled,
        children,
        style,
      },
    } = this;

    return (
      <button
        className={setClassName()}
        style={{ ...style }}
        type={type}
        disabled={disabled}
        value={value}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}
