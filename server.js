'use strict';

const express = require('express')
const app = express()
const message = require('./data/message.json')
const lesson = require('./data/lesson.json')

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.get('/', (req,res) => {
  res.render('pages/index', {
    firebaseKey: process.env.FIREBASE_KEY || '',
    message, lesson
  })
})

var port = process.env.PORT || 9999

var server = app.listen(port,function(){
  console.log('Listening on port', port)
})