//var User = require('../models/user');
const path = require('path');
const crypto = require('crypto')
const config = require('../config');
const mysql = require('mysql')

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
    let firstname = req.body.firstname
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password
    let confirmpassword = req.body.confirmpassword
    let role = req.body.role

    /*if (request(`SELECT \`email\` FROM \`users\` WHERE \`email\` = "${email}"`)) {
        console.log("CLONE")
        return
    }*/

    if (password !== confirmpassword ) {
        return
    }
    if (role == "on") {
        role = 1
    } else {
        role = 0
    }
    let sqlreq = `INSERT INTO \`users\` (\`firstname\`, \`lastname\`, \`email\`, \`password\`, \`level\`)
    VALUES ("${firstname}","${name}","${email}","${password}","${role}")`
    console.log(request(sqlreq))
    res.render('admin/admin_create_user.html')
}

async function request(sqlreq) {
    // Connection BDD
    const con = mysql.createConnection({
        host: config.db_host,
        user: config.db_user,
        password: config.db_password,
        database: config.db_database
    });

    con.connect(function(err) {
        if (err) {
            con.end()
            throw err
        }
    });

    con.query(sqlreq, function (err, result) {
        if (err) {
            con.end()
            throw err
        }
        con.end()
        return result
    })
}