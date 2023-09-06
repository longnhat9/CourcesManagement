const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const db = require('./config/db');
db.connect();

const route = require('./routes/index');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
  extended: true
})); // đây là mindleware để xử lý form data thông qua phương thức POST
app.use(express.json());

// http logger
// app.use(morgan('combined'));

//template engine
app.engine('hbs', handlebars.engine({
  defaultLayout: 'main',
  extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});