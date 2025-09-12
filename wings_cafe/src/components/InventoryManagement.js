// src/components/InventoryManagement.js
import React, { useState } from 'react';

const InventoryManagement = ({ products, setProducts, transactions, setTransactions }) => {
  const [formData, setFormData] = useState({ productId: '', type: 'in', quantity: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'quantity' ? parseFloat(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = products.find(p => p.id === parseInt(formData.productId));
    if (!product) return alert('Product not found');
    if (formData.type === 'out' && product.quantity < formData.quantity) return alert('Insufficient stock');

    const updatedQuantity = formData.type === 'in' 
      ? product.quantity + formData.quantity 
      : product.quantity - formData.quantity;

    setProducts(products.map(p => p.id === product.id ? { ...p, quantity: updatedQuantity } : p));
    setTransactions([...transactions, { id: Date.now(), ...formData, date: new Date().toISOString() }]);
    setFormData({ productId: '', type: 'in', quantity: 0 });
  };

  return (
    <div>
      <h2>Inventory Management</h2>
      <form onSubmit={handleSubmit}>
        <select name="productId" value={formData.productId} onChange={handleChange} required>
          <option value="">Select Product</option>
          {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="in">Add Stock</option>
          <option value="out">Deduct Stock</option>
        </select>
        <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Quantity" required />
        <button type="submit">Record Transaction</button>
      </form>
      <h3>Current Stock</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Transaction History</h3>
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

export default InventoryManagement;