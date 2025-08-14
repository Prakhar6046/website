'use client'
import React, { FC, useState } from 'react'
import { Media, StructuralDiagramGalleryBlock as Props } from '@/payload-types'
import { Button } from '@/components/ui/button'
import Gallery from '@/components/Gallery'

const StructuralDiagramGalleryBlock: FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { images } = props

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        View Floor Plans
      </Button>

      <Gallery
        images={images.map((el) => el.media as Media)}
        galleryOpened={isOpen}
        setGalleryOpened={setIsOpen}
      />
    </>
  )
}

export default StructuralDiagramGalleryBlock
