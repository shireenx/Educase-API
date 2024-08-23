
const express=require('express');
const dotenv=require('dotenv');
const bodyParser=require('body-parser');



dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });
app.use('/api/v1/school',require('./routes/apiroutes.js'))
const port = process.env.port || 5000;


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });