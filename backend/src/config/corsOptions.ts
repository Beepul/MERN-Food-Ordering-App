import { CorsOptions } from "cors";

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : []

const corsOptions: CorsOptions = {
    origin: (origin,callback) => {
        if(!origin || allowedOrigins.indexOf(origin) !== -1 ){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'),false)
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsOptions;