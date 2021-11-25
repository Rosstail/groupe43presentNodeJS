var express = require('express');
var router = express.Router();

// Require controller modules.
var user_controller = require('../controllers/userController');

/// USER ROUTES ///

// GET request for homepage
router.get('/', user_controller.index)

// GET request for creating a User. NOTE This must come before route that displays User (uses id).
router.get('/create', user_controller.user_create_get);

// POST request for creating User.
router.post('/create', user_controller.user_create_post);

// GET request for list of all User.
router.get('/user_list', user_controller.user_list);

// GET request for login.
router.get('/login', user_controller.user_login_get)

// POST request for login
router.post('/login', user_controller.user_login_post)

//
router.get('/chat', user_controller.chat);

// GET request to delete User.
router.get('/account/:id/delete', user_controller.user_delete_get);

// POST request to delete User.
router.post('/account/:id/delete', user_controller.user_delete_post);

// GET request to update User.
router.get('/account/:id/update', user_controller.user_update_get);

// POST request to update User.
router.post('/account/:id/update', user_controller.user_update_post);

// GET request for one User.
router.get('/account/:id', user_controller.user_detail);

module.exports = router;