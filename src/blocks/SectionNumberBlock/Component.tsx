import { cn } from '@/utilities/ui'
import React from 'react'

import type { SectionNumberBlock as SectionNumberBlockProps } from '@/payload-types'

type Props = SectionNumberBlockProps & {
  className?: string
}

export const SectionNumberBlock: React.FC<Props> = (props) => {
  const { className } = props

  return (
    <div
      className={cn(
        'relative w-full',
        {
          container: true,
        },
        className,
      )}
    >
      <div className={'flex flex-col items-center justify-center'}>
        <div className={'bg-green/5 flex size-24 items-center justify-center rounded-full p-0'}>
          <h4
            className={
              'text-green flex-0 block text-center font-sans text-5xl font-semibold leading-none'
            }
          >
            1
          </h4>
        </div>
      </div>
    </div>
  )
}
