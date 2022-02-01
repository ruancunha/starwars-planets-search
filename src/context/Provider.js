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

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState(initialInput);
  const [search, setSearch] = useState([]);

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

  const handleChange = ({ target }) => {
    setInput({
      filters: {
        filterByName: {
          name: target.value.toLowerCase(),
        },
      },
    });
  };

  return (
    <context.Provider value={ { planets, entries, handleChange, search } }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
