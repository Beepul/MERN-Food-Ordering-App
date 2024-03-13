import { Request, Response } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import Restaurant from "../models/restaurant";
import BError from "../utils/BError";
import cloudinary from 'cloudinary'
import mongoose from "mongoose";
import Order from "../models/order";

const getMyRestaurant = catchAsyncError(async (req: Request, res: Response) => {
    const restaurant = await Restaurant.findOne({ user: req.userId })

    if(!restaurant) throw new BError('restaurant not found', 400)

    res.json(restaurant)
})

const createMyResturant = catchAsyncError(async (req: Request,res: Response) => {
    const existingRestaurant = await Restaurant.findOne({user: req.userId})

    if(existingRestaurant){
        throw new BError('User restaurant already exists', 409)
    }

    // const image = req.file as Express.Multer.File

    // const base64Image = Buffer.from(image.buffer).toString('base64')

    // const dataURI = `data:${image.mimetype};base64,${base64Image}`

    // const uploadResponse = await cloudinary.v2.uploader.upload(dataURI,{
    //     folder: 'mern-food-ordering'
    // })

    const imageUrl = await uploadImage(req.file as Express.Multer.File)

    const restaurant = new Restaurant(req.body)
    restaurant.imageUrl = imageUrl 
    restaurant.user = new mongoose.Types.ObjectId(req.userId)
    restaurant.lastUpdated = new Date()

    await restaurant.save()

    res.status(201).send(restaurant)
})

const updateMyRestaurant = catchAsyncError(async (req: Request,res: Response) => {
    const restaurant = await Restaurant.findOne({
        user: req.userId
    })

    if(!restaurant) throw new BError('restaurant not found', 400 )

    restaurant.restaurantName = req.body.restaurantName
    restaurant.city = req.body.city
    restaurant.country = req.body.country
    restaurant.deliveryPrice = req.body.deliveryPrice
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime
    restaurant.cuisines = req.body.cuisines
    restaurant.menuItems = req.body.menuItems
    restaurant.lastUpdated = new Date()

    if(req.file){
        const imageUrl = await uploadImage(req.file as Express.Multer.File)
        restaurant.imageUrl = imageUrl
    }

    await restaurant.save()

    res.status(200).send(restaurant)
})

const uploadImage = async (file:Express.Multer.File) => {
    const image = file

    const base64Image = Buffer.from(image.buffer).toString('base64')

    const dataURI = `data:${image.mimetype};base64,${base64Image}`

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI,{
        folder: 'mern-food-ordering'
    })

    return uploadResponse.url
}


const getMyRestaurantOrders = catchAsyncError(async (req: Request, res: Response) => {
    const restaurant = await Restaurant.findOne({user: req.userId})

    if(!restaurant) throw new BError('restaurant not found', 404)

    const orders = await Order.find({restaurant: restaurant._id})
        .populate('restaurant').populate('user').sort({createdAt: -1});

    // console.log({allorders})

    // const orders =  allorders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    // console.log({orders})
    res.json(orders)
})


const updateOrderStatus = catchAsyncError(async (req:Request, res: Response) => {
    const {orderId} = req.params;
    const {status} = req.body;

    const order = await Order.findById(orderId)

    if(!order) throw new BError('order not found', 404)

    const restaurant = await Restaurant.findById(order.restaurant)

    if(restaurant?.user?._id.toString() !== req.userId){
        throw new BError('', 401)
    }

    order.status = status;
    await order.save()

    res.status(200).json(order)
})


export default {
    getMyRestaurant,
    createMyResturant,
    updateMyRestaurant,
    getMyRestaurantOrders,
    updateOrderStatus
}