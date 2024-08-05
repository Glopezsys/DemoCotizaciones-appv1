const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const cotizacionesRoutes = require('./routes/cotizaciones');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/auth', authRoutes);
app.use('/cotizaciones', cotizacionesRoutes);

// Página de inicio
app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
