import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

import ProductListPage from './ProductListPage'
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path = "/" element = {<Navigate to = "/products"/>}/>
          <Route path = "/products" element = {<ProductListPage />}/>
        </Routes>
      </Router>
    </Provider>
    
  );
}

export default App;