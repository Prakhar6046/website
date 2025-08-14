import React from 'react'
import { GalleryBlock as GalleryBlockProps, Media } from '@/payload-types'
import { ParallaxScroll } from '@/components/ui/parallax-scroll'

const GalleryBlock: React.FC<GalleryBlockProps> = (props) => {
  return <ParallaxScroll images={props.images!} />
}

export default GalleryBlock
