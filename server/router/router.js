'use strict';

const router = require('express').Router()
const middleware = require('../middlewares/middelewares');


router.post('/login', middleware.login);
router.post('/signup', middleware.signup);
router.delete('/user/:username', middleware.deleteUser);

router.get('/tasks', middleware.getTask)
router.post('/task', middleware.postTask)
router.put('/task', middleware.putTask)
router.delete('/task/:task', middleware.deleteTask)

router.get('/testdb', middleware.testDB);

module.exports = router;