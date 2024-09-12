import React from 'react'
import AdminSideBar from './components/sideBar'
export const revalidate = 600;
export default function page() {
  return (
    <section className='grid grid-cols-[auto_1fr] place-content-start pt-6'>
        <AdminSideBar />
        
        <section>
            <h1 className='text-6xl'>Klik i navigationsmenuen til venstre for at navigere. Denn side vil blive optimeret med tiden</h1>
        </section>

    </section>
  )
}
