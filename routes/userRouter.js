var express = require('express');
var router = express.Router();

// Require controller modules.
var user_controller = require('../controllers/userController');
var admin_controller = require('../controllers/adminController');

/// USER ROUTES ///

// GET request for homepage
router.get('/', user_controller.index)

// GET request for creating a User. NOTE This must come before route that displays User (uses id).
router.get('/create', user_controller.user_create_get);

// POST request for creating User.
router.post('/create', user_controller.user_create_post);

// GET request for login.
router.get('/login', user_controller.user_login_get)

// POST request for login
router.post('/login', user_controller.user_login_post)

// GET request to delete User.
router.get('/account/:id/delete', user_controller.user_delete_get);

// POST request to delete User.
router.post('/account/:id/delete', user_controller.user_delete_post);

// GET request to update User.
router.get('/account/:id/update', user_controller.user_update_get);

// POST request to update User.
router.post('/account/:id/update', user_controller.user_update_post);

//GET request  for admin
router.get('/admin', admin_controller.admin_get)

//GET request  for admin
router.post('/admin', admin_controller.admin_post)

//GET request  for admin
router.get('/admin/create', admin_controller.admin_create_get)

//GET request  for admin
router.post('/admin/create', admin_controller.admin_create_post)

//GET request  for admin
router.get('/admin/edit', admin_controller.admin_edit_get)

//GET request  for admin
router.post('/admin/edit', admin_controller.admin_edit_post)

module.exports = router;