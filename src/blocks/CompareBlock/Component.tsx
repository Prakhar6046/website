import React from 'react'
import { CompareBlock as CompareBlockProps, Media } from '@/payload-types'
import { Compare } from '@/components/ui/compare'

type Props = CompareBlockProps & {}

const CompareBlock: React.FC<Props> = (props) => {
  if (typeof props.image2 === 'string' && typeof props.image1 === 'string') {
    return null
  }
  return <Compare firstImage={props.image1 as Media} secondImage={props.image2 as Media} />
}

export default CompareBlock
