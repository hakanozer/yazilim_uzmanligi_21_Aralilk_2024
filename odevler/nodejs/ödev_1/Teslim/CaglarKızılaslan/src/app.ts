import  express  from "express"
import path from "path"
import { fileURLToPath } from "url"
import bodyParser from "body-parser"

// express web uygulaması olduğunu-portun ne olduğunu belirtir.
const app = express()
const PORT = process.env.PORT || 3000

// ESM ortamında __dirname tanımlama
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ejs Kurulumu
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// body-parser importu- body içindeki verileri getir
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// imports controller eklenmesi
import { userController } from "./controllers/userController.ts"
import { dashboardController } from "./controllers/dashboardController.ts"
import { userRegisterController } from "./controllers/userRegisterController.ts"


// user controller kullanımı
app.use("/", userController);
app.use("/register", userRegisterController)
app.use("/dashboard", dashboardController);



// Program çalışmaya başlar
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})