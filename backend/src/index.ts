import express, { Request, Response } from "express";
import cors from 'cors';
import "dotenv/config";
import mongoose from "mongoose";


mongoose.connect(process.env.MONGODB_URI as string)
    .then((db) => console.log('Connected to database',db.connection.host))
    .catch((error) => console.log(error.message))

const app = express()

app.use(express.json())
app.use(cors())


app.get('/test', async (req: Request,res: Response) => {
    res.json({message: 'Hello'})
})

app.listen(7000, () => {
    console.log('Sever started on localhost:7000')
})