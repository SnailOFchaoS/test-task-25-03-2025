import React from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

import ProductListPage from './ProductListPage'
import ProductPage from './ProductPage';
import ProductAddPage from './ProductAddPage';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path = "/" element = {<Navigate to = "/products"/>}/>
          <Route path = "/products" element = {<ProductListPage />}/>
          <Route path = "/products/:id" element = {<ProductPage />}/>
          <Route path = "/products/create" element = {<ProductAddPage />}/>
          <Route path = "/products/edit/:id" element = {<ProductAddPage />}/>
        </Routes>
      </Router>
    </Provider>
    
  );
}

export default App;