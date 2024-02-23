import { Request, Response } from 'express';
import User from '../models/user';
import BError from '../utils/BError';
import { catchAsyncError } from '../middlewares/catchAsyncError';

const getCurrentUser = catchAsyncError(async (req: Request, res: Response) => {
	const currentUser = await User.findOne({ _id: req.userId })
	if(!currentUser) throw new BError('User not found', 404 )

	res.json(currentUser)
})

const createCurrentUser = catchAsyncError(async (req: Request, res: Response) => {
	const { auth0Id } = req.body;

	const existingUser = await User.findOne({ auth0Id });

	if (existingUser) {
		return res.status(200).send('Success');
	}

	const newUser = new User(req.body);
	await newUser.save();

	return res.status(201).json(newUser.toObject());
});

const updateCurrentUser = catchAsyncError(async (req: Request, res: Response) => {
	const { name, addressLine1, country, city } = req.body;

	const user = await User.findById(req.userId);

	if (!user) throw new BError('User not found', 404);

	user.name = name;
	user.addressLine1 = addressLine1;
	user.city = city;
	user.country = country;

	await user.save();

	res.send(user);
});



export default {
	createCurrentUser,
	updateCurrentUser,
	getCurrentUser
};
