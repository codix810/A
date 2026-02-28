import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CountUp from 'react-countup'
import Marquee from 'react-fast-marquee'



const Hero = () => {
  return (
    <section className="relative w-full">
      {/* image */}
      <div className="w-full h-[70vh] lg:h-[90vh] relative">
        <Image
          src="/Hero/Rectangle 2.png"
          alt="hero-image"
          fill
          priority
          className="object-fill md:object-cover w-full h-full"
        />

        {/* overlay text */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20 space-y-6 bg-black/30 lg:bg-transparent">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold pt-8 leading-tight text-white lg:text-gray-900">
            Find Clothes <br />
            that Match <br />
            <span className="text-gray-200 lg:text-gray-600">Your Style</span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-gray-200 lg:text-gray-600 max-w-md">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>

          <Link href="/products" className="w-fit">
            <button className="cursor-pointer bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
              Shop Now
            </button>
          </Link>

          {/* stats */}
          <div className=" flex  flex-wrap gap-6 py-1 ">

            <div className="flex flex-col items-start pb-9">
              <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold pb-1  text-white lg:text-gray-900">
                +<CountUp start={0} end={200} duration={4} separator=','/>
              </span>
              <span className="text-xs sm:text-sm text-gray-200 lg:text-gray-500">
                International Brands
              </span>
            </div>

            <div className="flex flex-col items-start pb-9">
              <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold pb-2 text-white lg:text-gray-900">
                +<CountUp start={0} end={2000} duration={3} separator=','/>
              </span>
              <span className="text-xs sm:text-sm text-gray-200 lg:text-gray-500">
                High-Quality Products
              </span>
            </div>

            <div className="flex flex-col items-start pb-9">
              <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold pb-2 text-white lg:text-gray-900">
                +<CountUp start={0} end={30000} duration={3} separator=','/>
              </span>
              <span className="text-xs sm:text-sm text-gray-200 lg:text-gray-500">
                Happy Customers
              </span>
            </div>
          </div>
        </div>
      </div>
      
        <div className="bg-black w-full overflow-hidden">
          <Marquee gradient={false} speed={50} pauseOnHover={true} className='py-3'>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-12">
                  <Image
                    src="/Hero/Group.png"
                    alt="brand"
                    width={90}
                    height={80}
                    className="object-contain mx-12"
                  />
                  <Image
                    src="/Hero/Vector.png"
                    alt="brand"
                    width={90}
                    height={80}
                    className="object-contain mx-12"
                  />
                  <Image
                    src="/Hero/Vector (1).png"
                    alt="brand"
                    width={90}
                    height={80}
                    className="object-contain mx-12"
                  />
                  <Image
                    src="/Hero/Vector (2).png"
                    alt="brand"
                    width={90}
                    height={80}
                    className="object-contain mx-12"
                  />
                  <Image
                    src="/Hero/Vector (3).png"
                    alt="brand"
                    width={90}
                    height={80}
                    className="object-contain mx-12"
                  />
                </div>
              ))}
          </Marquee>
        </div>



    </section>
  )
}

export default Hero
