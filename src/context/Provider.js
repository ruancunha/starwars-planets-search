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

const columns = [
  'população',
  'Período orbital',
  'Diametro',
  'Período de rotação',
  'Área água superficial',
];

export const comparisons = [
  'maior que', 'menor que', 'igual a',
];

const filters = {
  filterByNumericValues: [],
};

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState(initialInput);
  const [search, setSearch] = useState([]);
  const [columnFilter, setColumnFilter] = useState(columns);
  const [showFilter, setShowFilter] = useState(filters);

  useEffect(() => {
    (() => {
      setSearch(() => planets
        .filter((e) => e.name.toLowerCase().includes(input.filters.filterByName.name)));
    })();
  }, [input, planets]);

  useEffect(() => {
    (async () => {
      const { results } = await fetchPlanets();
      setPlanets(results);
      setEntries(Object.keys(results[0]));
      setSearch(results);
    })();
  }, []);

  // Solucao e refatoramento de Mariana Saraiva
  const saveStateGlobal = (column, comparison, value) => {
    setColumnFilter(columnFilter.filter((e) => e !== column));
    setSearch(() => {
      if (comparison === 'maior que') {
        return search.filter((e) => e[column] > Number(value));
      }
      if (comparison === 'menor que') {
        return search.filter((e) => e[column] < Number(value));
      }
      return search.filter((e) => e[column] === value);
    });
  };

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
    planets,
    entries,
    handleChange,
    search,
    saveStateGlobal,
    columnFilter,
    setColumnFilter,
    showFilter,
    setShowFilter,
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
