const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app=  express()
const PORT = 5000
app.use(express())
app.use(cors())




app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`)
})