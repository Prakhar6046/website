import { cn } from '@/utilities/ui'
import React from 'react'

import { CardProductData, ProductCard } from '@/components/ProductCard'
import { AnimatePresenceBlock } from '@/components/ui/animate-presence-block'
import { CMSLink } from '@/components/Link'

export type Props = {
  products: CardProductData[]
  populateBy: 'collection' | 'selection' | null | undefined
  showAllProjectsLink: boolean | null | undefined
}

export const ProductCollectionArchive: React.FC<Props> = (props) => {
  const { products } = props

  return (
    <div>
      <div className="grid grid-cols-4 gap-x-4 gap-y-4 md:grid-cols-8 lg:gap-x-8 lg:gap-y-8 xl:gap-x-8">
        {products?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div className="col-span-4" key={index}>
                <AnimatePresenceBlock className={'w-full'}>
                  <ProductCard className="h-full" doc={result} relationTo="products" />
                </AnimatePresenceBlock>
              </div>
            )
          }
          return null
        })}
      </div>
      {!!props.showAllProjectsLink && (
        <div className={'mt-12 flex justify-center'}>
          <CMSLink url={'/products'} className="text-center underline">
            See all the projects
          </CMSLink>
        </div>
      )}
    </div>
  )
}
