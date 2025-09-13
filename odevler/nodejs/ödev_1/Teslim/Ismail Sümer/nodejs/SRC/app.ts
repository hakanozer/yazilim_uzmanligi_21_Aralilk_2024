import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';


const app = express();
const PORT = process.env.PORT || 3000;

//EJS Configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// body-parser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import controllers
import {userController} from './Controles/userControles';


// user controller
app.use('/', userController);

app.listen(PORT, () => {
  console.log(`Server on: http://localhost:${PORT}`);
});