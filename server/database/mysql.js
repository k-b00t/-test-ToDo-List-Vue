'use strict';

const fs = require('fs');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { mySqlSecret, jwtSecret } = JSON.parse(fs.readFileSync('./secrets.json'));


const connection = mysql.createConnection({
    host: '10.10.0.61',
    user: 'root',
    password: mySqlSecret,
    database: 'vue_todo'
});

connection.connect((err)=> {
    (err)
        ? console.log(err)
        : console.log('Node2:3606     status:connected');
});


module.exports = {
    login: (user, pass, res)=>{
        connection.query(`SELECT password FROM vue_todo.users WHERE name='${user}'`, (err, result)=>{
            if(err) {
                res.send({
                    login: false,
                    message: 'Internal server error'
                });
            } else if(!result.length) {
                res.send({
                    login: false,
                    message: 'User doesn\'t exist'
                });
            } else {
                bcrypt.compare(pass, result[0].password, (err, success)=>{
                    if(err) {
                        res.send({
                            login: false,
                            message: 'Internal db error'
                        });
                    } else if(!success) {
                        res.send({
                            login: false,
                            message: 'Password incorrect'
                        });
                    } else {
                        res.cookie('auth', jwt.sign({user}, jwtSecret), {
                            expires: new Date(Date.now() + 31104000000)         // 1 year
                        }).send({ login: true });
                    };
                });
            };
        });
    },
    adduser: (user, pass, res)=>{
        pass = bcrypt.hashSync(pass, 11);
        connection.query(`INSERT INTO vue_todo.users (name, password) VALUES ('${user}', '${pass}')`, (err)=>{
            if(err) {
                res.send({
                    signup: false,
                    message: 'Internal db error'
                });
            } else {
                res.send({ signup: true });
            };
        });
    },
    deleteUser: (user, res)=> {
        connection.query(`DELETE FROM vue_todo.users WHERE name='${user}'`, (err)=>{
            if(err) {
                res.send({
                    delete: false,
                    message: 'Internal db error'
                });
            } else {
                res.send({ delete: true });
            };
        });
    },
    getTask: (user, res)=>{
        connection.query(`SELECT tasks.id, tasks.task, tasks.completed, tasks.date, tasks.dateParsed
            FROM vue_todo.tasks LEFT JOIN vue_todo.users ON tasks.id_user=users.id WHERE users.name='${user}'`,
        (err, result)=>{
            if(err) {
                res.send({
                    getTask: false,
                    message: 'Internal sever error'
                });
            } else if(!result.length) {
                res.send({
                    getTask: false,
                    message: 'No tasks found'
                });
            } else {
                res.send({
                    getTask: true,
                    data: result
                })
            }
        });
    },
    postTask: (user, task, res)=> {
        connection.query(`INSERT INTO vue_todo.tasks (id_user, date, dateParsed, completed, task)
            SELECT id, ${task.date}, '${task.dateParsed}', ${task.completed}, '${task.task}' FROM vue_todo.users WHERE name='${user}'`,
            (err, result)=>{
                if(err) {
                    res.send({
                        postTask: false,
                        message: 'Internal db error'
                    })
                } else {
                    res.send({
                        postTask: true,
                        id: result.insertId
                    });
                };
            });
    },
    putTask: (task, res)=> {
        connection.query(`UPDATE vue_todo.tasks SET completed=${task.completed} WHERE task='${task.task}'`, (err, result, fields)=>{
            if(err){
                res.send({
                    putTask: false,
                    message: 'Internal db error'
                });
            } else {
                res.send({ putTask: true });
            };
        });
    },
    deleteTask: (id, res)=>{
        connection.query(`DELETE FROM vue_todo.tasks WHERE id='${id}'`, (err)=>{
            if(err) {
                res.send({
                    deleteTask: false,
                    message: 'Internal db error'
                });
            } else {
                res.send({
                    deleteTask: true,
                });
            };
        });
    },
    test: (res)=>{
        connection.query('SHOW TABLES', (err, results, fileds)=>{
            res.send({
                err,
                results,
                fileds
            });
        });
    }
};
