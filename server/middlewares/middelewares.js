'use strict';

const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const model = require('../database/mongodb');

const jwtSecret = JSON.parse(fs.readFileSync('./secrets.json')).jwt

module.exports = {
    login: (req, res)=> {
        const username = req.body.username;

        model.userModel.findOne({username}, (err, doc)=>{
            if(err){
                res.send({
                    login: false,
                    message: 'Internal server error'
                });
            } else if(!doc) {
                res.send({
                    login: false,
                    message: 'This user doesn\'t exist'
                });
            } else {
                bcrypt.compare(req.body.password, doc.password, (err, data)=>{
                    if(err) {
                        res.send({
                            login: false,
                            message: 'Internal server error'
                        });
                    } else if(!data) {
                        res.send({
                            login: false,
                            message: 'Password Incorrect'
                        })
                    } else {
                        res.cookie('auth', jwt.sign({username}, jwtSecret), {
                            expires: new Date(Date.now() + 31104000000)
                        }).send({ login: true });
                    }
                })
            };
        });
    },
    signup: (req, res)=> {
        const username = req.body.username;
        const password = req.body.password;
        if(username && password) {
            jwt.verify(req.cookies.auth, jwtSecret, (err, success)=>{
                if(err) {
                    res.send({
                        signup: false,
                        message: 'Internal server error'
                    })
                } else if(!success) {
                    res.send({
                        signup: false,
                        message: 'Unauthorized'
                    })
                } else {
                    new model.userModel({
                        username,
                        password: bcrypt.hashSync(password, 11)
                    }).save((err)=>{
                        if(err) {
                            res.send({
                                signup: false,
                                message: 'Internal server error'
                            });
                        } else {
                            res.send({ signup: true });
                        };
                    });
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
                        message: 'Internal server error'
                    });
                } else if(!success) {
                    res.send({
                        delete: false,
                        message: 'Unauthorized'
                    });
                } else {
                    model.userModel.findOneAndDelete({username}, (err)=>{
                        if(err) {
                            res.send({
                                delete: false,
                                message: 'Internal server error'
                            });
                        } else {
                            res.send({ delete: true });
                        };
                    });
                };
            });
        };
    },
    getTask: (req, res)=> {
        jwt.verify(req.cookies.auth, jwtSecret, (err, success)=>{
            if(err) {
                res.send({
                    getTask: false,
                    message: 'Internal sever error'
                });
            } else if(!success) {
                res.send({
                    getTask: false,
                    message: 'Unauthorized'
                });
            } else {
                model.taskModel.find({}, (err, doc)=>{
                    if(err) {
                        res.send({
                            getTask: false,
                            message: 'Internal sever error'
                        });

                    } else if(!doc) {
                        res.send({
                            getTask: false,
                            message: 'Not tasks found'
                        });

                    } else {
                        res.send({
                            getTask: true,
                            data: doc
                        });
                    };
                });
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
                model.taskModel.findOne({task: req.body.task}, (err, doc)=>{
                    if(err) {
                        res.send({
                            newTask: false,
                            message: 'Internal sever error'
                        });
                    } else if(doc) {
                        res.send({
                            newTask: false,
                            message: 'This task exists'
                        });
                    } else {
                        new model.taskModel(req.body).save((err, doc)=>{
                            if(err) {
                                res.send({
                                    newTask: false,
                                    message: 'Internal sever error'
                                });  
                            } else {
                                res.send({
                                    newTask: true,
                                    document: doc
                                });
                            };
                        });
                    };
                });
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
                model.taskModel.findByIdAndUpdate(req.body._id, {
                    completed: req.body.completed
                },{ new: true }, (err, doc)=>{
                    if(err){
                        res.send({
                            putTask: false,
                            message: 'Internal server error'
                        });
                    } else if(!doc) {
                        res.send({
                            putTask: false,
                            message: 'Internal server error'
                        });
                    } else {
                        res.send({ putTask: true });
                    };
                });
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
                model.taskModel.findOneAndDelete({task:req.params.task}, (err)=>{
                    if(err) {
                        res.send({
                            deleteTask: false,
                            message: 'Internal sever error'
                        });
                    } else {
                        res.send({
                            deleteTask: true,
                        });
                    }
                });
            };
        });
    }
};