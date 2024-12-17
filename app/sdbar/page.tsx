import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from '../components/app-sidebar'

export default function Page() {
  return (
    <>
    
    <SidebarProvider>
            
            <AppSidebar />
            <main>
              <SidebarTrigger />
              <div>hello</div>
    
            </main>
          </SidebarProvider>
    </>
  )
}

