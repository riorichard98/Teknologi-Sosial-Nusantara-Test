const express = require('express')
const app = express()
const port = 3000
const allRoutes = require('./routes/index.js')
const cors = require('cors')
const { connectMongoDb } = require('./config/mongoDb.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', allRoutes)

connectMongoDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Listening on port ${port}`)
        })
    })
    .catch(()=>{
        console.log('error in connecting to mongoDb');
    })
