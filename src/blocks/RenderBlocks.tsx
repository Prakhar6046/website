import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ProductArchiveBlock } from '@/blocks/ProductArchiveBlock/Component'
import { SectionNumberBlock } from './SectionNumberBlock/Component'
import IconBlock from '@/blocks/IconBlock/Component'
import ContentCardSliderBlock from '@/blocks/ContentCardSliderBlock/Component'
import ContentVerticalScrollBlock from '@/blocks/ContentToImageVerticalScrollBlock/Component'
import ContentWithImageMiddleBlock from '@/blocks/ContentWithImageMiddleBlock/Component'
import FAQBlock from '@/blocks/FAQBlock/Component'
import CompareBlock from '@/blocks/CompareBlock/Component'
import GalleryBlock from '@/blocks/GalleryBlock/Component'
import { FormBlockServer } from '@/blocks/Form/Component.server'
import CardBlock from '@/blocks/CardBlock/Component'
import ContentStructuralDetailsBlock from '@/blocks/ContentStructuralDetailsBlock/Component'
import ConfigurationOptionsBlock from '@/blocks/ConfigurationOptionsBlock/Component'
import StructuralDiagramGalleryBlock from '@/blocks/StructuralDiagramGalleryBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  formBlock: FormBlockServer,
  mediaBlock: MediaBlock,
  icon: IconBlock,
  'product-archive': ProductArchiveBlock,
  sectionNumberBlock: SectionNumberBlock,
  contentCardSliderBlock: ContentCardSliderBlock,
  contentVerticalScrollBlock: ContentVerticalScrollBlock,
  contentWithImageMiddleBlock: ContentWithImageMiddleBlock,
  faqBlock: FAQBlock,
  compareBlock: CompareBlock,
  galleryBlock: GalleryBlock,
  cardBlock: CardBlock,
  contentStructuralDetailsBlock: ContentStructuralDetailsBlock,
  configurationOptionsBlock: ConfigurationOptionsBlock,
  structuralDiagramGalleryBlock: StructuralDiagramGalleryBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
