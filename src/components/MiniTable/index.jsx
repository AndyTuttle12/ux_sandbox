import React, { Component, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import PageLeft from './images/placeholderLeft.svg';
import PageRight from './images/placeholderRight.svg';
import './style.css';

export default class DataList extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    columns: PropTypes.array,
    style: PropTypes.instanceOf(Object),
    actions: PropTypes.array,
    rowClick: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    selectKey: PropTypes.string.isRequired,
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      skip: 0,
      limit: 10,
      reverseSort: false,
      sortBy: '',
      filterOn: '',
      data: {},
      prevDisabled: true,
      nextDisabled: true,
      loading: false,
      selected: [],
    }

    this.checkAll = React.createRef();
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

  onFilterChange = (e) => {
    this.setState({ filterOn: e.target.value });
  }

  onSearch = () => {
    const {
      state: {
        skip,
        limit,
        reverseSort,
        searchValue,
        sortBy,
        filterOn,
      },
      props: {
        fetchData,
        columns,
      },
    } = this;
    const defaultFilter = columns[0].accessor;
    const currentFilter = (filterOn ? filterOn : defaultFilter);
    const options = {
      skip: (skip || 0),
      limit: (limit || 10),
      sort: {[sortBy]: (reverseSort? -1 : 1)},
      order: (reverseSort? 'descending': 'ascending'),
      filter: { [currentFilter]: searchValue },
    };
    this.setState({ loading: true });
    fetchData(options, (data) => {
      if (data && data.total && data.total > Number(limit)) {
        this.setState({ data, loading: false, nextDisabled: false });
      } else {
        this.setState({ data, loading: false, filterOn: currentFilter });
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
      this.checkAll.current.indeterminate = false;
      this.checkAll.current.checked = true;
      return true;
    }
    if (this.checkAll.current) {
      this.checkAll.current.checked = false;
    }
    return false;
  }

  areAnyChecked = () => {
    this.areAllChecked();
    if (this.state.selected.length > 0) {
      if (this.checkAll.current) {
        this.checkAll.current.indeterminate = true;
      }
      return true;
    }
    if (this.checkAll.current) {
      this.checkAll.current.indeterminate = false;
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
        sortBy,
      },
      props: {
        columns,
        theme,
      },
    } = this;
    const SortUp = lazy(() => import('./images/placeholderSortUp.svg'));
    const SortDown = lazy(() => import('./images/placeholderSortDown.svg'));
    return columns.map((column, index) => (
      <th className={column.style || column.headerClass || 'table-header-default'} key={index}>
        {column.header}
        <button
          className={`table-sort-btn${theme ? ''+theme : ''}`}
          onClick={() => onSort(column.accessor)}
        >
          {reverseSort && sortBy === column.accessor && (<img className="up" src={SortUp} alt='sort up' />)}
          {!reverseSort && sortBy === column.accessor && (<img className="down" src={SortDown} alt='sort down' />)}
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
        className={`table-row-default${theme ? ''+theme : ''}`}
      >
        <td className="table-row-select">
          <label className="checkbox-container">
            <input type="checkbox" checked={isSelected(entry[selectKey])} onChange={() => handleSelect(entry[selectKey])} />
            <span className="check-mark"></span>
          </label>
        </td>
        {(columns.map((column, i) => (
          <td className={column.style || column.columnClass || 'table-column-default'} key={i} onClick={() => rowClick(entry)}>
            {entry[column.accessor]}
          </td>
        )))}
      </tr>
    ));
  }

  renderActions = () => {
    return this.props.actions.map((action, index) => {
      return (
        <button key={index} className="table-action-button" onClick={action.event}>{action.name}</button>
      )
    })
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
      renderActions,
      checkAll,
      state: {
        searchValue,
        skip,
        limit,
        data,
        prevDisabled,
        nextDisabled,
        loading,
        filterOn,
      },
      props: {
        label,
        placeholder,
        disabled,
        theme,
        title,
        columns,
        actions,
      },
    } = this;

    const pageOptionList = [
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

    const columnsList = columns.map((column, index) => ({
      key: index,
      name: column.header,
      value: column.accessor,
    }));

    const defaultFilter = columns[0].accessor;

    const currentMax = Number(limit) + Number(skip);

    const SelectInput = lazy(() => import('../SelectInput'));
    const TextInput = lazy(() => import('../TextInput'));
    const PageSelectInput = lazy(() => import('../PageSelectInput'));
    const Search = lazy(() => import('./images/placeholderSearch.svg'));
    const Loading = lazy(() => import('./images/placeholderLoading.gif'));

    return (
      <div className="data-table-root">
        <div className="table-header">
          <span>{title}</span>
          <div className={`search-box${theme ? ''+theme : ''}`}>
            <label htmlFor="filter-select">Filter by: </label>
            <SelectInput id="filter-select" list={columnsList} value={filterOn || defaultFilter} onChange={(e) => this.onFilterChange(e)} />
            <TextInput
              onChange={onInputChange}
              onKeyPress={onSearch}
              value={searchValue}
              placeholder={placeholder || 'Search'}
              disabled={disabled}
              label={label || ''}
              clearable={true}
            >
            {searchValue}
            </TextInput>
            <button
              className={`search-btn${theme ? ''+theme : ''}`}
              onClick={onSearch}
            >
              <img src={Search} alt='' />
            </button>
          </div>
        </div>
        <div className={`search-results${theme ? ''+theme : ''}`}>
          <table cellSpacing={0}>
            <thead>
              <tr>
                <th className="table-select-all">
                  <label className="checkbox-container">
                    <input ref={checkAll} type="checkbox" indeterminate={!areAllChecked() ? areAnyChecked().toString(): 'false'} onClick={toggleAll} />
                    <span className="check-mark"></span>
                  </label>
                </th>
                {renderHeaders()}
              </tr>
            </thead>
            <tbody className="table-body">
              <Suspense fallback={(
                <tr>
                  <td>
                    <p>
                      No results
                    </p>
                  </td>
                </tr>
              )}>
                {data.list && renderList()}
              </Suspense>
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <div className={`search-pagination${theme ? ''+theme : ''}`}>
            <button className={`search-page-prev${theme ? ''+theme : ''}`} onClick={onPageBack} disabled={prevDisabled}>
              <img src={PageLeft} alt='' />
            </button>
            <button className={`search-page-next${theme ? ''+theme : ''}`} onClick={onPageNext} disabled={nextDisabled}>
              <img src={PageRight} alt='' />
            </button>
            <PageSelectInput value={limit} onChange={onOptionSelect} list={pageOptionList} direction='up' disabled={!data}/>
            <span
              className={`search-page-total${theme ? ''+theme : ''}`}
            >
              {skip + 1}-{(data && data.total)>(currentMax)? (currentMax): (data && data.total)} of {(data && data.total) || 0}
            </span>
          </div>
          {actions && (
            <div className="table-actions">
              {renderActions()}
            </div>
          )}
        </div>
        {
          loading && (
            <div className={`loading-overlay${theme ? ''+theme : ''}`}>
              <div className={`loading-message${theme ? ''+theme : ''}`}>
                <img src={Loading} alt=''/>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}
