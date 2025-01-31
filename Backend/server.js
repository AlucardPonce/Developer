const express = require('express');
const app = express();
const port = 3000;

// Middleware para procesar datos JSON en el cuerpo de las solicitudes
app.use(express.json());

// Base de datos simulada (en memoria)
let users = [];

// Endpoint para el registro de usuarios
app.post('/registro', (req, res) => {
    const { username, password, email, birthDate, fullName } = req.body;

    // Validación: Verificar que todos los campos estén presentes
    if (!username || !password || !email || !birthDate || !fullName) {
        return res.status(400).json({
            statusCode: 400,
            intMessage: 'Favor de llenar todos los campos',
        });
    }

    // Validación: Verificar si el usuario o correo ya existen
    const userExists = users.some(user => user.username === username || user.email === email);
    if (userExists) {
        return res.status(409).json({
            statusCode: 409,
            intMessage: 'Ya existe el usuario o email',
        });
    }

    // Agregar el usuario a la base de datos simulada
    users.push({ username, password, email, birthDate, fullName });

    return res.status(201).json({
        statusCode: 201,
        intMessage: 'Usuario registrado exitosamente',
        data: { username, email },
    });
});

// Endpoint para validar credenciales de usuarios
app.get('/validate', (req, res) => {
    const { username, password } = req.headers;

    // Validar credenciales en la base de datos simulada
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        return res.status(200).json({
            statusCode: 200,
            intMessage: 'Operación exitosa',
            data: {
                message: 'Autenticación exitosa',
                user: { username: user.username, email: user.email },
            },
        });
    } else {
        return res.status(401).json({
            statusCode: 401,
            intMessage: 'Unauthorized: Credenciales incorrectas',
        });
    }
});

// Middleware para manejar rutas no definidas
app.use((req, res) => {
    res.status(404).json({
        statusCode: 404,
        intMessage: 'Ruta no encontrada',
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});