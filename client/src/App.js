import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login.js'
import Register from './components/Register.js'
function App() {
  return (
    <div className="App">
      <Login/>
      <Register/>
    </div>
  );
}

export default App;
