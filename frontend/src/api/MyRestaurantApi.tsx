import { Restaurant } from "@/types"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 


export const useGetMyRestaurant = () => {
    const {getAccessTokenSilently} = useAuth0()

    const getMyRestaurant = async () : Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently()

        const res = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            method: 'GET'
        })

        if(!res.ok){
            throw new Error('Failed to get restaurant')
        }
        return res.json()
    }

    const { data: restaurant, isLoading} = useQuery('fetchMyRestaurant',getMyRestaurant)

    return {
        restaurant,
        isLoading
    }
}

export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()
    
    const createMyRestaurantRequest = async (restaurantFormData:FormData) : Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const res = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: restaurantFormData
        })

        if(!res.ok){
            throw new Error('Failed to create restaurant')
        }

        return res.json()
    }

    const {mutate: createRestaurant, isLoading, isSuccess, error} = useMutation(createMyRestaurantRequest)

    if(isSuccess){
        toast.success('Restaurant created!')
    }

    if(error){
        console.log(error)
        toast.error('Unable to create restaurant')
    }

    return {
        createRestaurant,
        isLoading
    }
}


export const useUpdateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()
    
    const updateRestaurantRequest = async (restaurantFormData:FormData) : Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const res = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: restaurantFormData
        })

        if(!res.ok){
            throw new Error('Failed to update restaurant')
        }

        return res.json()
    }

    const {mutate: updateRestaurant, isLoading, isSuccess, error} = useMutation(updateRestaurantRequest)

    if(isSuccess){
        toast.success('Restaurant updated!')
    }

    if(error){
        console.log(error)
        toast.error('Unable to update restaurant')
    }

    return {
        updateRestaurant,
        isLoading
    }
}