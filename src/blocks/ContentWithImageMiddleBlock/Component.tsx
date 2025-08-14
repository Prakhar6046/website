import React from 'react'
import { ContentWithImageMiddleBlock as ContentWithImageMiddleBlockProps } from '@/payload-types'
import ContentWithImageMiddleLayout from '@/components/ContentWithImageMiddleLayout'

type Props = ContentWithImageMiddleBlockProps & {
  className?: string
}

export const ContentWithImageMiddleBlock: React.FC<Props> = (props) => {
  return <ContentWithImageMiddleLayout {...props} />
}

export default ContentWithImageMiddleBlock
