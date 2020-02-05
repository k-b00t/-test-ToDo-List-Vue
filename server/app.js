'use strict';

const cors = require('cors');
const helmet = require('helmet');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const https = require('https');
const express = require('express');
const router = require('./router/router');

const app = express();
const api = express();

const corsOpt = {
    credentials: true,
    origin: 'http://localhost:8080'
};

app.use(helmet());
app.use(express.static('public'));

api.use(cors(corsOpt));
api.use(helmet());
api.use(bodyParser.json());
api.use(cookieParser());
api.use(router);


const certificate = {
    key: fs.readFileSync('./certificates/key'),
    cert: fs.readFileSync('/certificates/pem')
  };

const staticServer = https.createServer(certificate, app);
const dinamicServer = https.createServer(certificate, api);


staticServer.listen(443, ()=>{
    console.log('Node0:80       statusconnected')
});

dinamicServer.listen(3001, ()=>{
    console.log('Node1:3001     statusconnected')
});