import React, { useState } from "react";
import { FaBeer } from "react-icons/fa"; 

function App() {
  const [items, setItems] = useState([]);

  const addItem = () => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F0F33F", "#FF33F6"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newItem = {
      id: Date.now(),
      color: randomColor,
      name: "Elemento",
    };

    setItems((prevItems) => [...prevItems, newItem]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const clearItems = () => {
    setItems([]);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Practica Manipulación de DOM</h1>
      <h2 style={styles.subHeader}>Jorge Alberto Campos Ponce</h2>

      <button onClick={addItem} style={styles.button}>
        Agregar Elemento
      </button>

      <button onClick={clearItems} style={{ ...styles.button, backgroundColor: "#FF4747" }}>
        Vaciar Elementos
      </button>

      <div style={styles.itemsContainer}>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => removeItem(item.id)}
            style={{ ...styles.item, backgroundColor: item.color }}
          >
            <FaBeer size={40} color="#fff" />
            <span style={styles.itemName}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f4f4f9",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: "36px",
    color: "#333",
    marginBottom: "20px",
  },
  subHeader: {
    fontSize: "24px",
    color: "#555",
    marginBottom: "40px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    margin: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease",
  },
  itemsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    marginTop: "20px",
    justifyContent: "center",
  },
  item: {
    padding: "15px",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "150px",
    height: "150px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
    flexDirection: "column", // Para apilar el ícono y el texto
  },
  itemName: {
    marginTop: "10px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default App;
