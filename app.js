const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const apiRoute = require('./routes/api')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api', apiRoute)

app.listen('5000')