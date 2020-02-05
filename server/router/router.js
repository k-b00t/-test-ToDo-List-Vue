'use strict';

const router = require('express').Router()
const middleware = require('../middlewares/middelewares');


router.post('/login', middleware.login);
router.post('/signup', middleware.signup);
router.delete('/user/:username', middleware.deleteUser);

router.get('/task', middleware.getTask)
router.post('/task', middleware.postTask)
router.put('/task', middleware.putTask)
router.delete('/task/:task', middleware.deleteTask)



module.exports = router;