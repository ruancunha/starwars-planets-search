import React, { useState, useEffect } from 'react';
import './App.css';
import fetchPlanets from './services/planetsAPI';

function filterResidents(obj) {
  const result = Object.entries(obj).filter(([key]) => key !== 'residents');
  return Object.values(Object.fromEntries(result));
}

function App() {
  const [planets, setPlanets] = useState([]);
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    (async () => {
      const { results } = await fetchPlanets();
      setPlanets(results);
      setEntries(Object.keys(results[0]));
    })();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            { entries
              .filter((a) => a !== 'residents').map((d) => (<th key={ d }>{ d }</th>)) }
          </tr>
        </thead>
        <tbody>
          { planets.map((e) => (
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

export default App;
