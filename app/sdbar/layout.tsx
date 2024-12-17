import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from '../components/app-sidebar'


const Layout = ({children}: {children : React.ReactNode }) => {

    return (
    
        <SidebarProvider>
            
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}

        </main>
      </SidebarProvider>
  )
}

export default Layout

