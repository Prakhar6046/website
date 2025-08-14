import type { ContentToImageVerticalScrollBlock as ContentToImageVerticalScrollBlockProps } from '@/payload-types'
import React from 'react'
import ContentToImageVerticalScrollLayout from '@/components/ContentToImageVerticalScrollLayout'

type Props = ContentToImageVerticalScrollBlockProps & {
  className?: string
}

export const ContentToImageVerticalScrollBlock: React.FC<Props> = (props) => {
  return <ContentToImageVerticalScrollLayout {...props} />
}

export default ContentToImageVerticalScrollBlock
