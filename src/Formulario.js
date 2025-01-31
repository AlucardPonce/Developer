import React, { useState, useEffect } from "react";
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
        isFieldValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value); // Al menos una letra y un número
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
      const response = await fetch("http://localhost:3000/register", {
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
      <h1>Registro</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Campos del formulario */}
        <label style={styles.label}>Usuario:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input(errors.username)}
          />
          {errors.username && <span style={styles.errorText}>Este campo es obligatorio</span>}
        </label>

        <label style={styles.label}>Correo:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input(errors.email)}
          />
          {errors.email && <span style={styles.errorText}>Correo no válido</span>}
        </label>

        <label style={styles.label}>Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input(errors.password)}
          />
          {errors.password && <span style={styles.errorText}>La contraseña debe tener al menos 6 caracteres, una letra y un número</span>}
        </label>

        <label style={styles.label}>Fecha de nacimiento:
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            style={styles.input(errors.birthDate)}
          />
          {errors.birthDate && <span style={styles.errorText}>Fecha no válida</span>}
        </label>

        <label style={styles.label}>Nombre completo:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            style={styles.input(errors.fullName)}
          />
          {errors.fullName && <span style={styles.errorText}>Este campo es obligatorio</span>}
        </label>

        <button type="submit" disabled={!isValid} style={isValid ? styles.submitButton : styles.submitButtonDisabled}>Enviar</button>
      </form>

      {serverResponse && <p style={styles.serverResponse}>{serverResponse}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontSize: "16px",
    textAlign: "left",
    fontWeight: "500",
  },
  input: (isError) => ({
    padding: "12px",
    fontSize: "14px",
    borderRadius: "8px",
    border: `1px solid ${isError ? "red" : "#ccc"}`,
    outline: "none",
    marginTop: "8px",
    transition: "border 0.3s ease-in-out",
  }),
  errorText: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
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
  serverResponse: {
    marginTop: "20px",
    fontSize: "16px",
    color: "#333",
  },
};

export default Formulario;
