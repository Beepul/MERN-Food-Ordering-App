import { Request, Response, NextFunction } from "express"

interface ResponseError extends Error {
    statusCode: number
} 

const errorHandler = (err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal Server Error'

    res.status(err.statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    })
}


export default errorHandler