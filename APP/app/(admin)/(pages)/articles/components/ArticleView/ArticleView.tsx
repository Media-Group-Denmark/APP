'use client'
import { Input } from '@/app/(admin)/components/shadcn/ui/input';
import { Label } from '@/app/(admin)/components/shadcn/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/(admin)/components/shadcn/ui/select";
import { Textarea } from '@/app/(admin)/components/shadcn/ui/textarea';
import { ArticleModel } from '@/app/(home)/(pages)/(article-collections)/models/article'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import { urlFor } from '@/app/lib/sanityclient';
import TextEditor from '../TextEditor/TextEditor';







export default function ArticleView({articles} : {articles: ArticleModel[]}) {
  
  
  const searchParams = useSearchParams();
  const articleSlug = searchParams.get('article');


  return (
    <section className='overflow-y-scroll h-screen'>
    <div className='w-full m-auto  max-w-[900px] p-8 '>
        {
          articleSlug === null && (
            <h1>Klik på en artikel og fremvis den her</h1>
          )
        }
      {
      articles?.map((article) => ( 
        articleSlug === article.articleSlug && (
          <>
            <aside >
        <Label htmlFor="email">Title</Label>
        <Input type="email" id="email" placeholder="Email" value={article?.title} /> 
          </aside>
          <aside>
            <Label htmlFor="img">Image</Label>
            <figure className="relative h-[14em] md:h-[25em] overflow-clip" >
              <Image src={urlFor(article?.image).format("webp")
                              .width(700)
                              .height(400)
                              .quality(100)
                              .url()} 
                              alt={`Billede af ${article?.source}`}
                            className="block w-full  bg-gray-300 rounded-t-lg object-cover"
                            loading="eager"
                            fill
                            priority={true}
                            sizes="(max-width: 800px) 100vw, 700px"
                              
                              />
            </figure >
            <Label htmlFor="source">Image source</Label>
            <Input type="email" id="email" placeholder="Source" value={article?.source} /> 
          </aside>
  
          <aside>
          <Label htmlFor='textarea'>Teaser</Label>
            <Textarea placeholder='Write a teaser' content={article?.teaser} />
          </aside>
  
          <Label htmlFor='textarea'>Tekst</Label>
          {/* <aside>
            <Textarea placeholder='Write a text' content='Tekst' />
          </aside> */}

    <TextEditor />
          
  
          <aside>
          <Label htmlFor='select'>Category</Label>
          <Select>
        <SelectTrigger >
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
            <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
            <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
            <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
            <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
            <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Europe & Africa</SelectLabel>
            <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
            <SelectItem value="cet">Central European Time (CET)</SelectItem>
            <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
            <SelectItem value="west">
              Western European Summer Time (WEST)
            </SelectItem>
            <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
            <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Asia</SelectLabel>
            <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
            <SelectItem value="ist">India Standard Time (IST)</SelectItem>
            <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
            <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
            <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
            <SelectItem value="ist_indonesia">
              Indonesia Central Standard Time (WITA)
            </SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Australia & Pacific</SelectLabel>
            <SelectItem value="awst">
              Australian Western Standard Time (AWST)
            </SelectItem>
            <SelectItem value="acst">
              Australian Central Standard Time (ACST)
            </SelectItem>
            <SelectItem value="aest">
              Australian Eastern Standard Time (AEST)
            </SelectItem>
            <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
            <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>South America</SelectLabel>
            <SelectItem value="art">Argentina Time (ART)</SelectItem>
            <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
            <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
            <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
          </aside>
  
          <aside>
          <Label htmlFor='select'>Tag</Label>
          <Select>
        <SelectTrigger >
          <SelectValue placeholder="Select a Tag" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
            <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
            <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
            <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
            <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
            <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Europe & Africa</SelectLabel>
            <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
            <SelectItem value="cet">Central European Time (CET)</SelectItem>
            <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
            <SelectItem value="west">
              Western European Summer Time (WEST)
            </SelectItem>
            <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
            <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Asia</SelectLabel>
            <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
            <SelectItem value="ist">India Standard Time (IST)</SelectItem>
            <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
            <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
            <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
            <SelectItem value="ist_indonesia">
              Indonesia Central Standard Time (WITA)
            </SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Australia & Pacific</SelectLabel>
            <SelectItem value="awst">
              Australian Western Standard Time (AWST)
            </SelectItem>
            <SelectItem value="acst">
              Australian Central Standard Time (ACST)
            </SelectItem>
            <SelectItem value="aest">
              Australian Eastern Standard Time (AEST)
            </SelectItem>
            <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
            <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>South America</SelectLabel>
            <SelectItem value="art">Argentina Time (ART)</SelectItem>
            <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
            <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
            <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
          </aside>
          </>
        )
      )
    )
  }
      
    </div>
    </section>
  )
}
