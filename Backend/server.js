require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'luffy',
    password: 'Ponce11(123)',
    database: 'eva_db'
});

// Verificar conexión
db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

//Endpoint para registrar usuario
app.post('/register', (req, res) => {
    const { username, password, email, birthDate, fullName } = req.body;

    if (!username || !password || !email || !birthDate || !fullName) {
        return res.status(400).json({
            statusCode: 400,
            intMessage: 'Bad Request: Todos los campos son obligatorios',
        });
    }

    // Verificar si el usuario ya existe
    db.query(
        'SELECT * FROM usuario WHERE username = ? OR email = ?',
        [username, email],
        (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ statusCode: 500, intMessage: 'Internal Server Error' });
            }

            if (results.length > 0) {
                return res.status(409).json({
                    statusCode: 409,
                    intMessage: 'Conflict: El username o email ya están en uso',
                });
            }

            // Insertar usuario en la base de datos
            db.query(
                'INSERT INTO usuario (username, password, email, birthDate, fullName) VALUES (?, ?, ?, ?, ?)',
                [username, password, email, birthDate, fullName],
                (err, result) => {
                    if (err) {
                        console.error('Error insertando usuario:', err);
                        return res.status(500).json({ statusCode: 500, intMessage: 'Internal Server Error' });
                    }

                    return res.status(201).json({
                        statusCode: 201,
                        intMessage: 'User registered successfully',
                        data: { username, email },
                    });
                }
            );
        }
    );
});

//Endpoint para validar usuario
app.get('/validate', (req, res) => {
    const { username, password } = req.headers;

    if (!username || !password) {
        return res.status(400).json({
            statusCode: 400,
            intMessage: 'Bad Request: Se requieren username y password',
        });
    }

    db.query(
        'SELECT * FROM usuario WHERE username = ? AND password = ?',
        [username, password],
        (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ statusCode: 500, intMessage: 'Internal Server Error' });
            }

            if (results.length === 0) {
                return res.status(401).json({
                    statusCode: 401,
                    intMessage: 'Unauthorized: Credenciales incorrectas',
                });
            }

            const user = results[0];
            return res.status(200).json({
                statusCode: 200,
                intMessage: 'Operation Successful',
                data: {
                    message: 'Autenticación exitosa',
                    user: { username: user.username, email: user.email }
                },
            });
        }
    );
});

// Servidor en escucha
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
