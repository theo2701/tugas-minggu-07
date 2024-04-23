require('dotenv').config();
const http = require('node:http');
const { app } = require('./app');
const server = http.createServer(app);

const { API_PORT } = process.env;
const port = API_PORT;

server.listen(port, () => {
    console.log(`App running on port ${port}`);
});

// const express = require('express');
// const app = express();

// const dbBarang = [
//     {
//         nomor: "BRG-001",
//         nama: "Barang 01"
//     },
//     {
//         nomor: "BRG-002",
//         nama: "Barang 02"
//     },
//     {
//         nomor: "BRG-003",
//         nama: "Barang 03"
//     },
// ]

// app.get('/', (req, res) => {
//     return res.json({ok: 1})
// });

// app.get('/barang', (req, res) => {
//     return res.json({status: 'Endpoint Barang'})
// })

// app.get(
//     '/barang/:id', (req, res) => {
//         const barang = dbBarang.filter((value, index) => req.params.id === value.nomor)
        
//         if (!barang) {
//             return res.status(404).json({detail: "Resource Not Found"})
//         }
        
//         return res.json(barang)
//     });

// app.get('/barang/:id/category/:idCategory', (req, res) => {
//     return res.json({status: `Id Barang ${req.params.id} dan ID Category = ${req.params.idCategory}`})
// })

