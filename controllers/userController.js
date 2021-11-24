var User = require('../models/user');
const path = require('path');

exports.checkUserInfo = function (req, res) {
    if (req.body.username == "jcvd" && req.body.password == "jeremy")
        console.log(req.body + "Vous avez réussi à vous log");
    else
        res.redirect('./login')
}

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

    let test = "ABCdef#1234"
    if (test.match("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$")) {
        console.log("YEEES !")
    } else {
        console.log("NOOOOOO")
    }
    //res.sendFile('/views/create_user.html', {root: path.dirname(__dirname)});
};

// Handle User create on POST.
exports.user_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User create POST');
};

//
exports.user_login_get = function(req, res) {
    res.render("login_user.html")
};

exports.user_login_post = function(req, res) {
    //console.log(req)
    //requestdb()
    //console.log(req.body.id)
    res.send('NOT IMPLEMENTED: User login POST');
};

async function requestdb() {
  console.log("TEST")
}

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