import { useEffect, useState } from 'react';

const empty = { name: '', description: '' };

export default function ItemForm({ onSave, editingItem, onCancel }) {
  const [form, setForm] = useState(empty);

  // When an item is selected for editing, load it into the form
  useEffect(() => {
    if (editingItem) {
      setForm({ name: editingItem.name, description: editingItem.description || '' });
    } else {
      setForm(empty);
    }
  }, [editingItem]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(form);
    setForm(empty);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      {/* TODO 5: inputs for the new fields */}
      <input name="supplier" placeholder='Supplier' value={form.supplier || ''} onChange={handleChange} required />
      <select name="stockStatus" value={form.stockStatus || 'In Stock'} onChange={handleChange}>
        <option value="In Stock">In Stock</option>
        <option value="Low Stock">Low Stock</option>
        <option value="Out of Stock">Out of Stock</option>
      </select>
      <input type="date" name="expiryDate" value={form.expiryDate || ''} onChange={handleChange} />
      <input type="Boolean" name="isFeatured" checked={form.isFeatured || false} onChange={handleChange} />

      <button type="submit">{editingItem ? 'Update Item' : 'Add Item'}</button>
      {editingItem && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}
