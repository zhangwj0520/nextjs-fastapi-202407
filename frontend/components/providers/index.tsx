'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import type { ThemeProviderProps } from 'next-themes/dist/types'
import { ReactQueryProviders } from './query-provider'
import { SidebarProvider } from '@/lib/hooks/use-sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <SidebarProvider>
        <TooltipProvider>
          <ReactQueryProviders>
            {/* <ReactSessionProvider> */}
            {children}
            {/* </ReactSessionProvider> */}
          </ReactQueryProviders>
        </TooltipProvider>
      </SidebarProvider>
    </NextThemesProvider>
  )
}
