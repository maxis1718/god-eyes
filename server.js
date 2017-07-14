'use strict';

const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.get('/', (req,res) => {
  res.render('pages/index', {
    firebaseKey: process.env.FIREBASE_KEY || ''
  })
})

var port = process.env.PORT || 9999

var server = app.listen(port,function(){
  console.log('Listening on port', port)
})