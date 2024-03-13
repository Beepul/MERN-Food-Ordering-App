import landing from '../assets/landing.png'
import appDownload from '../assets/appDownload.png'

const HomePage = () => {


  return (
    <div className="flex flex-col gap-12">
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

