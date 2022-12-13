import React, { useContext, useState } from 'react';
import context from '../context';
import './Search.css';
import { comparisons } from '../context/Provider';

function Search() {
  const {
    handleChange,
    saveStateGlobal,
    showFilter,
    setShowFilter,
    columnFilter,
  } = useContext(context);

  const [column, setColumn] = useState(columnFilter[0]);
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const { filterByNumericValues } = showFilter;

  const deleteFilter = () => {
    setShowFilter((state) => (
      {
        filterByNumericValues: [
          ...state.filterByNumericValues,
          {
            column,
            comparison,
            value,
          },
        ],
      }
    ));
  };

  const saveStates = () => {
    saveStateGlobal(column, comparison, value);
    deleteFilter();
    setColumn(columnFilter[0]);
    setComparison(comparisons[0]);
    setValue('0');
  };

  return (
    <div>
      <form>
        <label id="name-label" htmlFor="name-filter">
          Procure pelo nome:
          <input
            type="text"
            id="name-filter"
            data-testid="name-filter"
            placeholder="Tente 'Tatooine'"
            onChange={ handleChange }
          />
        </label>
        <div>
          <select
            data-testid="column-filter"
            onChange={ (e) => setColumn(e.target.value) }
            value={ column }
          >
            {columnFilter.map((e, i) => (
              <option value={ e } key={ i }>{ e }</option>
            ))}
          </select>
          <select
            data-testid="comparison-filter"
            onChange={ (e) => setComparison(e.target.value) }
            value={ comparison }
          >
            {comparisons.map((e, i) => (
              <option value={ e } key={ i }>{ e }</option>
            ))}
          </select>
          <input
            type="number"
            data-testid="value-filter"
            onChange={ (e) => setValue(e.target.value) }
            value={ value }

          />
        </div>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ saveStates }
        >
          Aplicar filtro
        </button>
      </form>
      <div>
        {filterByNumericValues && filterByNumericValues.map((e, i) => (
          <div key={ i }>
            <span>{`${e.column} `}</span>
            <span>{`${e.comparison} `}</span>
            <span>{`${e.value} `}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
