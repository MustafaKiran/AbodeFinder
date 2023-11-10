const express = require("express")
const app = express()
const port = 8000
const cors = require("cors")
const connections = require("./connections")
const routes = require("./routes/routes")
const controllers = require("./controllers/controllers")

// Middleware
app.use(express.json())
app.use(cors())

// routing

app.use("/",routes)

app.listen(port, ()=>{
    console.log(`App listening at port ${port}`)
})