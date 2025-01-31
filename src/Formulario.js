import React, { useState } from "react";
import validator from "validator";

function Formulario() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    birthDate: "",
    fullName: "",
  });

  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    birthDate: false,
    fullName: false,
  });

  const [isValid, setIsValid] = useState(false);
  const [serverResponse, setServerResponse] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    let isFieldValid = false;

    switch (name) {
      case "username":
        isFieldValid = value.trim().length > 0;
        break;
      case "email":
        isFieldValid = validator.isEmail(value);
        break;
      case "password":
        isFieldValid = value.length >= 6;
        break;
      case "birthDate":
        isFieldValid = validator.isDate(value);
        break;
      case "fullName":
        isFieldValid = value.trim().length > 0;
        break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: !isFieldValid });
    validateForm({ ...formData, [name]: value }, { ...errors, [name]: !isFieldValid });
  };

  const validateForm = (data, errorStates) => {
    const allFilled = Object.values(data).every((field) => field.trim().length > 0);
    const noErrors = Object.values(errorStates).every((error) => error === false);
    setIsValid(allFilled && noErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setServerResponse("Usuario registrado exitosamente!");
        setFormData({
          username: "",
          email: "",
          password: "",
          birthDate: "",
          fullName: "",
        });
      } else {
        setServerResponse(data.intMessage || "Error en el registro");
      }
    } catch (err) {
      setServerResponse("Error al conectar con el servidor");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Jorge Alberto Campos Ponce</h1>
      <h2 style={styles.title}>Práctica 1: Validación</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Usuario */}
        <label style={styles.label}>
          Usuario:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input(errors.username)}
            placeholder="Ingresa tu usuario"
          />
        </label>

        {/* Correo */}
        <label style={styles.label}>
          Correo:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input(errors.email)}
            placeholder="Ingresa tu correo"
          />
        </label>

        {/* Contraseña */}
        <label style={styles.label}>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input(errors.password)}
            placeholder="Ingresa tu contraseña"
          />
        </label>

        {/* Fecha de nacimiento */}
        <label style={styles.label}>
          Fecha de nacimiento:
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            style={styles.input(errors.birthDate)}
          />
        </label>

        {/* Nombre completo */}
        <label style={styles.label}>
          Nombre completo:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            style={styles.input(errors.fullName)}
            placeholder="Ingresa tu nombre completo"
          />
        </label>

        {/* Botón de enviar */}
        <button type="submit" disabled={!isValid} style={styles.button(isValid)}>
          Enviar
        </button>
      </form>

      {}
      {serverResponse && <p style={styles.response}>{serverResponse}</p>}
    </div>
  );
}

// Estilos en línea simplificados
const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "20px",
    marginBottom: "15px",
    textAlign: "center",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    marginBottom: "10px",
    color: "#555",
  },
  input: (isError) => ({
    padding: "8px",
    fontSize: "14px",
    border: `1px solid ${isError ? "red" : "#ccc"}`,
    borderRadius: "4px",
    marginBottom: "15px",
    outline: "none",
  }),
  button: (isEnabled) => ({
    padding: "10px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: isEnabled ? "#28a745" : "#ccc",
    border: "none",
    borderRadius: "4px",
    cursor: isEnabled ? "pointer" : "not-allowed",
  }),
  response: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#555",
  },
};

export default Formulario;