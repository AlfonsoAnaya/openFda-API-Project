import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import MainContainer from './Components/MainContainer';
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <MainContainer />
      </div>
    </Router>
  );
}

export default App;
