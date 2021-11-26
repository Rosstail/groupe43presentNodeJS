//var User = require('../models/user');
const path = require('path');
const crypto = require('crypto')
const config = require('../config');
const mysql = require('mysql');
const db_handler = require('../db_handler');

const connexion = db_handler.connexion


exports.admin_get = function(req, res) {
    is_user_admin(res, 12, 'admin/admin_crud.html')
}

exports.admin_post = function(req, res) {
    is_user_admin(res, 12, 'admin/admin_crud.html')
}

exports.admin_create_get = function(req, res) {
    is_user_admin(res, 12, 'admin/admin_create_user.html')
}

exports.admin_create_post = function(req, res) {
    is_user_admin(res, 12, 'admin/admin_create_user.html')
    let firstname = req.body.firstname
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password
    let confirmpassword = req.body.confirmpassword
    let role = req.body.role

    if (role == "on") {
        role = 1
    } else {
        role = 0
    }

    console.log(name + " " + firstname + " " + email + " " + password + " " + confirmpassword)

    if (password == confirmpassword) {
        if (password.match("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,20}$")) {            
            let hashpassword = hash(password)
            connexion.query(`INSERT INTO \`users\` (\`firstname\`, \`lastname\`, \`email\`, \`password\`, \`level\`)
            VALUES ("${firstname}","${name}","${email}","${hashpassword}","${role}")`, function(err, result){
                if(err){
                    if (err.code == "ER_DUP_ENTRY"){                       
                        console.log('AJOUT ERREUR EMAIL ALREADY EXIT')
                        res.redirect('./create')
                    }               
                    else{
                        throw err
                    }   

                }else{
                    console.log("User created : ");
                    res.redirect('./login')
                }                
                    
            })
            console.log("The password respect the regex !")
        } 
        else {
            console.log("Does not respect the regex")
        }
        console.log("Passwords are the same")
    } 
    else {
        console.log("Passwords are not the same")
    }
}

exports.admin_edit_get = function(req, res) {
    is_user_admin(res, 12, 'admin/admin_edit_user.html')
}

exports.admin_edit_post = function(req, res) {
    is_user_admin(res, 12, 'admin/admin_edit_user.html')
}

function hash(message) {
    return crypto.createHash("sha256").update(message).digest("hex")
}

function is_user_admin(res, id, link) {
    connexion.query("SELECT level FROM itescia.users WHERE ID = '" + id + "'", function (err, result) {
        if (err) throw err;
        if(1 != result[0].level){
            console.log('Not admin')
            res.redirect('./')
        } else {
            console.log("Admin access granted.")
            //res.redirect(link)
            res.render(link)
        }
    });
}