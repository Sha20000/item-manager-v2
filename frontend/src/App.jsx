import { useEffect, useState } from 'react';
import API from './api';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

export default function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const res = await API.get('/');
      setItems(res.data);
    } catch (err) {
      setError('Could not load items: ' + err.message);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (data) => {
    setError('');
    try {
      if (editingItem) {
        await API.put(`/${editingItem._id}`, data);
        setEditingItem(null);
      } else {
        await API.post('/', data);
      }
      load();
    } catch (err) {
      // show the backend's message on the page
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/${id}`);
      load();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h1>Item Manager v2</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ItemForm onSave={handleSave} editingItem={editingItem} onCancel={() => setEditingItem(null)} />
      <ItemList items={items} onEdit={setEditingItem} onDelete={handleDelete} />
    </div>
  );
}