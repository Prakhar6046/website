import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto text-white">
      <div className="container flex flex-col gap-8 border-t border-border py-8 md:flex-row md:justify-between">
        <div className={'flex flex-row items-center gap-8'}>
          <Link className="flex items-center" href="/">
            <Logo />
          </Link>
          <p>© 2025 NordHouse Inc.</p>
        </div>

        <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center">
          {/*<ThemeSelector />*/}
          <nav className="flex flex-col gap-4 md:flex-row">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white underline" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
