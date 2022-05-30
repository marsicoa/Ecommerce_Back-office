const express = require('express')
const router = express.Router()
const Contenedor = require('../public/javascripts/Contenedor')
const productos = new Contenedor('./public/text/productos.txt')

let session = {}

router.get('/', async (req, res) => {
    res.render('pages/login')
})

router.post('/home', async (req, res) => {
    if(req.body.user == 'admin' && req.body.password == 123){
        session = {usr:req.body.user, pwd: req.body.password, role: req.body.user}
        console.log(session)
        res.render('pages/indexAdmin', {productos: await productos.getAll()})
    }else{
        if(req.body.user == 'test' && req.body.password == 'test'){
            session = {usr:req.body.user, pwd: req.body.password, role: 'user'}
            console.log(session)
            res.render('pages/indexUser', {productos: await productos.getAll()})
        }else{
            res.redirect('/')
        }
    }
})

router.get('/home', async (req, res) => {
    if(session){
        session.role == 'admin' ? res.render('pages/indexAdmin', {productos: await productos.getAll()}) : res.render('pages/indexUser', {productos: await productos.getAll()})
    }else{
        res.redirect('/')
    }
})

router.get('/nuevoProducto', (req, res) => {
    res.render('pages/nuevoProducto')
})

module.exports = router