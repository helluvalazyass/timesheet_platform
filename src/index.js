// const http = require('http')
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mongooose = require('mongoose')

const fs = require('fs')
const rfs = require('rotating-file-stream')

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const router = express.Router()

const userRouter = require('./routers/user_router')

const port = process.env.PORT || 3000
const logDirectory = path.join(__dirname, 'log')

// const app = http.createServer((req, res) => {
//   res.end("hello world")
// })

mongooose.connect('mongodb://localhost:27017/timesheet-db', { useNewUrlParser: true, useCreateIndex: true }, (error) => {
  if(error) {
    console.log(error)
  }
})

// MongoClient.connect('mongodb://localhost:27017/',
// {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }, (error, client) => {
//   if(error) {
//     return console.log(error)
//   }
//   const db = client.db('timesheet-test')
// //   db.collection('member').insertOne({
// //     email: 'monuuyad@gmail.com',
// //     password: '123456'
// //   }, (error, result) => {
// //     if(error) {
// //       return console.log(error)
// //     }
// //     console.log(result.insertedCount)
// //   })

//   // db.collection('member').find({}).toArray((error, result) => {
//   //   console.log(result)
//   // })
// })

const app = express()

// app.get('/', (req, res, next) => {
//   res.send('Hello World!')
// })

// app.get('/wow', (req, res, next) => {
//   res.send('wow page')
// })


app.use(express.json())

// const logWriteStream = fs.createWriteStream(path.join(__dirname, 'dev.log'), { flags: 'a' })

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const logWriteStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory
})

// app.use(morgan(':method :url  :status :response-time ms - :res[content-length]', { stream: logWriteStream }))

app.use(morgan('combined', { stream: logWriteStream }))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', userRouter)





app.use(function(req, res) {
  res.status(404).send("sorry ! page not found")
})

app.listen(port, () => {
  console.log(`server running at port: ${port}`)
})