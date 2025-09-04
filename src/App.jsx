import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(false); // loading state

  const API_URL = "https://todo-szab.onrender.com/api/items";

  // Fetch items
  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add new item
  const addItem = async () => {
    if (!newItem.trim()) return;
    setLoading(true);
    try {
      await axios.post(API_URL, { item: newItem });
      setNewItem("");
      fetchItems();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // Toggle completion
  const toggleItem = async (id) => {
    setLoading(true);
    try {
      await axios.patch(`${API_URL}/${id}/toggle`);
      fetchItems();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchItems();
    } catch (err) {
      console.error(err);
      setLoading(false);
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
          disabled={loading} // disable input while loading
        />
        <button
          onClick={addItem}
          style={{ padding: "8px 16px", marginLeft: "8px" }}
          disabled={loading} // disable button while loading
        >
          Add
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div className="spinner" />
        </div>
      )}

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
              opacity: loading ? 0.6 : 1, // slight transparency when loading
              pointerEvents: loading ? "none" : "auto", // prevent clicks when loading
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

      {/* Spinner CSS */}
      <style>
        {`
          .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border-left-color: #09f;
            animation: spin 1s linear infinite;
            margin: 0 auto;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default App;
