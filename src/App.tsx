import React from 'react';
import './App.css';
import { Map } from './components/map/Map'

function App() {
  return (
    <div className="App">
      <Map 
        lng={-122.25948} 
        lat={37.87221} 
        zoom={2}
      />
    </div>
  );
}

export default App;
