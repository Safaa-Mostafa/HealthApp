require('dotenv').config()
require('../app/database/connection')
const cors = require('cors')
const express = require("express")
const app=express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const doctorRoutes = require("../routes/doctor.api")
app.use("/doctor",doctorRoutes)
const specializeRoutes = require("../routes/specialize.api")
app.use("/specialize",specializeRoutes)

const slotRoutes = require("../routes/slot.api")
app.use("/slot",slotRoutes)


const userRoutes = require("../routes/user.api")
app.use("/user",userRoutes)



module.exports =app