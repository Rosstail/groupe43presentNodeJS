const path = require('path');
const crypto = require('crypto')

const users = require('../models/user');
const db_handler = require('../db_handler')
const mysql = require('mysql');
const app = require('../app')
const config = require('../config');

const connexion = db_handler.connexion

exports.index = function (req, res){
    res.send('NOT IMPLEMENTED: User list');
}

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

exports.user_login_get = function(req, res) {
    res.render("login_user.html")
};

exports.user_login_post = function(req, res) {
    let email = req.body.email
    let password = req.body.password

    connexion.query("SELECT email, password FROM itescia.users WHERE email = '" + email + "'", function (err, result) {
        if (err) throw err;
        console.log(result);
        if(result[0] !== undefined){
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