import { FC } from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import { AnimatePresenceBlock } from '@/components/ui/animate-presence-block'
import { ContentWithImageMiddleBlock } from '@/payload-types'

type Props = ContentWithImageMiddleBlock & {
  className?: string
}

const ContentWithImageMiddleLayout: FC<Props> = (props) => {
  return (
    <div
      className={
        'mt-10 flex grid-flow-row grid-cols-2 flex-col gap-x-4 gap-y-6 md:mt-32 md:grid md:grid-cols-3 md:gap-y-12'
      }
    >
      {props.content.contentBlocks.map((block, index) => {
        return (
          block.contentBlock && (
            <div key={index}>
              <AnimatePresenceBlock className={'hidden w-full md:block'} index={index}>
                <RichText data={block.contentBlock} className={'w-full'} enableGutter={false} />
              </AnimatePresenceBlock>

              <AnimatePresenceBlock className={'w-full md:hidden'} index={index}>
                <div
                  className={
                    'relative overflow-hidden rounded-md bg-opacity-90 p-4 shadow backdrop-blur-md'
                  }
                >
                  <div
                    className={
                      'absolute inset-0 z-10 border border-border bg-gradient-to-b from-background to-card'
                    }
                  />
                  <RichText
                    data={block.contentBlock}
                    className={'relative z-50 w-full'}
                    enableGutter={false}
                  />
                </div>
              </AnimatePresenceBlock>
            </div>
          )
        )
      })}
      <div className={'relative col-start-2 col-end-3 row-start-1 row-end-4 hidden md:block'}>
        <Image className={'w-full'} src={'/eco-tree.svg'} fill={true} alt={'Tree fingerprint'} />
      </div>
    </div>
  )
}

export default ContentWithImageMiddleLayout
