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
let contador = 4;
const express = require('express');
const router = express.Router();

// router.get('/users', (req, res) => {
//     res.json(users);
// });

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
});

function esValido(user) {
    const validarNumero = /^\d+$/;
    const validarEmail = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log(user);
    if (user.nombre.length > 30) {
        return false;
    }
    if (user.apellido.length > 30) {
        return false;
    }
    if (!validarEmail.test(user.email)) {
        return false;
    }
    if (!validarNumero.test(user.telefono)) {
        return false;
    }
    return true;
}

router.post('/users', (req, res) => {
    // toda informacion que recibo desde el usuario llega a req.body
    const newUser = req.body;

    if (!esValido(newUser)) {
        return res.status(400).end('la pifiaste');
    }

    newUser.id = contador++;

    // agrego el usuario al array global (users)
    users.push(newUser);

    // le respondemos con el array de objetos
    res.json(newUser);
});

router.get('/users', function(req, res) {
    let search = req.query.search;

    // chequea si search esta definido y su longitud
    if (search && search.length > 0) {
        search = search.toLowerCase();
        // otra forma posible
        // if (typeof search !== 'undefined' && search.length > 0)
        // creo la lista filtrada
        let usersFiltrados = [];
        for (let i = 0; i < users.length; i++) {
            const nombre = users[i].nombre.toLowerCase();
            const apellido = users[i].apellido.toLowerCase();
            const telefono = users[i].telefono.toLowerCase();
            const email = users[i].email.toLowerCase();
            if (nombre.indexOf(search) >= 0 || apellido.indexOf(search) >= 0 || telefono.indexOf(search) >= 0 || email.indexOf(search) >= 0) {
                usersFiltrados.push(users[i]);
            }
        };
        return res.json(usersFiltrados)
    }
    return res.json(users)
});

router.put("/users/:id", (req, res) => {

    const idUser = parseInt(req.params.id)
    const miUser = users.find(u => u.id === idUser)
    const newUser = req.body;

    if (!esValido(newUser)) {
        return res.status(400).end('la pifiaste');
    }

    miUser.nombre = req.body.nombre || miUser.nombre;
    miUser.apellido = req.body.apellido || miUser.apellido;
    miUser.email = req.body.email || miUser.email;
    miUser.telefono = req.body.telefono || miUser.telefono;
    console.log(miUser);
    res.json(miUser);
})

module.exports = router;