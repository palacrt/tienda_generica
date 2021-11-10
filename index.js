const express = require('express');
const port = 3050;
const app = express();

// Mapear rutas de librerias
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/fontawesome-free', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free'));
app.use('/knockout', express.static(__dirname + '/node_modules/knockout/build/output'));

// Mapear recursos estáticos
app.use('/static', express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Se indica el directorio donde se almacenarán las plantillas
app.set('views', './views');

// Se indica el motor del plantillas a utilizar
app.set('view engine', 'pug');


// Configuración de las peticiones
app.get('/', (req, res) => {
  res.render('index',{titulo: 'Página Principal'});
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/clientes', (req, res) => {
  res.render('clientes',{titulo: 'Clientes'});
});

app.get('/urlparam', (req, res) => {
  res.send(req.query);
});

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));