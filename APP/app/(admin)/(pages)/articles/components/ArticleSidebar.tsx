'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useEffect } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../../components/shadcn/ui/card";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../../components/shadcn/ui/table";
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "../../../components/shadcn/ui/tabs";
  import { Badge } from "../../../components/shadcn/ui/badge";
  import theme from "@/app/lib/theme.json";
import { Article } from '@/app/(home)/(pages)/(article-collections)/models/article';
import { urlFor } from '@/app/lib/sanityclient';

export default function ArticleSidebar({searchParams, pathname, articles} : {searchParams: string, pathname: string, articles: Article[]}) {
 


  useEffect(() => {
    const url = `${pathname}?${searchParams}`
  }, [pathname, searchParams])

  return (
       <section className="flex-1 max-w-[500px]  h-screen overflow-y-scroll">
       <nav className="grid items-start text-sm  font-medium">
       <aside className="grid flex-1 items-start  gap-4 md:gap-8">
          <Tabs defaultValue="watch">
            <div className="items-center hidden  gap-2">
              <TabsList>
                <TabsTrigger value="watch">Watch</TabsTrigger>
              </TabsList>
            </div>
  
            <TabsContent className='mt-0 ' value="watch">
              <Card x-chunk="dashboard-06-chunk-0" className='rounded-none'>
                <CardContent>
                  <Table>
                    <TableBody >
                      {articles?.length > 0
                        ? articles.map((article) => (
                            <TableRow className='pointer'>
                              <TableCell className="hidden sm:table-cell">
                                <figure className="relative">
                                  <img
                                    width={50}
                                    height={50}
                                    src={urlFor(article.image)
                                      .format("webp")
                                      .width(50)
                                      .height(50)
                                      .fit("fill")
                                      .quality(85)
                                      .url()}
                                    alt={`Billede af ${article.source}`}
                                    className="block w-full bg-gray-300 min-w-[50px] rounded-md object-cover"
                                  />
                                </figure>
                              </TableCell>
                              <TableCell className="font-medium w-[80vw] max-w-[50ch] ">
                                {article.title}
                              </TableCell>
                            </TableRow>
                          ))
                        : null}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </aside>
       </nav>
       
     </section>
  )
}