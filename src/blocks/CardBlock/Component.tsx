import { FC } from 'react'
import { CardBlock as CardBlockProps } from '@/payload-types'
import { Card, CardContent } from '@/components/ui/card'
import RichText from '@/components/RichText'

type Props = CardBlockProps & {}

const CardBlock: FC<Props> = ({ content, image }) => {
  return (
    <Card className={'px-0 py-6'}>
      <CardContent className={'p-0'}>
        <RichText enableProse={false} className={''} data={content} />
      </CardContent>
    </Card>
  )
}

export default CardBlock
