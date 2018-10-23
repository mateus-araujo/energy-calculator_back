const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const ip = require('ip')

const app = express()
const routes = require('./routes')

require('dotenv').config()
const port = process.env.PORT || 3333
const environment = process.env.NODE_ENV || 'development'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.options('*', cors())
app.use(cors())
// app.use(routes)

require('./routes/index')(app)

app.listen(port, () => {
  console.log("Local address: http://localhost:" + port + "\n"
    + "Network address: http://" + ip.address() + ":" + port + "\n"
    + "Environment: " + environment)

})
