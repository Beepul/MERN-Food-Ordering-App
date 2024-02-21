import express from 'express'
import myUserRoute from './MyUserRoute'

const indexRouter = express.Router();

indexRouter.use('/my/user', myUserRoute)


export default indexRouter