const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require('dotenv').config()


const users = require('./users/router')
//const blogs = require('./blogs/router')

app.use('/user', users)

app.listen(process.env.PORT, () => console.log(`App running at http://localhost:${process.env.PORT}`))