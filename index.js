const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require('dotenv').config()

app.get('/', (req, res) => {
    res.send('<h1>Api Test<h1>')
})

app.listen(5000, () => {
    console.log(`App listening at 5000`)
})

const port = process.env.PORT || 6000

const users = require('./users/router')
const blogs = require('./blogs/router')


app.use('/user', users)


app.listen(port, () => console.log(`App running at http://localhost:${port}`))