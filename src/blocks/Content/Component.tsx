import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { AnimatePresenceBlock } from '@/components/ui/animate-presence-block'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Spotlight } from '@/components/ui/spotlight'

const gradient = {
  none: 'from-transparent to-transparent',
  topToBottom: 'from-accent/5 to-transparent',
  bottomToTop: 'from-transparent to-accent/5',
  middle: 'from-transparent via-accent/5 to-transparent',
}

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, backgroundColor, sectionGradient, disableGutter, addSpotlight } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  const verticalAlignClasses = {
    top: 'items-start',
    center: 'items-center',
    bottom: 'items-end',
  }

  const backgroundColorClass = backgroundColor?.replace('--', '')

  return (
    <div className={cn('relative', !!backgroundColorClass && `bg-${backgroundColorClass}`)}>
      <div
        className={cn(
          'absolute left-0 top-0 z-0 h-full w-full bg-opacity-10 bg-gradient-to-b',
          gradient[sectionGradient as keyof typeof gradient],
        )}
      />
      {sectionGradient === 'radialCircleGreen' && (
        <div
          className={'absolute left-0 top-[10%] z-0 hidden size-96 h-full w-full md:block'}
          style={{
            background:
              'radial-gradient(circle closest-side, #465235 10%, hsl(var(--background)) 100%)',
            opacity: 0.4,
          }}
        />
      )}

      {addSpotlight && <Spotlight />}
      <div
        className={cn(
          'container relative py-16 md:py-32 lg:py-32',
          disableGutter && 'py-8 md:py-8 lg:py-8',
        )}
      >
        <div className="grid grid-cols-4 gap-x-9 gap-y-9 lg:grid-cols-12">
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const {
                enableLink,
                link,
                richText,
                blocks,
                center,
                maxWidth,
                size,
                verticalAlignment,
                topPadding = 'none',
                bottomPadding = 'none',
              } = col

              return (
                <div
                  className={cn(
                    `col-span-4 flex ${verticalAlignClasses[verticalAlignment as keyof typeof verticalAlignClasses]} justify-start lg:col-span-${colsSpanClasses[size!]}`,
                    `pt-${topPadding}`,
                    `pb-${bottomPadding}`,
                    {
                      'md:col-span-2': size !== 'full',
                    },
                    center && 'mx-auto',
                    maxWidth && `max-w-[${maxWidth}]`,
                  )}
                  key={index}
                >
                  <AnimatePresenceBlock className={'w-full'} index={index}>
                    {richText && (
                      <RichText data={richText} className={'mx-0 w-full'} enableGutter={false} />
                    )}

                    {/* @ts-expect-error */}
                    <RenderBlocks blocks={blocks || []} />

                    {enableLink && <CMSLink {...link} />}
                  </AnimatePresenceBlock>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
