import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './router.js'
import connection from './connection.js'

dotenv.config()
console.log(process.env.MONGO_URL);
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api',router)

app.listen(process.env.PORT || 2000,()=>{
    console.log("server running");   
})
connection()