import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import fetchPlanets from '../services/planetsAPI';
import context from '.';

const initialInput = {
  filters: {
    filterByName: {
      name: '',
    },
  },
};

const initialFilter = {
  filterByNumericValues: [
    {
      column: 'population',
      comparison: 'maior que',
      value: '0',
    },
  ],
};

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState(initialInput);
  const [search, setSearch] = useState([]);
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    (async () => {
      const { results } = await fetchPlanets();
      setPlanets(results);
      setEntries(Object.keys(results[0]));
    })();
  }, []);

  useEffect(() => {
    (() => {
      setSearch(() => planets
        .filter((e) => e.name.toLowerCase().includes(input.filters.filterByName.name)));
    })();
  }, [input, planets]);

  const saveStateGlobal = (column, comparison, value) => {
    setFilter(() => ({
      filterByNumericValues: [
        {
          column,
          comparison,
          value,
        },
      ],
    }));
  };

  const appliedFilter = () => {
    const { filterByNumericValues } = filter;
    const { column, comparison, value } = filterByNumericValues[0];
    const convertedFilter = search.filter((planet) => {
      const columnNumber = Number(planet[column]);
      const valueNumber = Number(value);
      if (comparison === 'maior que') {
        return columnNumber > valueNumber;
      }
      if (comparison === 'menor que') {
        return columnNumber < valueNumber;
      }
      return columnNumber === valueNumber;
    });
    setSearch(convertedFilter);
  };

  useEffect(() => {
    appliedFilter();
  }, [filter]);

  const handleChange = ({ target }) => {
    setInput({
      filters: {
        filterByName: {
          name: target.value.toLowerCase(),
        },
      },
    });
  };

  const endContext = {
    planets, entries, handleChange, search, saveStateGlobal,
  };

  return (
    <context.Provider value={ endContext }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
