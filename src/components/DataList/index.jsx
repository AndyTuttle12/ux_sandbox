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

export default class DataList extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    columns: PropTypes.array,
    rowClick: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    theme: PropTypes.string,
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
      nextDisabled: true,
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
    if (total && total + Number(skip) >= lastSkip) {
      this.setState({ skip: nextSkip, prevDisabled: false, nextDisabled: true }, () => onSearch(e));
    } else if (total && total <= lastSkip) {
      this.setState({ skip: nextSkip, prevDisabled: false, nextDisabled: true }, () => onSearch(e));
    } else if (total && total > nextSkip) {
      this.setState({ skip: nextSkip, prevDisabled: false, nextDisabled: false }, () => onSearch(e));
    } else {
      this.setState({ nextDisabled: true });
    }
  }

  onSearch = (e) => {
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
    this.setState({ loading: true });
    this.props.fetchData(options, (data) => {
      console.log(data);
      if (data && data.total && data.total > Number(limit)) {
        this.setState({ data, loading: false, nextDisabled: false });
      } else {
        this.setState({ data, loading: false });
      }
    });
  }

  renderHeaders = () => {
    return this.props.columns.map((column, index) => (
      <th className={column.style || column.headerClass || 'list-header-default'} key={index}>{column.header}</th>
    ))
  }

  renderList = () => {
    return this.state.data.list.map((entry, index) => (
      <tr key={index} className={`list-row-default ${this.props.theme?this.props.theme:''}`} style={{ ...this.props.style }} onClick={() => this.props.rowClick(entry)}>
        {(this.props.columns.map((column, i) => (
          <td className={column.style || column.columnClass || 'list-column-default'} key={i}>
            {entry[column.accessor]}
          </td>
        )))}
      </tr>
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
      renderHeaders,
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
        theme,
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
      <div className="data-list-root">
        <div className={`search-box ${theme ? theme : ''}`} style={{ ...this.props.style }}>
          <TextInput
            style={{ ...this.props.style }}
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
            className={`search-btn ${theme ? theme : ''}`}
            style={{ ...this.props.style }}
            onClick={onSearch}
          >
            <img src={Search} alt='' />
          </button>
          <button
            className={`sort-btn ${theme ? theme : ''}`}
            style={{ ...this.props.style }}
            onClick={onSort}
          >
            {reverseSort && (<img className="up" src={SortUp} alt='' />)}
            {!reverseSort && (<img className="down" src={SortDown} alt='' />)}
          </button>
        </div>
        <div className={`search-results ${theme ? theme : ''}`} style={{ ...this.props.style }}>
          <table cellSpacing={0}>
            <thead>
              <tr>
                {renderHeaders()}
              </tr>
            </thead>
            <tbody className="list-body">
              {data && data.list && renderList()}
              {!data && (
                <tr><td><p>No results</p></td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={`search-pagination ${theme ? theme : ''}`} style={{ ...this.props.style }}>
          <button className={`search-page-prev ${theme ? theme : ''}`} style={{ ...this.props.style }} onClick={onPageBack} disabled={prevDisabled}>
            <img src={PageLeft} alt='' />
          </button>
          <span className={`search-page-list-label ${theme ? theme : ''}`} style={{ ...this.props.style }}>Rows: </span>
          <SelectInput value={limit} onChange={onOptionSelect} list={optionList} direction='up' disabled={!data} style={{ ...this.props.style }}/>
          <span
            className={`search-page-total ${theme ? theme : ''}`}
            style={{ ...this.props.style }}
          >
            {skip + 1}-{(data && data.total)>(currentMax)? (currentMax): (data && data.total)} of {(data && data.total) || 0}
          </span>
          <button className={`search-page-next ${theme ? theme : ''}`} style={{ ...this.props.style }} onClick={onPageNext} disabled={nextDisabled}>
            <img src={PageRight} alt='' />
          </button>
        </div>
        {
          loading && (
            <div className={`loading-overlay ${theme ? theme : ''}`} style={{ ...this.props.style }}>
              <div className={`loading-message ${theme ? theme : ''}`} style={{ ...this.props.style }}>
                <img src={Loading} alt=''/>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}
