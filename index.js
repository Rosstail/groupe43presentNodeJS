import  express  from "express";
import { loadLoginPage, checkUserInfo, changeToNewAccount} from "./Controllers/controllers.js";
import config from "./config.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(config.webPort, () => {
    console.log(`App listening at ${config.webProtocol}://${config.webHost}:${config.webPort}`)
})

app.get('/login', loadLoginPage)
app.post('/login', checkUserInfo)

app.get('/new_account.html', changeToNewAccount)
app.post('/new_account.html', checkUserInfo)