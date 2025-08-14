import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Premium Prefab Homes at Affordable Prices',
  images: [
    {
      url: `${getServerSideURL()}/logo-dark.png`,
    },
  ],
  siteName: 'NordHouse',
  title: 'NordHouse',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
