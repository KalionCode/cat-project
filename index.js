const express = require('express');
const path = require('path')
const app = express()


app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

app.listen(8080, ()=>{
    console.log('server listening on http://localhost:8080');
})