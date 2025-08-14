import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import type { ContentBlock } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return posts.docs.map(({ slug }) => {
    return { slug }
  })
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Product({ params: paramsPromise }: Args) {
  // const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/products/' + slug
  const product = await queryProductBySlug({ slug })

  if (!product) return <PayloadRedirects url={url} />

  return (
    <article className="pb-16">
      <PageClient />

      <RenderBlocks blocks={product.content as ContentBlock[]} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryProductBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryProductBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
