import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SearchBarWithSuggestion from '@/components/SearchBarWithSuggestion';
import React from 'react'

type Props = {
    children: React.ReactNode;
}

const HomePageLayout = ({children}: Props) => {
  return (
    <div className='flex flex-col min-h-screen relative'>
        <div className='absolute top-0 left-0 right-0 z-10'>
            <Header isHome={true} />
        </div>
        <div className='relative'>
            <Hero />
            <div className='absolute top-[50%] left-0 right-0 translate-y-[-50%]'>
                <div className='container pt-20 flex flex-col items-center'>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-orange-600 text-center mb-7 capitalize">
                        Tuck into a takeaway today
                    </h1>
                    <span className="text-xl text-white text-center mb-10">Food is just a click away!</span>
                    <SearchBarWithSuggestion />
                </div>
            </div>
        </div>
        <div className='container mx-auto flex-1 py-10'>
            {children}
        </div>
        <Footer />
    </div>
  )
}

export default HomePageLayout