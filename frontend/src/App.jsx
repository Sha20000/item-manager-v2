import { useEffect, useState } from 'react';
import API from './api';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

export default function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const load = async () => {
    const res = await API.get('/');
    setItems(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (data) => {
    if (editingItem) {
      // TODO 6a: update the item, then clear editingItem
      await API.put(`${editingItem._id}`,data);
      setEditingItem(null);


    } else {
      await API.post('/', data);
    }
    load();
  };

  const handleDelete = async (id) => {
    // TODO 6b: delete the item and reload
    await API.delete(`/${id}`);
    load();
  };

  return (
    <div>
      <h1>Item Manager v2</h1>
      <ItemForm onSave={handleSave} editingItem={editingItem} onCancel={() => setEditingItem(null)} />
      <ItemList items={items} onEdit={setEditingItem} onDelete={handleDelete} />
    </div>
  );
}
