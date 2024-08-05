const express = require('express');
const router = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Página de login
router.get('/login', (req, res) => {
    res.render('login');
});

// Procesar login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });
        req.session.token = response.data.token;
        res.redirect('/cotizaciones');
    } catch (error) {
       res.redirect('/auth/login');
    }
});

// Página de registro
router.get('/register', (req, res) => {
    res.render('register');
});

// Procesar registro
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        await axios.post('http://localhost:3000/api/auth/register', { username, password });
        res.redirect('/auth/login');
    } catch (error) {
        res.redirect('/auth/register');
    }
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/cotizaciones'); // Redirige a una página de error o similar si ocurre un problema.
        }
        res.redirect('/auth/login'); // Redirige a la página de login después de cerrar sesión.
    });
});


module.exports = router;
