import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/img1.webp'
import defaultBanner from '../assest/banner/7992434.jpg'

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";


const BannerProduct = () => {
    const [currentImage,setCurrentImage] = useState(0)

    // Use only the available images
    const desktopImages = [
        image1,
        defaultBanner
    ]

    // Use the same images for mobile
    const mobileImages = [
        image1,
        defaultBanner
    ]

    const nextImage = () =>{
        if(desktopImages.length - 1 > currentImage){
            setCurrentImage(preve => preve + 1)
        }
    }

    const preveImage = () =>{
        if(currentImage !== 0){
            setCurrentImage(preve => preve - 1)
        }
    }


    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImages.length - 1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        },5000)

        return ()=> clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentImage, desktopImages.length])

  return (
    <div className='container mx-auto px-4 rounded mt-4'>
        <div className='h-72 md:h-96 lg:h-[450px] w-full bg-slate-100 relative overflow-hidden rounded-md shadow-md'>

                <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                    <div className='flex justify-between w-full text-2xl px-4'>
                        <button onClick={preveImage} className='bg-white shadow-md rounded-full p-2 hover:bg-gray-100 hover:text-primary-600 transition-all'><FaAngleLeft/></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-2 hover:bg-gray-100 hover:text-primary-600 transition-all'><FaAngleRight/></button>
                    </div>
                </div>

                {/**desktop and tablet version */}
              <div className='hidden md:block h-full w-full overflow-hidden'>
                {
                  desktopImages.map((imageURl,index)=>{
                    return(
                      <div
                        className='absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out'
                        key={index}
                        style={{opacity: currentImage === index ? 1 : 0}}
                      >
                        <img src={imageURl} alt={`Banner ${index + 1}`} className='w-full h-full object-cover'/>
                      </div>
                    )
                  })
                }
              </div>


                {/**mobile version */}
                <div className='md:hidden block h-full w-full overflow-hidden'>
                  {
                    mobileImages.map((imageURl,index)=>{
                      return(
                        <div
                          className='absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out'
                          key={index}
                          style={{opacity: currentImage === index ? 1 : 0}}
                        >
                          <img src={imageURl} alt={`Banner ${index + 1}`} className='w-full h-full object-cover'/>
                        </div>
                      )
                    })
                  }
                </div>

              {/* Dot indicators */}
              <div className='absolute bottom-6 left-0 right-0 flex justify-center gap-3'>
                {desktopImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-all ${currentImage === index ? 'bg-primary-600 scale-125' : 'bg-white'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
        </div>
    </div>
  )
}

export default BannerProduct