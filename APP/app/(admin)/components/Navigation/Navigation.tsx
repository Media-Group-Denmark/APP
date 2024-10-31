'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useEffect } from 'react'

export default function Navigation({searchParams, pathname} : {searchParams: string, pathname: string}) {
 
  interface navItem {
    id: number;
    name: string;
    link: string;
    dropDown: boolean;
    dropDownItems?: Array<
      {
        id: number;
        name: string;
        link: string;
      }
    >
  }

  const navItems: navItem[] = [
     {
          id: 1,
          name: 'Dashboard',
          link: '/dashboard',
          dropDown: false,
     },
     /* {
          id: 1,
          name: 'Artikler',
          icon: <House className="h-4 w-4" />,
          link: '/articles',
          dropDown: false,
      }, */
      {
           id: 2,
           name: 'Referencer',
           /* icon: <House className="h-4 w-4" />, */
           link: '/scheduled',
           dropDown: true,
           dropDownItems: [
                {
                     id: 1,
                     name: 'Kateogrier',
                     link: '/scheduled',
                },
                {
                     id: 2,
                     name: 'Tags',
                     link: '/scheduled',
                },
           ]
      },
  ]

  useEffect(() => {
    const url = `${pathname}?${searchParams}`
  }, [pathname, searchParams])

  return (
     <div className='flex'>
       <section className="flex-1">
       <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
       {
       navItems.map(item => (
          item?.dropDown ? (
            <section>
              
              <aside className='grid grid-cols-2 '>
                <button
                    key={item.id}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname === item.link ? 'bg-red-200' : null }`}
                  >
                    <span>
                      {/* {item.icon} */}
                      {item.name}
                    </span>
                </button>
                    <span className='ml-auto'>{'>'}</span>
                    <div>
                      {
                        item.dropDownItems?.map(dropDownItem => (
                          <Link
                            key={dropDownItem.id}
                            href={dropDownItem.link}
                            className={`flex items-center gap-3 ml-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname === dropDownItem.link ? 'bg-muted' : null }`}
                          >
                            {/* {item.icon} */}
                            -  {dropDownItem.name}
                          </Link>
                        ))
                      }
                    </div>
              </aside>
            </section>
          ) : (
            <Link
                key={item.name}
                href={item.link}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname === item.link ? 'bg-muted' : null }`}
              >
                {/* {item.icon} */}
                {item.name}
            </Link>
          )
       ))
       }
       </nav>
       
     </section>
     </div>
  )
}
{/* <Link
  href="/test"
  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
>
  <ShoppingCart className="h-4 w-4" />
  Orders
  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
    6
  </Badge>
</Link> */}