const mysql = require('mysql2')
const express = require('express')
const bodyParser = require('body-parser')

const users = require('./users')
const todos = require('./todos')

const PORT = 3000

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1122Pedro1122',
  database: 'notes_app',
})

connection.connect((error) => {
  if (error) {
    throw error
  }
// invocando os users
  users(app, connection)
  todos(app, connection)

// declarando as rotas
  app.get('/welcome', (req, res) => {
    const { name } = req.query

    res.send(`Welcome ${name} :)`)
  }) 

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })
})
