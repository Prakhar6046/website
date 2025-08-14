'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { CMSLink } from '@/components/Link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiFacebook, SiInstagram } from '@icons-pack/react-simple-icons'
import { cn } from '@/utilities/ui'
import { FloatingNav } from '@/components/ui/floating-navbar'
interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const navItems = data?.navItems || []
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)

  const handleMobileNavToggle = () => {
    setMobileNavOpen((prev) => !prev)
  }

  useEffect(() => {
    setHeaderTheme(null)
    setMobileNavOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className={cn('container relative z-20')} {...(theme ? { 'data-theme': theme } : {})}>
      <div className="flex items-center justify-between py-8">
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>

        <FloatingNav
          className={'z-[1000] hidden md:flex'}
          navItems={navItems.map(({ link }) => ({
            name: link.label as string,
            link: link.url as string,
          }))}
        />

        <nav className="hidden items-center gap-x-6 md:flex md:gap-x-12 lg:gap-x-16">
          {navItems.map(({ link }, i) => {
            return (
              <div key={i} className={'relative ' + 'group'}>
                <CMSLink {...link} appearance="link" className={'!no-underline'} />
                <div
                  className={cn(
                    'absolute left-1/2 top-8 h-[2px] w-6 -translate-x-1/2 rounded-sm transition-all group-hover:w-5 group-hover:bg-foreground/50',
                    pathname === link.url ? '!w-4 !bg-foreground' : 'bg-transparent',
                  )}
                />
              </div>
            )
          })}
        </nav>

        <div className={'hidden gap-8 md:flex'}>
          <CMSLink size={'icon'} appearance={'inline'} url={'https://facebook.com'} newTab={true}>
            <SiFacebook className="h-6 w-6" />
          </CMSLink>
          <CMSLink
            size={'icon'}
            appearance={'inline'}
            url={
              'https://www.instagram.com/nordhouse.ca?utm_source=ig_web_button_share_sheet&igsh=NnZxYmM5eGlnOWF5'
            }
            newTab={true}
          >
            <SiInstagram className="h-6 w-6" />
          </CMSLink>
        </div>
        <Button
          data-collapse-toggle="mobile-menu"
          aria-controls="mobile-menu"
          variant={'link'}
          size={'icon'}
          className={'flex items-center justify-center md:hidden'}
          onClick={handleMobileNavToggle}
        >
          <Menu className="h-8 w-8" />
        </Button>
      </div>

      <header
        className={cn(
          'fixed left-0 top-0 h-full w-full bg-background transition-all',
          mobileNavOpen ? 'z-30' : '-z-20',
          mobileNavOpen ? 'block' : 'hidden',
          mobileNavOpen ? 'opacity-100' : 'opacity-0',
        )}
        id={'mobile-menu'}
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className={'container flex h-full flex-col'}>
          <div className="flex items-center justify-between py-8">
            <Link href="/">
              <Logo loading="eager" priority="high" className="invert dark:invert-0" />
            </Link>
            <Button
              data-collapse-toggle="mobile-menu"
              aria-controls="mobile-menu"
              variant={'link'}
              size={'icon'}
              className={'flex items-center justify-center'}
              onClick={handleMobileNavToggle}
            >
              <X className="h-8 w-8" />
            </Button>
          </div>

          <nav className="group flex flex-1 flex-col justify-center gap-6">
            {navItems.map(({ link }, i) => (
              <div key={i} className={'relative'}>
                <Link
                  href={link.url as string}
                  className={cn(
                    'text-foregroundSecondary transition-all hover:!text-foreground',
                    pathname === link.url ? '!text-foreground' : 'text-foregroundSecondary',
                  )}
                >
                  <p className={'text-xl'}>{link.label}</p>
                </Link>
                <div
                  className={cn(
                    'absolute top-1/2 h-[3px] w-5 -translate-x-10 rounded transition-all',
                    pathname === link.url ? 'bg-foreground' : 'bg-transparent',
                  )}
                />
              </div>
            ))}
            <div className={'mt-4 flex gap-8'}>
              <CMSLink
                size={'icon'}
                appearance={'inline'}
                url={'https://facebook.com'}
                newTab={true}
              >
                <SiFacebook className="h-6 w-6" />
              </CMSLink>
              <CMSLink
                size={'icon'}
                appearance={'inline'}
                url={
                  'https://www.instagram.com/nordhouse.ca?utm_source=ig_web_button_share_sheet&igsh=NnZxYmM5eGlnOWF5'
                }
                newTab={true}
              >
                <SiInstagram className="h-6 w-6" />
              </CMSLink>
            </div>
          </nav>
        </div>
      </header>
    </header>
  )
}
