import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class InfiniteScroll extends Component {
  static propTypes = {
    loaded: PropTypes.bool,
    loadMore: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
      scrollBottom: null,
    }
    this.infinite = createRef();
  }

  componentDidMount() {
    this.infinite.current.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    this.infinite.current.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = (e) => {
    console.log(e)
  }

  render() {
    return (
      <div
        className="infinite-scroll-root"
        ref={this.infinite}
      >
        <div className="dummy">test</div>
        <div className="dummy">test</div>
        <div className="dummy">test</div>
        <div className="dummy">test</div>
        <div className="dummy">test</div>
        <div className="dummy">test</div>
        <div className="dummy">test</div>
        <div className="dummy">test</div>
        <div className="dummy">test</div>
        <div className="dummy">test</div>
        <div className="dummy">test</div>
      </div>
    );
  }
}

export default InfiniteScroll;
