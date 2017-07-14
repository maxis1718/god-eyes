'use strict';

const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/index.html')
})

var port = process.env.PORT || 9999

var server = app.listen(port,function(){
  console.log('Listening on port', port)
})