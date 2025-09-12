// src/components/Dashboard.js
import React from 'react';

const Dashboard = ({ products, sales, customers }) => {
  const totalProducts = products.length;
  const totalStockValue = products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
  const totalSales = sales.reduce((acc, s) => acc + s.total, 0);
  const totalCustomers = customers.length;

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="dashboard-overview">
        <div className="card">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>
        <div className="card">
          <h3>Total Stock Value</h3>
          <p>M{totalStockValue.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Total Sales Revenue</h3>
          <p>M{totalSales.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Total Customers</h3>
          <p>{totalCustomers}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;