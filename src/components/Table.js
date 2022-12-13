import React, { useContext } from 'react';
import './Table.css';
import context from '../context';

function filterResidents(obj) {
  const result = Object
    .entries(obj)
    .filter(([key]) => key !== 'residents' && key !== 'created' && key !== 'edited');
  return Object.values(Object.fromEntries(result));
}

function Table() {
  const { entries, search } = useContext(context);
  return (
    <div>
      <table>
        <thead>
          <tr>
            { entries
              .filter((a) => a !== 'residents' && a !== 'created' && a !== 'edited')
              .map((d) => (<th key={ d }>{ d }</th>)) }
          </tr>
        </thead>
        <tbody>
          { search.map((e) => (
            <tr key={ e.created }>
              { filterResidents(e).map((f) => (
                <td key={ f }>{f}</td>
              )) }
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
