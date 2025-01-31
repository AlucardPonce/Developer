const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [];


app.post('/register', (req, res) => {
    const { username, password, email, birthDate, fullName } = req.body;


    if (!username || !password || !email || !birthDate || !fullName) {
        return res.status(400).json({
            statusCode: 400,
            intMessage: 'Bad Request: Todos los campos son obligatorios',
        });
    }


    const userExists = users.some(user => user.username === username || user.email === email);
    
    if (userExists) {
        return res.status(409).json({
            statusCode: 409,
            intMessage: 'Conflict: El username o email ya están en uso',
        });
    }


    users.push({ username, password, email, birthDate, fullName });

    
    console.log("Usuarios registrados:", users);

    return res.status(201).json({
        statusCode: 201,
        intMessage: 'User registered successfully',
        data: { username, email },
    });
});


app.get('/validate', (req, res) => {
    const { username, password } = req.headers;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        return res.status(200).json({
            statusCode: 200,
            intMessage: 'Operation Successful',
            data: {
                message: 'Autenticación exitosa',
                user: { username: user.username, email: user.email }
            },
        });
    } else {
        return res.status(401).json({
            statusCode: 401,
            intMessage: 'Unauthorized: Credenciales incorrectas',
        });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
