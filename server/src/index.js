const express  = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const api = require('./api');

const app = express();
app.use(cors());

const port = process.env.PORT || 5002;

app.get('/', (req, res) =>{
    res.json({
        message: 'Welcome to Mwaka Moon'
    });
});

app.use(bodyParser.json());
app.use('/api', api);


app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`)
});

// in case i forget db pw is iloveboobs69