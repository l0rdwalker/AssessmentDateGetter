const express = require('express');
const app = express();
const path = require('path');
const apiRouts = require("./api/api.js");
const cors = require('cors');

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  }));
  
app.use(express.static(path.join(__dirname, "frontend", "simple-app" , "build")));

app.get('/', function(req, res) {
    const interfacePath = path.join(__dirname, "frontend", "simple-app" , "build" , 'index.html');
    res.sendFile(interfacePath);
});

app.use('/api', apiRouts)

const port = process.env.PORT || 3001;
    app.listen(port, function() {
    console.log(`Listening on port ${port}...`);
});