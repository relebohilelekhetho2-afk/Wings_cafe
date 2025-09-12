// src/components/CustomerManagement.js
import React, { useState } from 'react';

const CustomerManagement = ({ customers, setCustomers }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setCustomers(customers.map(c => c.id === editingId ? { ...c, ...formData } : c));
      setEditingId(null);
    } else {
      setCustomers([...customers, { id: Date.now(), ...formData }]);
    }
    setFormData({ name: '', email: '' });
  };

  const handleEdit = (customer) => {
    setFormData(customer);
    setEditingId(customer.id);
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  return (
    <div>
      <h2>Customer Management</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Customer</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManagement;