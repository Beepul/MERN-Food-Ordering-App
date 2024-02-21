import landing from '../assets/landing.png'
import appDownload from '../assets/appDownload.png'
import SearchBar from '@/components/SearchBar';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
        <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-orange-600">
                Truck into a takeaway today
            </h1>
            <span className="text-xl">Food is just a click away!</span>
            <SearchBar/>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
            <img src={landing} />
            <div className='flex flex-col items-center justify-center text-center gap-4'>
                <span className='font-bold text-3xl tracking-tighter'>
                    Order takeaway even faster!
                </span>
                <span>Download the MernEats App for faster ordering and personalised recommendation</span>
                <img src={appDownload} />
            </div>
        </div>
    </div>
  )
}

export default HomePage;

