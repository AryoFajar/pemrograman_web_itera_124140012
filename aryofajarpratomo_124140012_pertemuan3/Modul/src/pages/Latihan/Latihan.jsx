import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import './Latihan.css';

// Uji Coba 1 (State & Hooks): Counter dengan useState
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="latihan-box">
      <h2>Uji Coba 1: Counter</h2>
      <p className="count">Total hitungan: {count}</p>
      <div className="latihan-actions">
        <button onClick={() => setCount(count + 1)}>Tambah (+1)</button>
        <button onClick={() => setCount(count - 1)}>Kurang (-1)</button>
      </div>
    </div>
  );
}

// Uji Coba 2 (State & Hooks): Array state tanpa mengubah array asli
function ArrayState() {
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), name: `Item ke-${items.length + 1}` }]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="latihan-box">
      <h2>Uji Coba 2: Array State</h2>
      <button onClick={addItem}>Tambah Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} <button onClick={() => removeItem(item.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Latihan() {
  return (
    <div>
      <Header title="Latihan State & Hooks" description="Uji coba Counter dan Array State" />
      <main className="container">
        <Counter />
        <ArrayState />
      </main>
    </div>
  );
}

export default Latihan;
