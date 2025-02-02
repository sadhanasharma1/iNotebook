const express = require('express')
var cors = require('cors')
const connectToMongo = require('./db');

connectToMongo();

const app = express()
const port = 5000

 
app.use(cors())

app.use(express.json())
//we can write all routes here as well but it will be messy so better create sseperate file for routes and connect iit here.

//Available routes:
//.use can be used with one parameter as well i.e just by giving file location:
//here par1 : route path & par2: file name to be used
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
