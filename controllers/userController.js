var User = require('../models/user');
const path = require('path');
const crypto = require('crypto')

//
exports.index = function (req, res){
    res.render("index.html")
}

// Display list of all Users.
exports.user_list = function(req, res) {
    res.send('NOT IMPLEMENTED: User list');
};

// Display detail page for a specific User.
exports.user_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
};

// Display User create form on GET.
exports.user_create_get = function(req, res) {
    res.render("create_user.html")
    //res.sendFile('/views/create_user.html', {root: path.dirname(__dirname)});
};

// Handle User create on POST.
exports.user_create_post = function(req, res) {
    const md5sum = crypto.createHash('md5');

    let name = req.body.name
    let firstname = req.body.firstname
    let email = req.body.email
    let password = req.body.password
    let confirmpassword = req.body.confirmpassword

    console.log(name + " " + firstname + " " + email + " " + password + " " + confirmpassword)
    
    if (password.match("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,20}$")) {
        console.log("Respect the regex !")
    } else {
        console.log("Does not respect the regex")
    }

    if (password === confirmpassword) {
        console.log("Passwords are the same")
    } else {
        console.log("Passwords are not the same")
    }

    let hashpassword = md5sum.update(password).digest('hex')

    console.log(hashpassword)
    res.render("create_user.html")
};

//
exports.chat = function (req, res){
    res.render("chat.html")
}

//
exports.user_login_get = function(req, res) {
    res.render("login_user.html")
};

exports.user_login_post = function(req, res) {
    console.log(req.body)
    if (req.body.email == "jcvd@mail.fr" && req.body.password == "jeremy")
        console.log(req.body + "Vous avez réussi à vous log");
    else {
        console.log("No")
        res.redirect('./login')
    }
};

// Display User delete form on GET.
exports.user_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete GET');
};

// Handle User delete on POST.
exports.user_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete POST');
};

// Display User update form on GET.
exports.user_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User update GET');
};

// Handle User update on POST.
exports.user_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User update POST');
};