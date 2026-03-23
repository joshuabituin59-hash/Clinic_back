
//API FRAMEWORD
const express = require('express');
//CROSS ORIGIN RESOURCE SHARING
const cors = require('cors');
//ENVIRONMENT VARIABLES
require ('dotenv').config();
//DATABASE CONNECTION
const db=require('./config/db.js');
//ROUTES
const routes = require('./routes/index.js');

const allowedOrigins = [
  'http://127.0.0.1:5500'
]; 

const corsOptions = {
  origin: function (origin, callback) {
    
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

//UTILIZATION OF EXPRESS
const app = express();

//MOMENT
const moment = require('moment');
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')} ${req.originalUrl} - ${moment().format()}` );
    next();
}
app.use(logger);



app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true})) //this will allow to read the url body tags

//use routes
app.use('/api', routes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
