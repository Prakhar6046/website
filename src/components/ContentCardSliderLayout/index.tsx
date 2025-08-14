import type { ContentCardSliderBlock as ContentCardSliderBlockProps, Media } from '@/payload-types'
import { FC } from 'react'
import { Card, Carousel } from '@/components/ui/apple-cards-carousel'

type Props = ContentCardSliderBlockProps & {
  className?: string
}

const ContentCardSliderLayout: FC<Props> = (props) => {
  const cards =
    props.content.mediaBlocks.map((block, index) => {
      const contentBlock = props.content.contentBlocks?.[index]?.contentBlock

      return (
        <Card media={block.media as Media} contentBlock={contentBlock} index={index} key={index} />
      )
    }) || []
  return <Carousel items={cards} />
}

export default ContentCardSliderLayout
