import React, { useContext, useState } from 'react';
import context from '../context';

function Search() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const { handleChange, saveStateGlobal } = useContext(context);

  const saveStates = () => {
    saveStateGlobal(column, comparison, value);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ handleChange }
      />
      <select
        data-testid="column-filter"
        onChange={ (e) => setColumn(e.target.value) }
        value={ column }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (e) => setComparison(e.target.value) }
        value={ comparison }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ (e) => setValue(e.target.value) }
        value={ value }

      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ saveStates }
      >
        Aplicar filtro
      </button>
    </div>
  );
}

export default Search;
