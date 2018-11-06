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
    style: PropTypes.instanceOf(Object),
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
      sortBy: 'name',
      searchOn: 'name',
      data: {},
      prevDisabled: true,
      nextDisabled: true,
      loading: false,
      selected: [],
    }
  }

  onInputChange = (e) => {
    this.setState({ searchValue: e.target.value });
  }

  onSort = (sortBy) => {
    const { onSearch } = this;
    this.setState({ sortBy, reverseSort: !this.state.reverseSort }, () => onSearch())
  }

  onOptionSelect = (e) => {
    const { onSearch, state: { data: { total } } } = this;
    if (total && Number(total) < Number(e.target.value)) {
      this.setState({ limit: e.target.value, skip: 0, prevDisabled: true, nextDisabled: true, }, () => onSearch());
    } else {
      this.setState({ limit: e.target.value, skip: 0, prevDisabled: true, nextDisabled: false, }, () => onSearch());
    }
  }

  onPageBack = () => {
    const {
      onSearch,
      state: {
        skip,
        limit,
      },
    } = this;
    const backSkip = Number(skip) - Number(limit);
    if (backSkip > 0) {
      this.setState({ skip: backSkip, prevDisabled: false, nextDisabled: false }, () => onSearch());
    } else {
      this.setState({ skip: 0, prevDisabled: true, nextDisabled: false }, () => onSearch());
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
      this.setState({ skip: nextSkip, prevDisabled: false, nextDisabled: true }, () => onSearch());
    } else if (total && total <= lastSkip) {
      this.setState({ skip: nextSkip, prevDisabled: false, nextDisabled: true }, () => onSearch());
    } else if (total && total > nextSkip) {
      this.setState({ skip: nextSkip, prevDisabled: false, nextDisabled: false }, () => onSearch());
    } else {
      this.setState({ nextDisabled: true });
    }
  }

  onSearch = () => {
    const {
      state: {
        skip,
        limit,
        reverseSort,
        searchValue,
        sortBy,
        searchOn,
      },
      props: {
        fetchData,
      },
    } = this;
    const options = {
      skip: (skip || 0),
      limit: (limit || 10),
      sort: {[sortBy]: (reverseSort? -1 : 1)},
      order: (reverseSort? 'descending': 'ascending'),
      filter: { [searchOn]: searchValue },
    };
    this.setState({ loading: true });
    fetchData(options, (data) => {
      if (data && data.total && data.total > Number(limit)) {
        this.setState({ data, loading: false, nextDisabled: false });
      } else {
        this.setState({ data, loading: false });
      }
    });
  }

  isSelected = (key) => {
    if (this.state.selected.indexOf(key) > -1) {
      return true;
    }
    return false;
  }

  areAllChecked = () => {
    if (this.state.data.list && this.state.selected.length > 0 && this.state.selected.length === this.state.data.list.length) {
      this.refs.checkAll.indeterminate = false;
      this.refs.checkAll.checked = true;
      return true;
    }
    if (this.refs.checkAll) {
      this.refs.checkAll.checked = false;
    }
    return false;
  }

  areAnyChecked = () => {
    this.areAllChecked();
    if (this.state.selected.length > 0) {
      if (this.refs.checkAll) {
        this.refs.checkAll.indeterminate = true;
      }
      return true;
    }
    if (this.refs.checkAll) {
      this.refs.checkAll.indeterminate = false;
    }
    return false;
  }

  handleSelect = (key) => {
    const selected = this.state.selected;
    if (this.state.selected.indexOf(key) === -1) {
      this.setState({ selected: [...selected, key] });
    }
    else {
      selected.splice(selected.indexOf(key), 1);
      this.setState({ selected })
    }
  }

  toggleAll = () => {
    if (this.areAllChecked()) {
      this.setState({ selected: [] });
    } else {
      const selected = this.state.data.list.map(row => row[this.props.selectKey]);
      this.setState({ selected });
    }
  }

  renderHeaders = () => {
    const {
      onSort,
      state: {
        reverseSort,
      },
      props: {
        columns,
        theme,
      },
    } = this;
    return columns.map((column, index) => (
      <th className={column.style || column.headerClass || 'list-header-default'} key={index}>
        {column.header}
        <button
          className={`sort-btn${theme ? ''+theme : ''}`}
          onClick={onSort}
        >
          {reverseSort && (<img className="up" src={SortUp} alt='sort up' />)}
          {!reverseSort && (<img className="down" src={SortDown} alt='sort down' />)}
        </button>
      </th>
    ))
  }

  renderList = () => {
    const {
      isSelected,
      handleSelect,
      props: {
        columns,
        rowClick,
        theme,
        selectKey,
      },
      state: {
        data: {
          list,
        },
      },
    } = this;
    return list.map((entry, index) => (
      <tr
        key={index}
        className={`list-row-default${theme ? ''+theme : ''}`}
      >
        <td className="list-row-select">
          <label className="checkbox-container">
            <input type="checkbox" checked={isSelected(entry[selectKey])} onChange={() => handleSelect(entry[selectKey])} />
            <span className="check-mark"></span>
          </label>
        </td>
        {(columns.map((column, i) => (
          <td className={column.style || column.columnClass || 'list-column-default'} key={i} onClick={() => rowClick(entry)}>
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
      onOptionSelect,
      renderHeaders,
      renderList,
      onPageBack,
      onPageNext,
      areAllChecked,
      areAnyChecked,
      toggleAll,
      state: {
        searchValue,
        skip,
        limit,
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
        style,
        title,
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
        <div className="table-header">
          <span>{title}</span>
          <div className={`search-box${theme ? ''+theme : ''}`} style={{ ...style }}>
            <TextInput
              style={{ ...style }}
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
              className={`search-btn${theme ? ''+theme : ''}`}
              style={{ ...style }}
              onClick={onSearch}
            >
              <img src={Search} alt='' />
            </button>
          </div>
        </div>
        <div className={`search-results${theme ? ''+theme : ''}`} style={{ ...style }}>
          <table cellSpacing={0}>
            <thead>
              <tr>
                <th className="list-select-all">
                  <label className="checkbox-container">
                    <input ref="checkAll" type="checkbox" indeterminate={!areAllChecked() ? areAnyChecked().toString(): 'false'} onClick={toggleAll} />
                    <span className="check-mark"></span>
                  </label>
                </th>
                {renderHeaders()}
              </tr>
            </thead>
            <tbody className="list-body">
              {data && data.list && renderList()}
              {!data && (
                <tr>
                  <td>
                    <p>
                      No results
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <div className={`search-pagination${theme ? ''+theme : ''}`} style={{ ...style }}>
            <button className={`search-page-prev${theme ? ''+theme : ''}`} style={{ ...style }} onClick={onPageBack} disabled={prevDisabled}>
              <img src={PageLeft} alt='' />
            </button>
            <button className={`search-page-next${theme ? ''+theme : ''}`} style={{ ...style }} onClick={onPageNext} disabled={nextDisabled}>
              <img src={PageRight} alt='' />
            </button>
            <SelectInput value={limit} onChange={onOptionSelect} list={optionList} direction='up' disabled={!data} style={{ ...style }}/>
            <span
              className={`search-page-total${theme ? ''+theme : ''}`}
              style={{ ...style }}
            >
              {skip + 1}-{(data && data.total)>(currentMax)? (currentMax): (data && data.total)} of {(data && data.total) || 0}
            </span>
          </div>
        </div>
        {
          loading && (
            <div className={`loading-overlay${theme ? ''+theme : ''}`} style={{ ...style }}>
              <div className={`loading-message${theme ? ''+theme : ''}`} style={{ ...style }}>
                <img src={Loading} alt=''/>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}
