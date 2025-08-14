import clsx from 'clsx'
import React from 'react'
import Image from 'next/image'
import dark from 'src/assets/icon-square-dark.png'
import light from 'src/assets/icon-square-light.png'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const LogoForAdmin = (props: Props) => {
  return (
    <div>
      <Image src={light} alt="" className={'h-20 object-contain dark:hidden'} />
      <Image src={dark} alt="" className={'hidden h-20 object-contain dark:block'} />
    </div>
  )
}
