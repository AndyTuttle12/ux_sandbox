import React, { Component } from 'react';
import './style.css';

export default class AccordianPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      panelOpen: false,
      panelActive: false,
    };
  }

  handleOpen = () => {
    if (!this.props.min) {
      this.setState({ panelOpen: !this.state.panelOpen }, () => this.props.onActive());
    }
  };

  render() {
    const { panelOpen } = this.state;
    const { title, content } = this.props;
    return (
      <React.Fragment>
        <div
          className='accordian-panel-header'
          onClick={this.handleOpen}
        >
          {title}
        </div>
        <div className={`accordian-panel-body ${panelOpen ? 'open' : ''}`}>
          {content}
        </div>
      </React.Fragment>
    );
  }
}
