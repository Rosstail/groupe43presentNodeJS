//var User = require('../models/user');
const path = require('path');
const crypto = require('crypto')
const config = require('../config');
const mysql = require('mysql');
const db_handler = require('../db_handler');

const connexion = db_handler.connexion


exports.admin_get = function(req, res, next) {
    res.render('admin/admin_crud.html')
    next()
}

exports.admin_post = function(req, res, next) {
    next()
}

exports.admin_create_get = function(req, res, next) {
    res.render('admin/admin_create_user.html')
    next()
}

exports.admin_create_post = function(req, res, next) {
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
                        res.render('./admin/create')
                    }               
                    else{
                        throw err
                    }   

                }else{
                    console.log("User created : ");
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
    next()
}

exports.admin_edit_get = function(req, res, next) {
    console.log("ID GET = " + req.query.id)
    res.render('admin/admin_edit_user.html')
    //get_user_data_from_email(res, req.body.email, next)
}

exports.admin_edit_post = function(req, res, next) {
    //res.render('admin/admin_edit_user.html?')
    get_user_data_from_email(res, req.body.email, next)
}

function hash(message) {
    return crypto.createHash("sha256").update(message).digest("hex")
}

exports.is_user_admin = function(res, id, next) {
    connexion.query("SELECT level FROM itescia.users WHERE id = '" + id + "'", function (err, result) {
        if (err) throw err;
        if(1 != result[0].level) {
            console.log('Not admin')
            res.redirect('./')
        } else {
            next()
        }
    });
}

function get_user_data_from_email(res, email, next) {
    connexion.query("SELECT id, lastname, firstname, email, level FROM itescia.users WHERE email = '" + email + "'", function (err, result) {
        if (err) throw err;
        let data = {
            id: result[0].id,
            name: result[0].lastname,
            firstname: result[0].firstname,
            email: result[0].email,
            level: result[0].level,
        }
        //res.render('admin/admin_edit_user.html')
        res.redirect('./edit/?id=' + data.id)
        next()
    });
}