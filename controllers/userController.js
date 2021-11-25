//var User = require('../models/user');
const path = require('path');
const crypto = require('crypto')
let http = require('../http').Server(exports);
let io = require('socket.io')(http);

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
        return
    }

    if (password === confirmpassword) {
        console.log("Passwords are the same")
    } else {
        console.log("Passwords are not the same")
        return
    }

    
    let hashpassword = test(password)
    /*let sql = `INSERT INTO users (\`firstname\`, \`lastname\`, \`email\`, \`password\`)
    VALUES (${firstname},${name},${email},${hashpassword})`

    console.log(sql)

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result : " + result)
    })*/

    console.log("MDP Hash " + hashpassword)

    res.render("create_user.html")
};

function test(message) {
    return crypto.createHash("sha256").update(message).digest("hex")
}

//
exports.chat_get = function (req, res){
    res.render("chat.html")
}

exports.chat_post = function (req, res){
    io.on('connection', function (socket) {
        /**
         * Log de connexion et de déconnexion des utilisateurs
         */
        console.log('a user connected');
        socket.on('disconnect', function () {
            console.log('user disconected');
        });

        /**
         * Réception de l'événement 'chat-message' et réémission vers tous les utilisateurs
         */
        socket.on('chatgeneral-mesgeneral', function (message) {
            console.log('message : ' + message.text);
            io.emit('chatgeneral-mesgeneral', message);
        });
    });
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