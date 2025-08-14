import { FC } from 'react'
import {
  ContentStructuralDetailsBlock as ContentStructuralDetailsBlockProps,
  MediaBlock,
} from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { AnimatePresenceBlock } from '@/components/ui/animate-presence-block'

type Props = ContentStructuralDetailsBlockProps & {}

const ContentStructuralDetailsBlock: FC<Props> = async () => {
  const payload = await getPayload({ config: configPromise })
  //find media files in this array : ['insulation-1.png', 'windows-doors.png', 'ventilation.png', 'diagrams-roof-structure-diagram.png', 'diagrams-wall-structure-diagram.png', 'diagrams-floor-structure-diagram.png']
  const result = await payload.find({
    collection: 'media',
    where: {
      or: [
        {
          filename: {
            equals: 'insulation-1.png',
          },
        },
        {
          filename: {
            equals: 'windows-doors.png',
          },
        },
        {
          filename: {
            equals: 'ventilation-1.png',
          },
        },
        {
          filename: {
            equals: 'diagrams-roof-structure-diagram.png',
          },
        },
        {
          filename: {
            equals: 'diagrams-wall-structure-diagram.png',
          },
        },
        {
          filename: {
            equals: 'diagrams-floor-structure-diagram.png',
          },
        },
      ],
    },
  })
  const mediaFiles = result?.docs || []

  const mediaMap = new Map<string, MediaBlock['media']>()
  mediaFiles.forEach((media) => {
    if (!media?.filename) return
    mediaMap.set(media.filename, media)
  })

  return (
    <div className="prose relative grid w-full max-w-none grid-cols-4 gap-x-9 gap-y-9 sm:prose-sm md:prose-md lg:prose-lg dark:prose-invert lg:grid-cols-12">
      <div className={cn(`order-1 col-span-4 flex justify-start lg:col-span-6`)}>
        <AnimatePresenceBlock className={'w-full'}>
          <Media
            className={'flex-1'}
            imgClassName={'h-full w-full max-w-[500px] mx-auto'}
            size={'500'}
            resource={mediaMap.get('ventilation-1.png')}
            isExpandable={false}
          />
        </AnimatePresenceBlock>
      </div>
      <div className={'order-2 col-span-4 flex flex-col justify-center lg:col-span-6'}>
        <AnimatePresenceBlock className={'w-full'}>
          <h5 className={''}>Ventilation</h5>
          <p className={'text-foregroundSecondary'}>
            Our home features an advanced ventilation system designed to enhance indoor air quality
            by continuously replacing stale indoor air with fresh outdoor air. This process
            effectively removes pollutants such as allergens, dust, and volatile organic compounds
            (VOCs), contributing to a healthier living environment. Additionally, the system helps
            control humidity levels, reducing the risk of condensation and mold growth. By
            recovering heat from the outgoing air, it also improves energy efficiency, leading to
            potential savings on heating and cooling costs.
          </p>
        </AnimatePresenceBlock>
      </div>

      <div className={cn(`order-3 col-span-4 flex justify-start lg:order-4 lg:col-span-6`)}>
        <AnimatePresenceBlock className={'w-full'}>
          <Media
            className={'flex-1'}
            imgClassName={'h-full w-full max-w-[500px] mx-auto'}
            size={'500'}
            resource={mediaMap.get('windows-doors.png')}
            isExpandable={false}
          />
        </AnimatePresenceBlock>
      </div>
      <div className={'order-4 col-span-4 flex flex-col justify-center lg:order-3 lg:col-span-6'}>
        <AnimatePresenceBlock className={'w-full'}>
          <h5 className={''}>Windows & Doors</h5>
          <p className={'text-foregroundSecondary'}>
            Our home's windows and doors are equipped with low-emissivity (Low-E) glass, which
            reflects heat and enhances thermal performance. This technology helps maintain
            consistent indoor temperatures by reflecting interior heat back into the home during
            colder months and reducing heat gain during warmer months. As a result, homeowners may
            experience lower energy bills and increased comfort. Additionally, Low-E glass allows
            ample natural light to enter while minimizing the transmission of ultraviolet (UV) rays,
            which can help reduce fading of furnishings and flooring.
          </p>
        </AnimatePresenceBlock>
      </div>

      <div className={cn(`order-5 col-span-4 flex justify-start lg:col-span-6`)}>
        <AnimatePresenceBlock className={'w-full'}>
          <Media
            className={'flex-1'}
            imgClassName={'h-full w-full max-w-[500px] mx-auto'}
            size={'500'}
            resource={mediaMap.get('insulation-1.png')}
            isExpandable={false}
          />
        </AnimatePresenceBlock>
      </div>
      <div className={'order-6 col-span-4 flex flex-col justify-center lg:col-span-6'}>
        <AnimatePresenceBlock className={'w-full'}>
          <h5 className={''}>Insulation</h5>
          <p className={'text-foregroundSecondary'}>
            We utilize high-density stone wool insulation known for its exceptional sound absorption
            and fire-resistant properties. This insulation effectively reduces noise transmission
            between rooms, enhancing privacy and comfort within the home. Its fire-resistant nature
            adds an extra layer of safety, as it can withstand high temperatures without melting or
            releasing toxic gases. Additionally, this insulation contributes to thermal performance,
            helping to maintain comfortable indoor temperatures and potentially reducing energy
            costs.
          </p>
        </AnimatePresenceBlock>
      </div>

      <div className={cn(`order-7 col-span-4 mt-24 flex justify-start lg:col-span-12`)}>
        <h3>Structural Details</h3>
      </div>
      <hr className={'order-7 col-span-4 !my-2 border-foregroundSecondary lg:col-span-12'} />

      <div className={cn(`order-7 col-span-4 flex justify-start lg:order-8 lg:col-span-6`)}>
        <AnimatePresenceBlock className={'w-full'}>
          <Media
            className={'flex-1'}
            imgClassName={'h-full w-full max-w-[500px] mx-auto'}
            size={'500'}
            resource={mediaMap.get('diagrams-wall-structure-diagram.png')}
            isExpandable={true}
          />
        </AnimatePresenceBlock>
      </div>
      <div className={'order-8 col-span-4 flex flex-col justify-center lg:order-7 lg:col-span-6'}>
        <AnimatePresenceBlock className={'w-full'}>
          <h5 className={''}>Wall Structure</h5>
          <p className={'text-foregroundSecondary'}>
            The wall forms a complex structure which provides strength, reliability and heat
            resistance to the enclosing element of the house. This construction consists of internal
            equipment (upon the customer's choice), 3/8 in OSB Bord or plywood panels, vapor barrier
            membrane, a frame of 6 or 8 in wooden calibrated timbers, with Rockwool Safe’n’Sound
            insulation between them, 2x2 in mm cross timbers with insulation between them, a
            waterproofing membrane, a ventilation layer, 2x2 in guide furring, 3/8 in OSB Bord
            panels, finishing equipment depending on the customer's choice (folded panels,
            corrugated board, decorative board, etc.).
          </p>
        </AnimatePresenceBlock>
      </div>

      <div className={cn(`order-9 col-span-4 flex justify-start lg:col-span-6`)}>
        <AnimatePresenceBlock className={'w-full'}>
          <Media
            className={'flex-1'}
            imgClassName={'h-full w-full max-w-[500px] mx-auto'}
            size={'500'}
            resource={mediaMap.get('diagrams-floor-structure-diagram.png')}
            isExpandable={true}
          />
        </AnimatePresenceBlock>
      </div>
      <div className={'order-10 col-span-4 flex flex-col justify-center lg:col-span-6'}>
        <AnimatePresenceBlock className={'w-full'}>
          <h5 className={''}>Floor Structure</h5>
          <p className={'text-foregroundSecondary'}>
            The floor is a complex structure which provides strength, reliability and heat
            resistance to the enclosing element of the house. Such construction is made of OSB
            panel, which is impregnated with a black bituminous membrane for the entire drip rise
            from the foundation not to be interrupted on the side of the OSB board. There is a
            hydraulic barrier and a steel mesh under the panel, with a thickness of 0.8 mm, which
            serves as protection against rodents and at the same time is a frame for the ventilation
            gap. Next is a 6 in Rockwool Safe’n’Sound layer of insulation, as well as 1 in
            cross-insulation with extruded foam, behind them is an 7/8 in OSB board panel, and a
            magnesite plate, waterproofing, with the underfloor heating system placed above. This
            design ends with finishing equipment, depending on the choice of the customer (tiles or
            laminate).
          </p>
        </AnimatePresenceBlock>
      </div>

      <div className={cn(`order-11 col-span-4 flex justify-start lg:order-12 lg:col-span-6`)}>
        <AnimatePresenceBlock className={'w-full'}>
          <Media
            className={'flex-1'}
            imgClassName={'h-full w-full max-w-[500px] mx-auto'}
            size={'500'}
            resource={mediaMap.get('diagrams-roof-structure-diagram.png')}
            isExpandable={true}
          />
        </AnimatePresenceBlock>
      </div>
      <div
        className={
          'order order-12 col-span-4 flex flex-col justify-center lg:order-11 lg:col-span-6'
        }
      >
        <AnimatePresenceBlock className={'w-full'}>
          <h5 className={''}>Roof Structure</h5>
          <p className={'text-foregroundSecondary'}>
            The roof is a complex structure which provides strength, reliability and heat resistance
            to the enclosing element of the house. This structure consists of internal equipment
            (upon the customer's choice), 3/8 in OSB Bord or plywood panels, vapor barrier membrane,
            frame of 6 or 8 in wooden calibrated timbers, with insulation between them, 2x2 in cross
            timbers with Rockwool Safe’n’Sound insulation between them, waterproofing membrane,
            ventilation layer, 2x2 in guides furring, 3/8 in OSB Bord panel, finishing equipment, up
            on the choice of the customer (folded panels, corrugated board).
          </p>
        </AnimatePresenceBlock>
      </div>
    </div>
  )
}

export default ContentStructuralDetailsBlock
