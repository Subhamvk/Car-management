import React  , { useState }from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import CarList from './components/CarList';
import CarForm from './components/CarForm';
import CarDetail from './components/CarDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/cars/create" element={<CarForm />} />
        <Route path="/cars/:id" element={<CarDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
