import { FC, Suspense } from 'react'
import { ConfigurationOptionsBlock as ConfigurationOptionsBlockProps } from '@/payload-types'
import ConfigurationOptionsClientBlock from '@/blocks/ConfigurationOptionsBlock/Component.client'

type Props = ConfigurationOptionsBlockProps & {}

const ConfigurationOptionsBlock: FC<Props> = (props) => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <ConfigurationOptionsClientBlock {...props} />
    </Suspense>
  )
}

export default ConfigurationOptionsBlock
