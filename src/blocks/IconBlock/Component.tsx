import React, { JSX } from 'react'
import { lexicalIconMap } from '@/constants/lexicalIconNode'
import type { IconBlock as IconBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

type Props = IconBlockProps & {}

const IconBlock: React.FC<Props> = ({ icon, size, customSize }) => {
  const Icon = lexicalIconMap[icon as keyof typeof lexicalIconMap]

  const sizes = {
    small: 'w-3.5',
    base: 'w-4',
    large: 'w-5',
    extraLarge: 'w-6',
    sameAsText: 'w-[1em] h-[1em]',
    custom: `w-[${customSize}px] h-[${customSize}px]`,
  }

  return <Icon className={cn('inline-block w-5 align-middle', sizes[size])} />
}

export default IconBlock
