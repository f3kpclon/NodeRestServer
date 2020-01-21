const express = require('express');
const app = express();

app.use(require('./login'));
app.use(require('./usuario'));
app.use(require('./categorias'))
app.use(require('./productos'));
app.use(require('./uploads'))
app.use(require('./images'));


module.exports = app;