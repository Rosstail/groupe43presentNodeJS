const config = {}

import dotenv from 'dotenv'
//const env = require('dotenv').config({path: '.env'})

config.webProtocol = "http"
config.webHost = "localhost"
config.webPort = 8080

config.db_address = process.env.MONGO_DB

export default config;