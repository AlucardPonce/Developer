import React, { useState } from "react";
import LoginForm from "./Login";
import Formulario from "./Formulario"; 

function App() {
  const [isLogin, setIsLogin] = useState(true); 

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div style={styles.container}>
      <h1>Jorge Alberto Campos Ponce</h1>
      <h2 style={styles.title}>Práctica 5: Validación Front + Back</h2>

      {isLogin ? (
        <div>
          <h3>Login</h3>
          <LoginForm />
          <p>
            ¿No tienes cuenta?{" "}
            <span style={styles.link} onClick={toggleForm}>
              Regístrate aquí
            </span>
          </p>
        </div>
      ) : (
        <div>
          <h3>Registro</h3>
          <Formulario />
          <p>
            ¿Ya tienes cuenta?{" "}
            <span style={styles.link} onClick={toggleForm}>
              Inicia sesión aquí
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "20px",
    marginBottom: "15px",
    textAlign: "center",
    color: "#333",
  },
  link: {
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default App;
