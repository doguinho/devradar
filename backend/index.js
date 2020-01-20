const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')
const app = express()

mongoose.connect('mongodb+srv://app:2tifwolAoaLD4ilp@cluster0-ghcty.gcp.mongodb.net/test?retryWrites=true&w=majority',
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:true 
})

app.use(cors({origin:'http://localhost:3000'}))
app.use(express.json())
app.use(routes)
app.listen(3333)
