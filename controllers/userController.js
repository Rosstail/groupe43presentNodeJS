const path = require('path');
const crypto = require('crypto')
let http = require('http').Server(exports);
let io = require('socket.io')(http);

const users = require('../models/user');
const db_handler = require('../db_handler')
const mysql = require('mysql');
const app = require('../app')
const config = require('../config');

const connexion = db_handler.connexion


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

    //console.log(name + " " + firstname + " " + email + " " + password + " " + confirmpassword)

    if (password == confirmpassword) {
        if (password.match("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,20}$")) {            
            let hashpassword = hash(password)
            connexion.query("INSERT INTO itescia.users (firstname, lastname, email, password) VALUES ('"+ firstname +"', '"+ name +"', '"+ email +"', '"+ hashpassword +"')", function(err, result){
                if(err){
                    if (err.code == "ER_DUP_ENTRY"){                       
                        console.log('AJOUT ERREUR EMAIL ALREADY EXIT')
                        res.redirect('./create')
                    }               
                    else{
                        throw err
                    }   

                }else{
                    console.log("User created");
                    res.redirect('./login')
                }                
                    
            })
            console.log("The passwrd respect the regex !")
        } 
        else
            console.log("Does not respect the regex")
        console.log("Passwords are the same")
    } 
    else
        console.log("Passwords are not the same")
};

function hash(message) {
    return crypto.createHash("sha256").update(message).digest("hex")
}

//
exports.chat_get = function (req, res){
    if(req.session.token !== undefined){
        connexion.query("SELECT token FROM itescia.users WHERE token = '"+ req.session.token +"'", function(err, result) {
            if(err) throw err
            if(result !== undefined){
                if(result[0].token != ""){
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
                else{
                    res.redirect('./login')
                }
            }
        })
    }
    else
        res.redirect('./login')
}

exports.chat_post = function (req, res){
    res.render('bonjour')
}

//
exports.user_login_get = function(req, res) {
    res.render("login_user.html")
};

exports.user_login_post = function(req, res) {
    let email = req.body.email
    let password = req.body.password
      
    connexion.query("SELECT email, password FROM itescia.users WHERE email = '" + email + "'", function (err, result) {
        if (err) throw err;
        if(result !== null){
            console.log('ok')
            if(hash(password) == result[0].password){
                console.log('user logged')
    
                const token = crypto.randomBytes(8).toString('hex')

                connexion.query("UPDATE itescia.users SET token = '"+ token +"' WHERE email = '" + email + "'", function (err, result){
                    if(err) throw err
                }) 
                
                req.session.token = token
                res.redirect('./')
            }else{
                console.log('error')
                res.redirect('./login')
            }
        }
        else{
            console.log('email non trouvé')
            res.redirect('./login')
        }
    });
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