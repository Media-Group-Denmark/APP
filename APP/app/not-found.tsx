import Link from 'next/link'
import React from 'react'
import SubArticlesListSmallOrderRelease from './components/ArticleDisplaySystems/StaticSystems/SubArticlesListSmallOrderRelease'

export default function NotFound() {
  return (
    <section>
        <div className="flex items-center p-16 ">
        <div className="container flex flex-col items-center ">
            <div className="flex flex-col gap-6 max-w-md text-center">
                <h2 className="font-extrabold text-8xl text-gray-600 dark:text-gray-100">
                    <span className="sr-only">Fejl</span>404
                </h2>
                <p className="text-xl md:text-2xl dark:text-gray-300">Beklager, denne side kunne ikke findes.</p>
                <Link href="#" className="px-8 py-4 text-xl font-semibold rounded bg-accent_color_dark dark:bg-bg-accent_color_light text-white hover:text-gray-200">Tilbage til Forsiden</Link>
            </div>
        </div>
    </div>
        <SubArticlesListSmallOrderRelease />
    </section>
  )
}
