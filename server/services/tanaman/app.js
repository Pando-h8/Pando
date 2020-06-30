require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')

const PORT = process.env.PORT || 3002

app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use('/tanaman', routes)

// app.listen(PORT, () => {
//     console.log(`Listening to PORT ${PORT}`)
// })

module.exports = app