import type { ContentCardSliderBlock as ContentCardSliderBlockProps } from '@/payload-types'
import React from 'react'
import ContentCardSliderLayout from '@/components/ContentCardSliderLayout'

type Props = ContentCardSliderBlockProps & {
  className?: string
}

export const ContentCardSliderBlock: React.FC<Props> = (props) => {
  return <ContentCardSliderLayout {...props} />
}

export default ContentCardSliderBlock
