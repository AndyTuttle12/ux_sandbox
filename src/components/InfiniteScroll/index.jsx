import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class InfiniteScroll extends Component {
  static propTypes = {
    loaded: PropTypes.bool,
    loadMore: PropTypes.func,
    data: PropTypes.any,
    children: PropTypes.any,
  }

  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
      scrollBottom: null,
      loading: true,
    }
    this.infinite = createRef();
  }

  componentDidMount() {
    this.infinite.current.addEventListener('scroll', this.onScroll, false);
    this.props.loadMore(() => {
      this.setState({ loading: false });
    })
  }

  componentWillUnmount() {
    this.infinite.current.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = (e) => {
    if (!this.props.loaded) {
      if (e.target.scrollTop % e.target.offsetHeight <= this.props.threshold + 3
        && e.target.scrollTop % e.target.offsetHeight >= this.props.threshold - 3) {
        this.setState({ loading: true }, () => {
          this.props.loadMore((loaded) => {
            if (loaded) {
              this.setState({ loading: false });
            }
          })
        })
      }
    }
  }

  render() {
    return (
      <div
        className="infinite-scroll-root"
        ref={this.infinite}
      >
        {this.props.children}
        {this.state.loading && (
          <div className="loader">Loading...</div>
        )}
      </div>
    );
  }
}

export default InfiniteScroll;
