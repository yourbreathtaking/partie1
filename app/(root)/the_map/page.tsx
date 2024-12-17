
'use client'
import React from 'react'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('../components/Map'), { ssr: false });

const page = () => {
  return (
    <>
    <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <Map />
            <div className="aspect-video rounded-xl bg-muted/50" > 
            
            </div>
            
          </div>
        </div>
    </>
    
  )
}

export default page