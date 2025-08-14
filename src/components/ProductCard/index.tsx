'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'
import type { Product } from '@/payload-types'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

export type CardProductData = Product

export const ProductCard: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardProductData
  relationTo?: 'products'
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!card.ref.current) return

    const { current: target } = card.ref

    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    target.style.setProperty('--mouse-x', `${x}px`)
    target.style.setProperty('--mouse-y', `${y}px`)

    for (const card of document.querySelectorAll('.cardGlowHover')) {
      //@ts-expect-error
      card.onmousemove = (e) => handleMouseMove(e)
    }
  }

  const { className, doc, relationTo, title: titleFromProps } = props
  const { title, slug } = doc || {}

  const titleToUse = titleFromProps || title
  const href = `/${relationTo}/${slug}`

  const { squareFootageLabel, heroImage, shortDescription } = doc || {}

  return (
    <article
      className={cn(
        'relative z-0 cursor-pointer overflow-hidden rounded-lg border border-border/80 bg-card px-8 py-7 transition-all',
        'cardGlowHover',
        className,
      )}
      onMouseMove={handleMouseMove}
      ref={card.ref}
    >
      <div className="relative z-10 w-full">
        {!heroImage && <div className="">No image</div>}
        {heroImage && typeof heroImage !== 'string' && (
          <Media
            resource={heroImage}
            className={'aspect-video overflow-hidden rounded-sm'}
            size="45vw"
          />
        )}
      </div>
      <div className="z-10 pt-4">
        <div
          className={cn(
            'flex flex-col gap-4 sm:flex-row md:flex-col lg:flex-row',
            doc?.projectType === 'commercial' && '!flex-col',
          )}
        >
          <div className={'flex basis-1/2 flex-col items-start justify-start gap-1'}>
            <p className={'text-base'}> {titleToUse}</p>
            {doc?.projectType === 'residential' && (
              <p className={'text-sm text-foregroundSecondary'}>{squareFootageLabel}</p>
            )}
          </div>
          <div className={'basis-1/2'}>
            {shortDescription && (
              <p className={'text-sm leading-normal text-foregroundSecondary'}>
                {shortDescription}
              </p>
            )}
          </div>
        </div>
        <div className={'mt-9 flex items-center justify-between'}>
          <Link className="relative z-10 hidden w-full" href={href} ref={link.ref}></Link>
          <CMSLink
            size={'default'}
            url={href}
            appearance={'ghost'}
            type={'reference'}
            className={'z-10 px-5 font-normal'}
          >
            See Details
          </CMSLink>
          <CMSLink
            size={'default'}
            url={`/contact?modelOfInterest=${slug}`}
            appearance={'default'}
            type={'reference'}
            className={'z-10 px-5 font-normal'}
          >
            Order Now
          </CMSLink>
        </div>
      </div>
    </article>
  )
}
