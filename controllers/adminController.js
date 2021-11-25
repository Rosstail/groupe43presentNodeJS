var User = require('../models/user');
const path = require('path');
const crypto = require('crypto')

exports.admin_get = function(req, res) {
    res.render('admin/admin_research_user.html')
}

exports.admin_post = function(req, res) {
    res.render('admin/admin_research_user.html')
}

exports.admin_create_get = function(req, res) {
    res.render('admin/admin_create_user.html')
}

exports.admin_create_post = function(req, res) {
    res.render('admin/admin_create_user.html')
}