const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const productRoute = require('./routes/product_routes')
const userRoute = require('./routes/user_routes')

//Configs

app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

///Routes
app.use('/usuarios', userRoute)
app.use('/produtos', productRoute)

// Port
app.listen(process.env.PORT || 3000, () => {
    console.log('Server Rodando...')
})