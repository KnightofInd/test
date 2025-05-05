import React from 'react';
import './App.css';

import ThreeBackground from './components/ThreeBackground';

function App() {
  return (
    <div className="App">
      <ThreeBackground />
      <h1 style={{ color: 'white', position: 'relative', zIndex: 1 }}>Welcome to 3D React</h1>
    </div>
  );
}

export default App;
