export default function ItemList({ items, onEdit, onDelete }) {
  if (items.length === 0) return <p>No items yet.</p>;

  return (
    <div>
      {items.map((item) => (
        <div className="item" key={item._id}>
          <strong>{item.name}</strong>
          <p>{item.description}</p>
          {/* TODO 5: display the new fields */}
          <p>Supplier: {item.supplier}| Status: {item.stockStatus}| Expires:{' '}
          {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}</p>
          <div className="actions">
            <button onClick={() => onEdit(item)}>Edit</button>
            <button onClick={() => onDelete(item._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
