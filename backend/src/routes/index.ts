import express from 'express'
import myUserRoute from './MyUserRoute'
import myRestaurantRoute from './MyRestaurantRoute'
import RestaurantRoute from './RestaurantRoute'

const indexRouter = express.Router();

indexRouter.use('/my/user', myUserRoute)
indexRouter.use('/my/restaurant', myRestaurantRoute)
indexRouter.use('/restaurant', RestaurantRoute)


export default indexRouter