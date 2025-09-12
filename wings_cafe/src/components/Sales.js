// src/components/Sales.js
import React, { useState } from 'react';

const Sales = ({ products, setProducts, customers, sales, setSales }) => {
  const [formData, setFormData] = useState({ customerId: '', items: [] });
  const [itemForm, setItemForm] = useState({ productId: '', quantity: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItemForm({ ...itemForm, [name]: name === 'quantity' ? parseFloat(value) : value });
  };

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, itemForm] });
    setItemForm({ productId: '', quantity: 0 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let total = 0;
    const updatedProducts = [...products];

    for (const item of formData.items) {
      const productIndex = updatedProducts.findIndex(p => p.id === parseInt(item.productId));
      if (productIndex === -1) return alert('Product not found');
      if (updatedProducts[productIndex].quantity < item.quantity) return alert(`Insufficient stock for ${updatedProducts[productIndex].name}`);

      total += updatedProducts[productIndex].price * item.quantity;
      updatedProducts[productIndex].quantity -= item.quantity;
    }

    setProducts(updatedProducts);
    setSales([...sales, { id: Date.now(), ...formData, total, date: new Date().toISOString() }]);
    setFormData({ customerId: '', items: [] });
  };

  return (
    <div>
      <h2>Sales</h2>
      <form onSubmit={handleSubmit}>
        <select name="customerId" value={formData.customerId} onChange={handleChange} required>
          <option value="">Select Customer</option>
          {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <h3>Add Items</h3>
        <select name="productId" value={itemForm.productId} onChange={handleItemChange}>
          <option value="">Select Product</option>
          {products.map(p => <option key={p.id} value={p.id}>{p.name} - M{p.price.toFixed(2)}</option>)}
        </select>
        <input name="quantity" type="number" value={itemForm.quantity} onChange={handleItemChange} placeholder="Quantity" />
        <button type="button" onClick={addItem}>Add Item</button>
        <ul>
          {formData.items.map((item, index) => (
            <li key={index}>
              {products.find(p => p.id === parseInt(item.productId))?.name} - Qty: {item.quantity}
            </li>
          ))}
        </ul>
        <button type="submit">Record Sale</button>
      </form>
    </div>
  );
};

export default Sales;