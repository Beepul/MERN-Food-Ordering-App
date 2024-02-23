import express from 'express'
import myUserRoute from './MyUserRoute'
import myRestaurantRoute from './MyRestaurantRoute'

const indexRouter = express.Router();

indexRouter.use('/my/user', myUserRoute)
indexRouter.use('/my/restaurant', myRestaurantRoute)


export default indexRouter