import { Order, Restaurant } from "@/types"
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


export const useGetMyRestaurantOrders = () => {
    const { getAccessTokenSilently } = useAuth0()

    const getMyRestaurantOrdersReq = async () : Promise<Order[]> => {
        const accessToken = await getAccessTokenSilently()

        const res = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        })

        if(!res.ok) throw new Error('Failed to fetch orders')

        return res.json()
    }

    const {data: orders, isLoading} = useQuery('fetchMyRestaurantOrders', getMyRestaurantOrdersReq)

    return {
        orders,
        isLoading
    }
}


type UpdateOrderStatus = {
    orderId: string;
    status: string;
}

export const useUpdateMyRestaurantOrder = () => {
    const { getAccessTokenSilently } = useAuth0()

    const updateMyRestaurantOrder = async (updateStatusOrderRequest: UpdateOrderStatus) => {
        const accessToken = await getAccessTokenSilently()

        const res = await fetch(`${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status: updateStatusOrderRequest.status})
        })

        if(!res.ok) throw new Error('failed to update status')

        return res.json()
    }

    const {mutateAsync: updateRestaurantStatus, isLoading, isError, isSuccess, reset} = useMutation(updateMyRestaurantOrder)

    if(isSuccess){
        toast.success('Order updated')
    }

    if(isError){
        toast.error('Unable to update order')
        reset()
    }

    return {
        updateRestaurantStatus,
        isLoading
    }
}