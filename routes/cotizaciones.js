const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// Middleware para verificar token
router.use((req, res, next) => {
    if (!req.session.token) {
        return res.redirect('/auth/login');
    }
    next();
});

// Página de listar cotizaciones
router.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/api/cotizaciones', {
            headers: { 'Authorization': `Bearer ${req.session.token}` }
        });
        res.render('list', { cotizaciones: response.data });
    } catch (error) {
        res.redirect('/auth/login');
    }
});

// Página de crear cotización
router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const { cliente, descripcion, monto, fecha } = req.body;
    try {
        await axios.post('http://localhost:3000/api/cotizaciones', {
            cliente, descripcion, monto, fecha
        }, {
            headers: { 'Authorization': `Bearer ${req.session.token}` }
        });
        res.redirect('/cotizaciones');
    } catch (error) {
        res.redirect('/cotizaciones/create');
    }
});

// Página de actualizar cotización
router.get('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`http://localhost:3000/api/cotizaciones/${id}`, {
            headers: { 'Authorization': `Bearer ${req.session.token}` }
        });
        res.render('update', { cotizacion: response.data });
    } catch (error) {
        res.redirect('/cotizaciones');
    }
});

router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { cliente, descripcion, monto, fecha } = req.body;
    try {
        await axios.put(`http://localhost:3000/api/cotizaciones/${id}`, {
            cliente, descripcion, monto, fecha
        }, {
            headers: { 'Authorization': `Bearer ${req.session.token}` }
        });
        res.redirect('/cotizaciones');
    } catch (error) {
        res.redirect(`/cotizaciones/update/${id}`);
    }
});

// Eliminar cotización
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await axios.delete(`http://localhost:3000/api/cotizaciones/${id}`, {
            headers: { 'Authorization': `Bearer ${req.session.token}` }
        });
        res.redirect('/cotizaciones');
    } catch (error) {
        res.redirect('/cotizaciones');
    }
});

module.exports = router;
