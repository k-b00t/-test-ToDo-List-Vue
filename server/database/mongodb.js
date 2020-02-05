'use strict';

const fs = require('fs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoUrl = JSON.parse(fs.readFileSync('./secrets.json')).mongoUrl;


mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, ()=>{
    console.log('Node2:27017    statusconnected');
});


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    dateParsed: {
        type: String,
        required: true
    }
});


module.exports = {
    userModel: mongoose.model('userModel', userSchema),
    taskModel: mongoose.model('taskModel', taskSchema)
};