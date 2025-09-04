import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const API_URL = "https://todo-k79q.onrender.com/api/items";

  // Fetch items
  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add new item
  const addItem = async () => {
    if (!newItem.trim()) return;
    try {
      await axios.post(API_URL, { item: newItem });
      setNewItem("");
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle completion
  const toggleItem = async (id) => {
    try {
      await axios.patch(`${API_URL}/${id}/toggle`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", fontFamily: "Arial" }}>
      <h1>✅ To-Do App</h1>

      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter task..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={addItem} style={{ padding: "8px 16px", marginLeft: "8px" }}>
          Add
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              background: item.completed ? "#d4edda" : "#f8d7da",
            }}
          >
            <span
              onClick={() => toggleItem(item.id)}
              style={{
                textDecoration: item.completed ? "line-through" : "none",
                cursor: "pointer",
                flex: 1,
              }}
            >
              {item.item}
            </span>
            <button
              onClick={() => deleteItem(item.id)}
              style={{ background: "red", color: "white", border: "none", padding: "5px 10px" }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
