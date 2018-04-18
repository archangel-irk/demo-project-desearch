// const path = require('path');
// const chalk = require('chalk');
// const compression = require('compression');
// const express = require('express');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const passport = require('passport');
// const proxy = require('http-proxy-middleware');
// const request = require('request');
// const packageJson = require('../package.json');
//
//
//
// const SERVER_PORT = 8000;
// const app = express();
//
// app.use(compression());
// app.use(cookieParser());
// // app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, '../build')));
//
// app.get('/*', (req, res) => {
//   res.sendFile('index.html', { root: path.join(__dirname, '../build') });
// });
//
//
// app.listen(SERVER_PORT, () => {
//   console.log(`start webserver: http://localhost:${SERVER_PORT}`);
// });
//
//
// module.exports = app;
