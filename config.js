const config = {}
const env = require('dotenv').config({path: '.env'})

config.webProtocol = "http"
config.webHost = "localhost"
config.webPort = 3000

config.address_db = process.env.SQL_DB
config.username_db = process.env.USERNAME_DB
config.password_db = process.env.PSWRD_DB

module.exports = config