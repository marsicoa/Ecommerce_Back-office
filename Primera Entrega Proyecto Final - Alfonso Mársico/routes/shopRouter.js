const express = require('express')
const router = express.Router()
const Contenedor = require('../public/javascripts/Contenedor')
const productos = new Contenedor('./public/text/productos.txt')
/* const Carrito = require('../public/javascripts/Carrito')
const carrito = new Carrito('./public/text/carrito.txt') */

/*  ----------------------------------------- */

router.get('/productos', async (req, res) => {
    res.json(await productos.getAll())
})

router.get('/productos/:id', async (req, res) => {
    res.json(await productos.getById(req.params.id))
})

router.post('/productos', async (req, res) => {
    await productos.save(req.body)
    res.redirect('/nuevoProducto')
})

router.put('/productos/:id', async (req, res) => {
    await productos.updateById(req.params.id, req.body)
    res.redirect('/home')
})

router.delete('/productos/:id', async (req, res) => {
    await productos.deleteById(req.params.id)
    res.redirect('/home')
})

/*  ----------------------------------------- */

router.get('/carrito', async (req, res) => {
})

router.post('/carrito', async (req, res) => {
    //post carrito
})

router.put('/carrito', async (req, res) => {
    //update carrito
})

router.delete('/carrito', async (req, res) => {
    //delete carrito
})

module.exports = router