import express from 'express'
import myUserRoute from './MyUserRoute'
import myRestaurantRoute from './MyRestaurantRoute'
import RestaurantRoute from './RestaurantRoute'
import OrderRoute from './OrderRoute'

const indexRouter = express.Router();

indexRouter.use('/my/user', myUserRoute)
indexRouter.use('/my/restaurant', myRestaurantRoute)
indexRouter.use('/restaurant', RestaurantRoute)
indexRouter.use('/order', OrderRoute)


export default indexRouter