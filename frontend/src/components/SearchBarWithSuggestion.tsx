import React, { useEffect, useState } from "react";
import { useGetRestaurantLocations } from "@/api/RestaurantApi";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { SearchForm } from "./SearchBar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { X } from 'lucide-react';

const formSchema = z.object({
    searchQuery: z.string({
        required_error: 'Restaurant name is required',
    }),
})

const SearchBarWithSuggestion = () => {
    const [keyword, setKeyWord] = useState('')
    const { locations, isLoading: _, refetch} = useGetRestaurantLocations(keyword)

    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery: ''
        }
    })

    const navigate = useNavigate()

    const onSubmit = () => {
        navigate({
            pathname: `/search/${keyword}`
        })
    }

    useEffect(() => {
        if(!keyword) {
            return
        }else{
            refetch()
        }

    },[keyword])

    const handleReset = () => {
        form.reset({
            searchQuery: '',
        })
        setKeyWord('')
    }
    
    return(
        <div className="flex flex-col items-start relative">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full w-full p-1 sm:p-3 ${form.formState.errors.searchQuery && 'border-red-500'}`}>
                    <div className="flex flex-1 items-center">
                        <Search strokeWidth={2.5} size={20} className="ml-1 text-white hidden md:block" />
                        <FormField control={form.control} name="searchQuery" render={({field}) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input {...field} 
                                        autoComplete="off" 
                                        placeholder="Search by City or Town" 
                                        value={keyword} 
                                        onChange={(e) => setKeyWord(e.target.value)} 
                                        className="text-white border-none shadow-none text-base sm:text-xl focus-visible:ring-0 text-start placeholder:text-gray-50" 
                                    />
                                </FormControl>
                            </FormItem>
                        )} />

                    </div>
                    <div className="flex gap-3">
                        {
                            !!keyword && 
                            <Button onClick={handleReset} type="button" variant={"outline"} className="rounded-full">
                                <X size={14} className="sm:hidden"/>
                                <span className="hidden sm:inline">
                                    Reset
                                </span>
                            </Button>
                        }
                        <Button type="submit" className="rounded-full bg-orange-500">
                            <Search size={14} className="sm:hidden" />
                            <span className="hidden sm:inline">Search</span>
                        </Button>

                    </div>
                </form>
            </Form>
            {
                keyword && (
                    <ul className="absolute top-full left-0 right-0 bg-white shadow-lg px-6 py-4 rounded-md max-h-[250px] overflow-y-auto text-start mt-5">
                        {(locations && locations.length > 0) ? locations?.map((location,i) => (
                            <React.Fragment key={i}>
                                <li onClick={() => setKeyWord(location)} className="py-3 px-5 cursor-pointer hover:bg-gray-50">{location}</li>
                                {i !== (locations.length - 1) && <Separator />}
                            </ React.Fragment>
                        )) : <li className="py-3">No Results found</li>}
                    </ul>
                )
            }
        </div>
    )
}

export default SearchBarWithSuggestion;