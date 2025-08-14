import type { ContentToImageVerticalScrollBlock as ContentVerticalScrollBlockProps } from '@/payload-types'
import React, { FC } from 'react'
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'
import { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { AnimatePresenceBlock } from '@/components/ui/animate-presence-block'

type Props = ContentVerticalScrollBlockProps & {
  className?: string
}

const ContentToImageVerticalScrollLayout: FC<Props> = (props) => {
  const content =
    props.content.contentBlocks?.map((block, index) => {
      return {
        richText: block.contentBlock as SerializedEditorState<SerializedLexicalNode>,
        image: props.content.mediaBlocks?.[index],
      }
    }) || []

  return (
    <>
      <div className="flex grid-cols-2 flex-col items-stretch justify-start gap-8 py-10 sm:grid md:hidden">
        {content.map((block, index) => {
          return (
            <AnimatePresenceBlock
              key={index}
              className="rounded-md border border-border bg-card/40 px-8 py-6 backdrop-blur-3xl"
            >
              <Media
                resource={block.image?.media}
                imgClassName={'object-cover rounded-sm overflow-hidden aspect-video'}
              />
              <RichText className={'mt-6'} enableGutter={false} data={block.richText} />
            </AnimatePresenceBlock>
          )
        })}
      </div>
      <StickyScroll contentClassName={''} content={content} />
    </>
  )
}

export default ContentToImageVerticalScrollLayout
