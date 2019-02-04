const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const port = process.env.PORT || 8000;
require('./db/db')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// origin: 'https://stupefied-goldstine-407450.netlify.com' || 'http://localhost:3000',

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(cors(corsOptions));

const authController = require("./controllers/auth");
const thanksController = require('./controllers/thanks');
const peopleController = require('./controllers/people');
const dinnerController = require('./controllers/dinner');


app.use("/table", dinnerController);
app.use("/people", peopleController);
app.use("/auth", authController);
app.use('/thanks', thanksController);



app.listen(port,()=>{
  console.log(`listening on port ${port} `);
});

