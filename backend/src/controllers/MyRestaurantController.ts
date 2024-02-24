import { Request, Response } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import Restaurant from "../models/restaurant";
import BError from "../utils/BError";
import cloudinary from 'cloudinary'
import mongoose from "mongoose";

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

    const image = req.file as Express.Multer.File

    const base64Image = Buffer.from(image.buffer).toString('base64')

    const dataURI = `data:${image.mimetype};base64,${base64Image}`

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI,{
        folder: 'mern-food-ordering'
    })

    const restaurant = new Restaurant(req.body)
    restaurant.imageUrl = uploadResponse.url 
    restaurant.user = new mongoose.Types.ObjectId(req.userId)
    restaurant.lastUpdated = new Date()

    await restaurant.save()

    res.status(201).send(restaurant)
})


export default {
    getMyRestaurant,
    createMyResturant,
}