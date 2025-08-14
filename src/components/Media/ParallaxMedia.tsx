'use client'
import { FC, PropsWithChildren } from 'react'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax'

type Props = {}

const ParallaxMedia: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div className={'absolute left-0 top-0 h-full w-full'}>
      <div className={'relative h-full w-full overflow-hidden'}>
        <ParallaxProvider>
          <Parallax className={'h-full w-full'} translateY={[-20, 20]}>
            {children}
          </Parallax>
        </ParallaxProvider>
      </div>
    </div>
  )
}

export default ParallaxMedia
