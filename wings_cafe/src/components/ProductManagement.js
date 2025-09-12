// src/components/ProductManagement.js
import React, { useState } from 'react';

const ProductManagement = ({ products, setProducts }) => {
  const [formData, setFormData] = useState({ name: '', description: '', category: '', price: 0, quantity: 0 });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'price' || name === 'quantity' ? parseFloat(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? { ...p, ...formData } : p));
      setEditingId(null);
    } else {
      setProducts([...products, { id: Date.now(), ...formData }]);
    }
    setFormData({ name: '', description: '', category: '', price: 0, quantity: 0 });
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product.id);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div>
      <h2>Product Management</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required />
        <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Initial Quantity" required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Product</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.category}</td>
              <td>M{p.price.toFixed(2)}</td>
              <td>{p.quantity}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;