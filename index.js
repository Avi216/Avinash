const express = require('express');
const bodyparser = require('body-parser');
const _ = require('lodash');
const http = require('http');
const route = require('./Routes/route');
const connection = require('./models/connection');

const app = express();
const server = http.createServer(app);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:true
}));

app.use("/api",route);
app.get("/", (req, res) =>{
    res.send('welcome');
});


server.listen(8080, ()=>{
console.log(`app is running on port 8080`);
});