'use client'
import { FC } from 'react'
import { ConfigurationOptionsBlock as ConfigurationOptionsBlockProps } from '@/payload-types'
import { Card, CardContent } from '@/components/ui/card'
import { usePathname, useSearchParams } from 'next/navigation'
import { CMSLink } from '@/components/Link'
type Props = ConfigurationOptionsBlockProps & {}

interface ConfOption {
  title: string
  description: string
  value: string
}

const configurationOptions: ConfOption[] = [
  {
    title: 'Essential Shell',
    description:
      'A high-quality, weatherproof home structure with windows, doors, and a reinforced roof, ready for customization.',
    value: 'essential-shell',
  },
  {
    title: 'Move-In Ready',
    description:
      'A fully finished home with electricity, plumbing, flooring, interior design, and essential installations.',
    value: 'move-in-ready',
  },
  {
    title: 'Fully Furnished Living',
    description:
      'A complete, turnkey home with a basic set of furniture, ready for comfortable living from day one.',
    value: 'fully-furnished',
  },
]

const ConfigurationOptionsClientBlock: FC<Props> = (props) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  let modelOfInterest = searchParams.get('modelOfInterest')
  const isProductPage = pathname.includes('/products/')
  let productSlug = pathname.split('/').pop()?.split('?')[0] || ''
  //if has search params, strip out all
  productSlug = productSlug
  if (isProductPage) {
    modelOfInterest = productSlug
  }

  return (
    <div className={'flex flex-row flex-wrap items-stretch justify-stretch gap-9'}>
      {configurationOptions.map((option) => (
        <Card key={option.value} className={'group relative min-w-[300px] flex-1 pt-4'}>
          <CardContent className={'hover:last:block'}>
            <h6 className={'text-center text-lg'}>{option.title}</h6>
            <p
              className={
                'mt-4 text-center text-foregroundSecondary transition-all duration-200 hover:delay-200 group-hover:pb-10'
              }
            >
              {option.description}
            </p>

            <CMSLink
              appearance={'default'}
              className={
                'delay absolute bottom-4 left-1/2 mx-auto mt-4 min-w-52 -translate-x-1/2 opacity-0 transition-all delay-0 duration-200 hover:delay-200 group-hover:opacity-100'
              }
              url={
                '/contact?configurationOption=' +
                option.value +
                '&modelOfInterest=' +
                modelOfInterest
              }
            >
              Order
            </CMSLink>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ConfigurationOptionsClientBlock
