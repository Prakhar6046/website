import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'
import ParallaxMedia from '@/components/Media/ParallaxMedia'
import { AnimatePresenceBlock } from '@/components/ui/animate-presence-block'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = false,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    isExpandable,
    isParallax,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden',
        isParallax && 'h-[70vh]',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        <>
          {isParallax ? (
            <ParallaxMedia>
              <Media
                imgClassName={cn('absolute h-[130%] -z-50 left-0 -top-[20%]  w-full object-cover')}
                resource={media}
                src={staticImage}
              />
            </ParallaxMedia>
          ) : (
            <Media
              imgClassName={cn(
                'w-full object-cover',
                isParallax && 'absolute h-[130%] -z-50 left-0 -top-[20%]',
              )}
              isExpandable={isExpandable}
              resource={media}
              src={staticImage}
            />
          )}
        </>
      )}
      {isParallax && <div className={'absolute left-0 top-0 h-full w-full bg-background/40'} />}
      {caption && (
        <div
          className={cn(
            'relative flex h-full w-full items-start justify-stretch !text-center md:items-start md:!text-left',
            {
              container: true,
            },
          )}
        >
          <AnimatePresenceBlock className={'w-full'}>
            <RichText
              data={caption}
              className={'w-full pt-20'}
              aria-multiline={true}
              enableGutter={false}
            />
          </AnimatePresenceBlock>
        </div>
      )}
    </div>
  )
}
