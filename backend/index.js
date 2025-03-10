import express from 'express'
import { config } from 'dotenv'
import dotenv from "dotenv"
import connectDB from './src/configs/db.js'
import cors from "cors"
import quizRouter from './src/routes/quiz.routes.js'
import resRouter from './src/routes/results.routes.js'

//configs
dotenv.config()
connectDB()
const app = express()
const port = process.env.PORT

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


//api's
app.use("/api/quizes", quizRouter)
app.use("/api/results", resRouter)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})