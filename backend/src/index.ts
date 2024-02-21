import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import "dotenv/config";
import mongoose from "mongoose";
import errorHandler from './middlewares/errorHandler'
import morgan from "./middlewares/morgan";
import indexRouter from "./routes";
import corsOptions from "./config/corsOptions";


mongoose.connect(process.env.MONGODB_URI as string)
    .then((db) => console.log('Connected to database::',db.connection.host))
    .catch((error) => console.log('DB Error::',error.message))

const app = express()

app.use(express.json())
app.use(cors(corsOptions))


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