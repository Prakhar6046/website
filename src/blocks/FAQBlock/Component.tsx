import { FC } from 'react'
import { FAQBlock as FAQBlockProps } from '@/payload-types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import RichText from '@/components/RichText'

type Props = FAQBlockProps & {}

const FAQBlock: FC<Props> = (props) => {
  return (
    <Accordion className={'text-sm!'} type={'multiple'}>
      {props.faqItems.map((faqItem, index) => {
        return (
          <AccordionItem value={`${index}`} key={index}>
            <AccordionTrigger>
              <RichText
                enableGutter={false}
                className={'w-full max-w-none'}
                data={faqItem.heading}
              />
            </AccordionTrigger>
            <AccordionContent>
              <RichText
                enableGutter={false}
                className={'w-full max-w-none'}
                data={faqItem.content}
              />
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default FAQBlock
