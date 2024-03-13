import { Request, Response } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import Restaurant from "../models/restaurant";
import BError from "../utils/BError";


const getRestaurant = catchAsyncError(async (req:Request, res: Response) => {
    const restaurantId = req.params.restaurantId;

    const restaurant = await Restaurant.findById(restaurantId)

    if(!restaurant) throw new BError('restaurant not found', 404)

    res.json(restaurant)
})

const searchRestaurants = catchAsyncError(async (req:Request, res: Response) => {
    const city = req.params.city 

    const searchQuery = (req.query.searchQuery as string) || ''

    const selectedCuisines = (req.query.selectedCuisines as string) || ''

    const sortOption = (req.query.sortOption as string) || 'lastUpdated'

    const page = parseInt(req.query.page as string) || 1

    let query: any = {}

    query['city'] = new RegExp(city, 'i')

    const cityCheck = await Restaurant.countDocuments(query)

    if(cityCheck === 0){
        return res.status(404).json({
            data: [],
            pagination: {
                total: 0,
                page: 1,
                pages: 1
            }
        })
    }

    if(selectedCuisines){
        const cuisinesArray = selectedCuisines.split(',').map((cuisine) => new RegExp(cuisine, 'i'))
        console.log('CUISINE ARRAY::', cuisinesArray)

        query['cuisines'] = { $all: cuisinesArray}
    }

    if(searchQuery){
        const searchRegex = new RegExp(searchQuery, 'i')
        query['$or'] = [
            {restaurantName: searchRegex},
            {cuisines: {$in: [searchRegex]}}
        ]
    }

    const pageSize = 10
    const skip = (page - 1) * pageSize

    console.log(query)

    const restaurants = await Restaurant.find(query)
        .sort({ [sortOption ]: 1})
        .skip(skip)
        .limit(pageSize)
        .lean()

    const total = await Restaurant.countDocuments(query)

    const response = {
        data: restaurants,
        pagination: {
            total,
            page,
            pages: Math.ceil(total / pageSize)
        }
    }

    res.json(response)
})


const getLocations = catchAsyncError(async (req: Request, res: Response) => {
    const { search } = req.params;

    // Use regular expression for case-insensitive search
    const regex = new RegExp(search, 'i');

    const locations = await Restaurant.find({
        $or: [
            { name: { $regex: regex } }, // Match name containing the search keyword
            { city: { $regex: regex } }  // Match city containing the search keyword
        ]
    }).distinct('city');

    res.json(locations);
});

export default {
    searchRestaurants,
    getRestaurant,
    getLocations
}