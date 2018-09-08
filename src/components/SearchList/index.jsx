import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import SelectInput from '../SelectInput';
import Search from './images/placeholderSearch.svg';
import SortUp from './images/placeholderSortUp.svg';
import SortDown from './images/placeholderSortDown.svg';
import PageLeft from './images/placeholderLeft.svg';
import PageRight from './images/placeholderRight.svg';
import Loading from './images/placeholderLoading.gif';
import './style.css';

export default class SearchList extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    fetchData: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      skip: 0,
      limit: 10,
      reverseSort: false,
      data: {},
      prevDisabled: true,
      nextDisabled: false,
      loading: false,
    }
  }

  onInputChange = (e) => {
    this.setState({ searchValue: e.target.value });
  }
  
  onSort = (e) => {
    this.setState({ reverseSort: !this.state.reverseSort }, () => this.onSearch(e))
  }

  onOptionSelect = (e) => {
    if (this.state.data.total && Number(this.state.data.total) < Number(e.target.value)) {
      this.setState({ limit: e.target.value, skip: 0, prevDisabled: true, nextDisabled: true, }, () => this.onSearch(e));
    } else {
      this.setState({ limit: e.target.value, skip: 0, prevDisabled: true, nextDisabled: false, }, () => this.onSearch(e));
    }
  }

  onPageBack = (e) => {
    const {
      onSearch,
      state: {
        skip,
        limit,
      },
    } = this;
    const backSkip = Number(skip) - Number(limit);
    if (backSkip > 0) {
      this.setState({ skip: backSkip, prevDisabled: false, nextDisabled: false }, () => onSearch(e));
    } else {
      this.setState({ skip: 0, prevDisabled: true, nextDisabled: false }, () => onSearch(e));
    }
  }

  onPageNext = (e) => {
    const {
      onSearch,
      state: {
        skip,
        limit,
        data: { total },
      },
    } = this;
    const nextSkip = Number(skip) + Number(limit);
    const lastSkip = Number(nextSkip) + Number(limit);
    if (total && total < lastSkip) {
      this.setState({ skip: nextSkip, prevDisabled: false, nextDisabled: true }, () => onSearch(e));
    } else if (total && total > nextSkip) {
      this.setState({ skip: nextSkip, prevDisabled: false, nextDisabled: false }, () => onSearch(e));
    } else {
      this.setState({ nextDisabled: true });
    }
  }

  onSearch = async (e) => {
    const {
      state: {
        skip,
        limit,
        reverseSort,
        searchValue,
      },
    } = this;
    const options = {
      skip: (skip || 0),
      limit: (limit || 10),
      sort: {'name': 1},
      order: (reverseSort? 'descending': 'ascending'),
      filter: { 'name': searchValue },
    };
    try {
      await this.setState({ loading: true });
      let data = await this.props.fetchData(options);
      setTimeout(() => { // TODO: remove demo code and timeouts for real implementation
        this.setState({ data, loading: false });
      }, 500);
    } catch (e) {
      console.error(e);
    }
  }

  renderList = () => {
    return this.state.data.list.map((name, index) => (
      <a key={index} className='search-list-area' href='/'>
        <div>
          {name}
        </div>
      </a>
    ));
  }

  componentDidMount() {
    this.onSearch();
  }

  render() {
    const {
      onInputChange,
      onSearch,
      onSort,
      onOptionSelect,
      renderList,
      onPageBack,
      onPageNext,
      state: {
        searchValue,
        skip,
        limit,
        reverseSort,
        data,
        prevDisabled,
        nextDisabled,
        loading,
      },
      props: {
        label,
        placeholder,
        disabled,
      },
    } = this;

    const optionList = [
      {
        name: '5',
        value: '5',
      },
      {
        name: '10',
        value: '10',
      },
      {
        name: '25',
        value: '25',
      },
      {
        name: '50',
        value: '50',
      },
      {
        name: '100',
        value: '100',
      },
    ];

    const currentMax = Number(limit) + Number(skip);

    return (
      <React.Fragment>
        <div className='search-box'>
          <TextInput
            onChange={onInputChange}
            onKeyPress={onSearch}
            value={searchValue}
            placeholder={placeholder || 'Search'}
            disabled={disabled}
            label={label || ''}
          >
          {searchValue}
          </TextInput>
          <button
            className='search-btn'
            onClick={onSearch}
          >
            <img src={Search} alt='' />
          </button>
          <button
            className='sort-btn'
            onClick={onSort}
          >
            {reverseSort && (<img className='up' src={SortUp} alt='' />)}
            {!reverseSort && (<img className='down' src={SortDown} alt='' />)}
          </button>
        </div>
        <div className='search-results'>
          {data && data.list && renderList()}
        </div>
        <div className='search-pagination'>
          <button className='search-page-prev' onClick={onPageBack} disabled={prevDisabled}>
            <img src={PageLeft} alt='' />
          </button>
          <span className='search-page-list-label'>Rows: </span>
          <SelectInput value={limit} onChange={onOptionSelect} list={optionList} direction='up' disabled={!data}/>
          <span
            className='search-page-total'
          >
            {skip + 1}-{(data && data.total)>(currentMax)? (currentMax): (data && data.total)} of {(data && data.total) || 0}
          </span>
          <button className='search-page-next' onClick={onPageNext} disabled={nextDisabled}>
            <img src={PageRight} alt='' />
          </button>
        </div>
        {
          loading && (
            <div className='loading-overlay'>
              <div className='loading-message'>
                <img src={Loading} alt=''/>
              </div>
            </div>
          )
        }
      </React.Fragment>
    );
  }
}
