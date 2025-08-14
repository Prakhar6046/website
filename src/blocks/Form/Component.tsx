'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { FormBlock as FormBlockProps } from '@/payload-types'
import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'
import ModernHouseIllustration from '@/ModernHouseIllustration/FormHouse'
import { Phone, Mail, Home } from 'lucide-react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import axios from 'axios'

export type FormBlockType = FormBlockProps & {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    formVariant,
    contactInfos,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields as any,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { executeRecaptcha } = useGoogleReCaptcha()
  let modelOfInterest = searchParams.get('modelOfInterest')
  const configurationOption = searchParams.get('configurationOption')

  //if /products/[PRODUCT], get PRODUCT and set it to modelOfInterest
  const isProductPage = pathname.includes('/products/')
  let productSlug = pathname.split('/').pop()?.split('?')[0] || ''
  //if has search params, strip out all
  productSlug = productSlug

  if (isProductPage) {
    modelOfInterest = productSlug
  }

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        if (!executeRecaptcha) {
          console.log('Recaptcha is Unavailable')
          return
        }

        const token = await executeRecaptcha('inquirySubmit')

        const response = await axios({
          method: 'post',
          url: '/api/recaptcha',
          data: {
            gRecaptchaToken: token,
          },
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*',
          },
        })

        if (response?.data?.success === true) {
          console.log('Recaptcha Success')
        } else {
          console.log('Recaptcha Failed')
          return
        }

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType, modelOfInterest],
  )

  const renderContactInfoIcon = (infoType: 'address' | 'email' | 'phone') => {
    switch (infoType) {
      case 'email':
        return <Mail />
      case 'phone':
        return <Phone />
      case 'address':
        return <Home />
      default:
        return <></>
    }
  }

  const getDefault = (field: FormFieldBlock) => {
    if (field.blockType === 'select') {
      if (field.name === 'model') {
        return modelOfInterest
      } else if (field.name === 'configuration') {
        return configurationOption
      } else {
        return undefined
      }
    }
    return undefined
  }

  const renderFormFields = () => {
    return (
      <div className="mb-4 grid w-full grid-cols-2 grid-rows-none gap-2 last:mb-0">
        {formFromProps &&
          formFromProps.fields &&
          formFromProps.fields?.map((field, index) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
            if (Field) {
              return (
                <div
                  className={cn(
                    'mb-6 last:mb-0',
                    index === formFromProps.fields.length - 1 && index % 2 === 0
                      ? 'col-span-2'
                      : 'col-span-1',
                    //@ts-expect-error
                    field.width === 100 && 'col-span-2',
                  )}
                  key={index}
                >
                  <Field
                    variant={'default'}
                    form={formFromProps}
                    {...field}
                    {...formMethods}
                    defaultValue={getDefault(field)}
                    control={control}
                    errors={errors}
                    register={register}
                  />
                </div>
              )
            }
            return null
          })}
      </div>
    )
  }

  const renderFormVariant = () => {
    switch (formVariant) {
      case 'variant2':
        return (
          <>
            <div className={'flex-1'}>
              {contactInfos?.map((info, index) => (
                <div className={'flex w-full flex-row items-center justify-start py-4'} key={index}>
                  <div className={'rounded-full bg-green/5 p-4'}>
                    {renderContactInfoIcon(info.infoType)}
                  </div>
                  <RichText data={info.richText} />
                </div>
              ))}
            </div>
            <FormProvider {...formMethods}>
              {!isLoading && hasSubmitted && confirmationType === 'message' && (
                <RichText data={confirmationMessage} />
              )}
              {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
              {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
              {!hasSubmitted && (
                <div className={'relative w-full flex-1'}>
                  <form
                    id={formID}
                    onSubmit={handleSubmit(onSubmit)}
                    className={
                      'z-10 flex w-full flex-1 flex-col rounded border border-border bg-card p-8'
                    }
                  >
                    {renderFormFields()}

                    <Button
                      form={formID}
                      type="submit"
                      className={'ml-auto w-full px-8 sm:w-fit'}
                      variant="default"
                    >
                      {submitButtonLabel}
                    </Button>
                  </form>
                </div>
              )}
            </FormProvider>
          </>
        )
      default:
        return (
          <>
            <div className={'hidden flex-1 lg:block'}>
              <ModernHouseIllustration />
            </div>
            <FormProvider {...formMethods}>
              {!isLoading && hasSubmitted && confirmationType === 'message' && (
                <RichText data={confirmationMessage} />
              )}
              {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
              {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
              {!hasSubmitted && (
                <form
                  id={formID}
                  onSubmit={handleSubmit(onSubmit)}
                  className={'flex w-full flex-1 flex-col'}
                >
                  {renderFormFields()}
                  <Button
                    form={formID}
                    type="submit"
                    className={'ml-auto w-full px-8 sm:w-fit'}
                    variant="default"
                  >
                    {submitButtonLabel}
                  </Button>
                </form>
              )}
            </FormProvider>
          </>
        )
    }
  }

  return (
    <div id={'contact-form'} className="">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className="flex flex-col items-start justify-stretch gap-16 lg:flex-row lg:items-center">
        {renderFormVariant()}
      </div>
    </div>
  )
}
