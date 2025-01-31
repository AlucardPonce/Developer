import React, { useState, useEffect } from "react";

function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: false,
    password: false,
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
      case "password":
        isFieldValid = value.trim().length > 0;
        break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: !isFieldValid });
  };

  const validateForm = () => {
    const allFilled = Object.values(formData).every((field) => field.trim().length > 0);
    const noErrors = Object.values(errors).every((error) => error === false);
    setIsValid(allFilled && noErrors);
  };

  useEffect(() => {
    validateForm();
  }, [formData, errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/validate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "username": formData.username,
          "password": formData.password,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setServerResponse("Autenticación exitosa!");
      } else {
        setServerResponse(data.intMessage || "Credenciales incorrectas");
      }
    } catch (err) {
      setServerResponse("Error al conectar con el servidor");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Campos de login */}
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
          {errors.username && <span style={styles.errorText}>Este campo es obligatorio</span>}
        </label>

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
          {errors.password && <span style={styles.errorText}>Este campo es obligatorio</span>}
        </label>

        <button type="submit" disabled={!isValid} style={styles.submitButton}>Iniciar sesión</button>
      </form>

      {serverResponse && <p style={styles.serverResponse}>{serverResponse}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "40px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  input: (isError) => ({
    padding: "12px",
    fontSize: "14px",
    borderRadius: "8px",
    border: `1px solid ${isError ? "red" : "#ccc"}`,
    outline: "none",
    transition: "border 0.3s ease-in-out",
    marginTop: "8px",
  }),
  submitButton: {
    padding: "12px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
  serverResponse: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "18px",
  },
};

export default LoginForm;
