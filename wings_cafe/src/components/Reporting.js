// src/components/Reporting.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Reporting = ({ products, sales, customers, transactions }) => {
  const lowStockProducts = products.filter(p => p.quantity < 10);
  const totalRevenue = sales.reduce((acc, s) => acc + s.total, 0);

  const salesByProduct = products.map(product => {
    const productSales = sales
      .flatMap(s => s.items)
      .filter(item => parseInt(item.productId) === product.id)
      .reduce((acc, item) => acc + (item.quantity * product.price), 0);
    return { name: product.name, total: productSales };
  }).filter(p => p.total > 0);

  return (
    <div>
      <h2>Reporting</h2>
      <h3>Sales by Product</h3>
      <Bar
        data={{
          labels: salesByProduct.map(p => p.name),
          datasets: [{
            label: 'Sales Revenue (M)',
            data: salesByProduct.map(p => p.total),
            backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
            borderColor: ['#2A8BC1', '#D94E6A', '#D9A83C', '#3A9A9A'],
            borderWidth: 1
          }]
        }}
        options={{
          scales: {
            y: { beginAtZero: true, title: { display: true, text: 'Revenue (M)' } },
            x: { title: { display: true, text: 'Product' } }
          }
        }}
      />
      <h3>Sales Report</h3>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(s => (
            <tr key={s.id}>
              <td>{customers.find(c => c.id === parseInt(s.customerId))?.name}</td>
              <td>M{s.total.toFixed(2)}</td>
              <td>{new Date(s.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Revenue: M{totalRevenue.toFixed(2)}</p>
      <h3>Low Stock Products</h3>
      <ul>
        {lowStockProducts.map(p => <li key={p.id}>{p.name} - Quantity: {p.quantity}</li>)}
      </ul>
      <h3>Transaction Report</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td>{products.find(p => p.id === parseInt(t.productId))?.name}</td>
              <td>{t.type.toUpperCase()}</td>
              <td>{t.quantity}</td>
              <td>{new Date(t.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reporting;