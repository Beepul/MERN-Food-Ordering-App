import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import "dotenv/config";
import mongoose from "mongoose";
import errorHandler from './middlewares/errorHandler'
import morgan from "./middlewares/morgan";
import indexRouter from "./routes";
import corsOptions from "./config/corsOptions";
import { v2 as cloudinary } from 'cloudinary';


mongoose.connect(process.env.MONGODB_URI as string)
    .then((db) => console.log('Connected to database::',db.connection.host))
    .catch((error) => console.log('DB Error::',error.message))


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express()

// app.use(cors(corsOptions))
app.use(cors())

app.use('/api/order/checkout/webhook', express.raw({type: '*/*'}));

app.use(express.json())

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use('/api', indexRouter)


app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
      message: "API is working",
    });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});

app.use(errorHandler)

app.listen(7000, () => {
    console.log('Sever started on localhost:7000')
})