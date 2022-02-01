import React, { useContext } from 'react';
import context from '../context';

function Search() {
  const { handleChange } = useContext(context);
  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ handleChange }
      />
    </div>
  );
}

export default Search;
