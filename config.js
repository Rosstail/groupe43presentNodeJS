const config = {}
const env = require('dotenv').config({path: '.env'})

config.webProtocol = "http"
config.webHost = "localhost"
config.webPort = 3000

config.db_address = process.env.MONGO_DB

module.exports = config;