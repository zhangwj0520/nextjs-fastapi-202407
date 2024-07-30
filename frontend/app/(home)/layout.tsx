import Link from 'next/link'
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  ShoppingCart,
  Users2,
} from 'lucide-react'

import { SearchInput } from '@/components/home/search'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { ThemeChange } from '@/components/home/theme'
import { FullScreen } from '@/components/home/full-screen'
import { User } from '@/components/home/user'

import { DesktopNav } from '@/components/home/sider-nav'
import { OpenApiConfig } from '@/components/fetch-config/index'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="h-screen w-screen flex bg-muted">
      <OpenApiConfig />
      <DesktopNav />
      <div className="flex-1 relative pb-4">
        <header className="h-[56px] bg-card z-30 flex items-center gap-4 border-b bg-background px-4 px-6">
          {/* <MobileNav /> */}
          {/* <DashboardBreadcrumb /> */}
          <SearchInput />
          <FullScreen />
          <ThemeChange />
          <User />
        </header>

        <main className="h-[calc(100vh-56px)] flex flex-col flex-1 overflow-auto p-4">
          <div className="*:m-4 rounded-lg">
            {children}
          </div>
        </main>
        {/* <main className="grid flex-1 items-start gap-2 p-6 bg-muted/40 overflow-y-auto">
          {children}
        </main> */}

      </div>

      {/* <DesktopNav />
      <div className="flex flex-1 flex-col sm:gap-4 sm:py-4">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <MobileNav />
          <DashboardBreadcrumb />
          <SearchInput />
          <ThemeChange />
          <User />
        </header>
        <main className="grid flex-1 items-start gap-2 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
          {children}
        </main>
      </div> */}
    </main>

  )
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Vercel</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Users2 className="h-5 w-5" />
            Customers
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <LineChart className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
