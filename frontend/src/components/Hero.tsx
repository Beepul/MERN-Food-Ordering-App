import hero from '../assets/hero-slider-3.jpg'

const Hero = () => {
  return (
    <div>
        <img src={hero} className='w-full max-h-[600px] object-cover min-h-[450px]' />
    </div>
  )
}

export default Hero;