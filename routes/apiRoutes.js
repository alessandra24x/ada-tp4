const users = [{
        id: 1,
        nombre: "Ada",
        apellido: "Lovelace",
        telefono: "1234567890",
        email: "contacto@gmail.com"
    },
    {
        id: 2,
        nombre: "Grace",
        apellido: "Hopper",
        telefono: "087654321",
        email: "contacto@hotmail.com"
    },
    {
        id: 3,
        nombre: "Barbara",
        apellido: "Gomez",
        telefono: "1524749878",
        email: "contacto@gmail.com"
    }
];
const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
    res.json(users);
});

router.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users.splice(users.findIndex(u => u.id === userId), 1);
    res.json(users);
});

router.get("/users/:id", (req, res) => {
    // 0) Recupero el parametro id
    const userId = parseInt(req.params.id)
        // 1) findIndex
        // const userIndex = users.findIndex(user => user.id === userId)
        // 2) Devuelvo la posicion del array
        // res.json(users[userIndex])

    // 2) find (!!)
    const user = users.find(user => user.id === userId)
    res.json(user)
})


module.exports = router;