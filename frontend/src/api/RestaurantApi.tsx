import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
    const getRestaurantRequest = async () : Promise<Restaurant> => {
        const res = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`)

        if(!res.ok) throw new Error('Failed to get restaurant')

        return res.json()
    }

    const {data: restaurant, isLoading} = useQuery('getRestaurant',getRestaurantRequest, {
        enabled: !!restaurantId
    })

    return {
        restaurant,
        isLoading
    }
}

export const useSearchRestaurants = (searchState: SearchState ,city?: string) => {
    const params = new URLSearchParams()
    params.set('searchQuery', searchState.searchQuery)
    params.set('page', searchState.page.toString())
    params.set('selectedCuisines', searchState.selectedCuisines.join(','))
    params.set('sortOption', searchState.sortOption)

    const createSearchRequest = async () : Promise<RestaurantSearchResponse> => {
        const res = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`)
        if(!res.ok){
            throw new Error('Failed to get restaurant')
        }
    
        return res.json()
    }
    const {data: results, isLoading} = useQuery(['searchRestaurants', searchState], createSearchRequest, {enabled: !!city})

    return {
        results,
        isLoading
    }
}


export const useGetRestaurantLocations = (keyword: string) => {
    const getRestaurantLocations = async (): Promise<string[]> => {
        const res = await fetch(`${API_BASE_URL}/api/restaurant/locations/${keyword}`)

        if(!res.ok) throw new Error('Failed to get restaurant')

        return res.json()
    }

    const {data: locations, isLoading, refetch} = useQuery('getRestaurantLocations',getRestaurantLocations, {
        enabled: !!keyword
    })

    return {
        locations,
        isLoading,
        refetch
    }
}