'use client'
import { OpenImageButtonBlock as OpenImageButtonBlockProps } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import React from 'react'
import { AnimatePresenceBlock } from '@/components/ui/animate-presence-block'
import ReactDOM from 'react-dom'

type Props = OpenImageButtonBlockProps & {}

const OpenImageButtonBlock: React.FC<Props> = ({ image, buttonLabel }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        {buttonLabel}
      </Button>

      {isOpen &&
        ReactDOM.createPortal(
          <div
            className={
              'fixed inset-0 z-50 h-full w-full cursor-pointer bg-card/80 py-12 backdrop-blur-sm'
            }
          >
            <AnimatePresenceBlock className={'relative'}>
              <Media
                resource={image}
                className={''}
                imgClassName={'h-full mx-auto z-50'}
                onClick={() => {
                  setIsOpen(false)
                }}
              />
            </AnimatePresenceBlock>
          </div>,
          document.body,
        )}
    </>
  )
}

export default OpenImageButtonBlock
