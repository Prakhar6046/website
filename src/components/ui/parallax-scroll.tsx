'use client'
import { useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utilities/ui'
import { Media } from '@/payload-types'
import { ImageMedia } from '@/components/Media/ImageMedia'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'src/styles/swiper.css'
import Gallery from '@/components/Gallery'

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: { image: string | Media; id?: string | null | undefined }[]
  className?: string
}) => {
  const gridRef = useRef<any>(null)
  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end start'], // remove this if your container is not fixed height
  })
  const [galleryOpened, setGalleryOpened] = useState(false)

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200])
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200])
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200])

  const third = Math.ceil(images.length / 3)

  const firstPart = images.slice(0, third)
  const secondPart = images.slice(third, 2 * third)
  const thirdPart = images.slice(2 * third)

  return (
    <>
      <div className={cn('relative h-fit w-full items-start', className)} ref={gridRef}>
        <div className="grid w-full grid-cols-3 items-start gap-2" ref={gridRef}>
          <div className="grid gap-2">
            {firstPart.map((el, idx) => (
              <motion.div
                style={{ y: translateFirst }} // Apply the translateY motion value here
                className={'relative'}
                key={'grid-1' + idx}
              >
                <ImageMedia
                  onClick={() => setGalleryOpened(true)}
                  resource={el.image}
                  isExpandable={false}
                  imgClassName={cn(
                    'h-auto w-full object-cover object-left-top cursor-pointer !m-0 !p-0',
                  )}
                />
              </motion.div>
            ))}
          </div>
          <div className="grid gap-2">
            {secondPart.map(
              (el, idx) =>
                typeof el !== 'string' && (
                  <motion.div style={{ y: translateSecond }} key={'grid-2' + idx}>
                    <ImageMedia
                      onClick={() => setGalleryOpened(true)}
                      resource={el.image}
                      isExpandable={false}
                      imgClassName={cn(
                        'h-auto w-full object-cover object-left-top cursor-pointer !m-0 !p-0',
                      )}
                    />
                  </motion.div>
                ),
            )}
          </div>
          <div className="grid gap-2">
            {thirdPart.map((el, idx) => (
              <motion.div style={{ y: translateThird }} key={'grid-3' + idx}>
                <ImageMedia
                  onClick={() => setGalleryOpened(true)}
                  resource={el.image}
                  isExpandable={false}
                  imgClassName={cn(
                    'h-auto w-full object-cover object-left-top cursor-pointer !m-0 !p-0',
                  )}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Gallery
        images={images.map((el) => el.image as Media)}
        galleryOpened={galleryOpened}
        setGalleryOpened={setGalleryOpened}
      />
    </>
  )
}
