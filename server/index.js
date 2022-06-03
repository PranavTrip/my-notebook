const express=require('express');
const connectToMongo = require('./db');


connectToMongo();
const PORT=3001;
const app=express();

app.get('/',(req,res)=>{
    res.send('Hello World !');
});

app.listen(PORT,()=>{
    console.log(`App is listening at http://localhost:${PORT}`);
});
