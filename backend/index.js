const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require("dotenv").config()


// import routes
const authHandler = require('./routes/auth')
const postHandler = require('./routes/post')

const app = express();


const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('db connected'))
    .catch((err) => console.log(err.message))

app.use('/', authHandler)
app.use('/', postHandler)





app.listen(PORT, () => console.log(`server is running on port ${PORT}`))