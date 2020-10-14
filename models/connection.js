const mongoose = require('mongoose');

const uri ="mongodb+srv://Avinash216:Avinash216@owncluster.feit7.mongodb.net/mydata?retryWrites=true&w=majority";

let connection = mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true},(err) =>{
      if(!err) {
          console.log('connection was established');
      } else {
          console.log('connection failed');
      }
    } 
);
module.exports = connection;
