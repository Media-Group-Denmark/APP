import React from 'react'

export default function page() {
  return (
    <main className='grid grid-cols-[auto_auto] gap-10 place-content-center '>
        <p>Hvor mange artikler er udgivet?</p>
        <p>Grafer / Stats ? </p>
        <p>Mest populære</p>
        <section>
            <button className='p-12 bg-green-200'>
                Sanity
            </button>
        </section>
        <section>
            <button className='p-12 bg-green-200'>
                Scheduled Posts
            </button>
        </section>

    </main>
  )
}
