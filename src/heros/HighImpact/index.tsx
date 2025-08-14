'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { AnimatePresenceBlock } from '@/components/ui/animate-presence-block'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10.4rem] flex min-h-[85vh] items-center justify-center text-white shadow-innerHeroSection"
      data-theme="dark"
    >
      {media && typeof media === 'object' && (
        <Media
          imgClassName="-z-20 top-0 left-0 absolute w-full h-full object-cover"
          priority
          resource={media}
        />
      )}
      <div className={'absolute -z-10 h-full w-full bg-background opacity-55'} />

      <div className="container relative z-10 mb-8 flex items-center justify-center pt-20 md:pt-0">
        <div className="max-w-[60rem] md:text-center">
          {richText && (
            <AnimatePresenceBlock>
              <RichText className="mb-6" data={richText} enableGutter={false} />
            </AnimatePresenceBlock>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4 md:justify-center">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <AnimatePresenceBlock index={i + 1}>
                      <CMSLink {...link} />
                    </AnimatePresenceBlock>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
