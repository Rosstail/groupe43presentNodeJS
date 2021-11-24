import path from "path";

const __dirname = path.resolve()

export const checkUserInfo = function (req, res) {
    if (req.body.username == "jcvd" && req.body.password == "jeremy")
        console.log(req.body + "Vous avez réussi à vous log");
    else
        res.redirect('./login')
}

export const changeToNewAccount = function (req, res) {
    res.sendFile('/public/new_account.html', {root: __dirname})
}

export const showUserInfo = function (req, res) {
    res.send('User infos : check console')
}

export const loadLoginPage = function (req, res) {
    res.sendFile('/public/login.html', {root: __dirname})
}