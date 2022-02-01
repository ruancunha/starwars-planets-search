import React from 'react';
import Table from './components/Table';
import './App.css';
import Search from './components/Search';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <div>
        <Search />
        <Table />
      </div>
    </Provider>
  );
}

export default App;
