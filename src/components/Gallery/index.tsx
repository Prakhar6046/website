'use client'
import React, { FC, useState } from 'react'
import { Media } from '@/payload-types'
import { AnimatePresenceBlock } from '@/components/ui/animate-presence-block'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

const Gallery: FC<{
  images: Media[]
  galleryOpened: boolean
  setGalleryOpened: (value: boolean) => void
}> = ({ images, galleryOpened, setGalleryOpened }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  return (
    galleryOpened && (
      <AnimatePresenceBlock className={'fixed inset-0 z-50 h-full w-full select-none bg-card'}>
        <Button
          onClick={() => {
            setGalleryOpened(false)
            setThumbsSwiper(null)
          }}
          size={'icon'}
          variant={'ghost'}
          className={'absolute right-4 top-4 z-50'}
        >
          <X />
        </Button>
        <Swiper
          style={{
            //@ts-expect-error
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {images.map((image, idx) => (
            <SwiperSlide key={'gallery' + idx}>
              <img src={image.url!} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {images.map((image, idx) => (
            <SwiperSlide key={'gallery' + idx}>
              <img src={image.url!} />
            </SwiperSlide>
          ))}
        </Swiper>
      </AnimatePresenceBlock>
    )
  )
}

export default Gallery
