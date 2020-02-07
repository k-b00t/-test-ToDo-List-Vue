'use strict';

const fs = require('fs');
const jwt = require('jsonwebtoken');
const mySql = require('../database/mysql');

const jwtSecret = JSON.parse(fs.readFileSync('./secrets.json')).jwtSecret

/*            VALID TOKEN FOR TEST
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE1ODEwMDAyMTJ9.uEdRYVkO8D-32PFimEaEcGIJy9DCBCc4gubLNSygAqs
*/

module.exports = {
    login: (req, res)=> {
        const username = req.body.username;
        const password = req.body.password;
        mySql.login(username, password, res);
    },
    signup: (req, res)=> {
        const username = req.body.username;
        const password = req.body.password;

        if(username && password) {
            jwt.verify(req.cookies.auth, jwtSecret, (err, success)=>{
                if(err) {
                    res.send({
                        signup: false,
                        message: 'Unauthorized'
                    })
                } else if(!success) {
                    res.send({
                        signup: false,
                        message: 'Unauthorized'
                    })
                } else {
                    mySql.adduser(username, password, res);
                };
            });
        };
    },
    deleteUser: (req, res)=> {
        const username = req.params.username;

        if(username) {
            jwt.verify(req.cookies.auth, jwtSecret, (err, success)=>{
                if(err) {
                    res.send({
                        delete: false,
                        message: 'Unauthorized'
                    });
                } else if(!success) {
                    res.send({
                        delete: false,
                        message: 'Unauthorized'
                    });
                } else {
                    mySql.deleteUser(username, res);
                };
            });
        };
    },
    getTask: (req, res)=> {
        jwt.verify(req.cookies.auth, jwtSecret, (err, success)=>{
            if(err) {
                res.send({
                    getTask: false,
                    message: 'Unauthorized'
                });
            } else if(!success) {
                res.send({
                    getTask: false,
                    message: 'Unauthorized'
                });
            } else {
                mySql.getTask(success.user, res);
            };
        });
    },
    postTask: (req, res)=> {
        jwt.verify(req.cookies.auth, jwtSecret, (err, success)=>{
            if(err) {
                res.send({
                    newTask: false,
                    message: 'Internal sever error'
                });
            } else if(!success) {
                res.send({
                    newTask: false,
                    message: 'Unauthorized'
                });
            } else {
                mySql.postTask(success.user, req.body, res);
            };
        });
    },
    putTask: (req, res)=> {
        jwt.verify(req.cookies.auth, jwtSecret, (err, success)=>{
            if(err) {
                res.send({
                    putTask: false,
                    message: 'Internal server error'
                });
            } else if(!success) {
                res.send({
                    putTask: false,
                    message: 'Unauthorized'
                });
            } else {
                mySql.putTask(req.body, res);
            };
        });
    },
    deleteTask: (req, res)=> {
        jwt.verify(req.cookies.auth, jwtSecret, (err, success)=>{
            if(err) {
                res.send({
                    deleteTask: false,
                    message: 'Internal sever error'
                });
            } else if(!success) {
                res.send({
                    deleteTask: false,
                    message: 'Unauthorized'
                });  
            } else {
                mySql.deleteTask(req.params.task, res);
            };
        });
    },
    testDB: (req, res)=> {
        mySql.test(res);
    }
};