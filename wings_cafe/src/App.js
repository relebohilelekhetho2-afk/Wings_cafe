// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './components/dashboard.css'
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import InventoryManagement from './components/InventoryManagement';
import CustomerManagement from './components/CustomerManagement';
import Sales from './components/Sales';
import Reporting from './components/Reporting';

function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : [];
  });
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('customers');
    return saved ? JSON.parse(saved) : [];
  });
  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('sales');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);
  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);
  useEffect(() => {
    localStorage.setItem('sales', JSON.stringify(sales));
  }, [sales]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Wings Cafe Inventory System</h1>
          <nav>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/products">Product Management</Link></li>
              <li><Link to="/inventory">Inventory Management</Link></li>
              <li><Link to="/customers">Customer Management</Link></li>
              <li><Link to="/sales">Sales</Link></li>
              <li><Link to="/reporting">Reporting</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard products={products} sales={sales} customers={customers} />} />
            <Route path="/products" element={<ProductManagement products={products} setProducts={setProducts} />} />
            <Route path="/inventory" element={<InventoryManagement products={products} setProducts={setProducts} transactions={transactions} setTransactions={setTransactions} />} />
            <Route path="/customers" element={<CustomerManagement customers={customers} setCustomers={setCustomers} />} />
            <Route path="/sales" element={<Sales products={products} setProducts={setProducts} customers={customers} sales={sales} setSales={setSales} />} />
            <Route path="/reporting" element={<Reporting products={products} sales={sales} customers={customers} transactions={transactions} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;