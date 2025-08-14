import type { ProductArchiveBlock as ProductArchiveBlockProps, Product } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { ProductCollectionArchive } from '@/components/ProductCollectionArchive'
import { cn } from '@/utilities/ui'

export const ProductArchiveBlock: React.FC<
  ProductArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    projectType,
    headerContent1,
    headerContent2,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    showAllProjectsLink,
  } = props

  const limit = limitFromProps || 10

  let products: Product[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const fetchedProducts = await payload.find({
      collection: 'products',
      depth: 1,
      limit,
      sort: ['created_at'],
      ...(!!projectType
        ? {
            where: {
              projectType: {
                equals: projectType,
              },
            },
          }
        : {}),
      includeLockStatus: true,
    })
    products = fetchedProducts.docs as Product[]
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedProducts = selectedDocs.map((product) => {
        if (typeof product.value === 'object') return product.value
      }) as Product[]

      products = filteredSelectedProducts
    }
  }

  return (
    <div className="" id={`block-${id}`}>
      <ProductCollectionArchive
        showAllProjectsLink={showAllProjectsLink}
        populateBy={populateBy}
        products={products}
      />
    </div>
  )
}
