import { timeSinceText } from '@/app/components/ArticleTools/TimeSinceTag';
import { client, urlFor } from '@/app/lib/sanityclient';
import { Article } from '@/app/models/article';
import Link from 'next/link';
import React from 'react'
import AdminSideBar from '../components/sideBar';
export const revalidate = 600;

async function getData() {
    const today: Date = new Date();
    const query = `
      *[
        _type == "article" && publishedAt > "${today.toISOString()}"
      ]
       | order(coalesce(publishedAt, _createdAt) desc) [0...50] {
        _id,
        _createdAt,
        _updatedAt,
        _type,
        title,
        teaser,
        publishedAt,
        isPublished,
        changePublishDate,
        "articleSlug": slug.current,
        "image": metaImage.asset,
        "category": category->name,
        "categorySlug": category->slug.current,
        "tag": tag[]->name,
        "tagSlug": tag[]->slug.current,
        "JournalistName": journalist->name,
        "JournalistPhoto": journalist->image,
        "JournalistSlug": journalist->slug.current,
        views,
        reading
      }`;
    const data = await client.fetch(query);
    console.log(data, 'dataaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    return data;
  }




export default async function ScheduledPost() {
    const data: Article[] = await getData();
    
    const groupArticlesByDate = data.reduce((groups: any, article) => {
        const date = article.publishedAt.split('T')[0];

        if (!groups[date]) {
            groups[date] = [];
        }

        groups[date].push(article);

        return groups;
    }, {});

    console.log(groupArticlesByDate, 'her er en gruppe af artikler');
  return (
    <main className='grid grid-cols-[auto_1fr] place-content-start pt-6'>
      <AdminSideBar />
        <section className='mt-6'>
          <header className='grid place-content-center text-center'>
              <h1 className='text-4xl'>Planlagte Artikler</h1>
              <p className='text-xl'>Her kan du se en liste over alle artikler der er planlagt til udgivelse.</p>
          </header>

          {
            data && data.length > 0 ? (
              Object.keys(groupArticlesByDate).map(date => (
                <section className='bg-second_color_light dark:bg-second_color_dark p-4 rounded-lg !mt-12'>
                    <h2 className='text-xl py-4 text-center'>Planlagt til <br /> <span className='text-3xl font-extrabold'>{date}</span></h2>
              <article className="grid overflow-y-hidden grid-cols-2 gap-4 md:gap-8 mt-4 lg:mt-0 relative">
                  {groupArticlesByDate[date].map((post: Article) => (
                      <div
                      key={date}
                      className="bg-second_color_light drop-shadow-xl dark:bg-second_color_dark rounded-lg relative"
                    >
                    <Link href={`/admin/preview/artikel/${post.articleSlug}`}>
                          <figure className="block w-full h-[7em] md:h-[10em] bg-gray-300 rounded-t-lg overflow-hidden">
                            
                              <img
                              width={400}
                              height={300}
                                src={urlFor(post.image)
                                  .format("webp")
                                  .width(400)
                                  .height(300)
                                  .fit("fill")
                                  .quality(85)
                                  .url()}
                                  loading='lazy'
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            
                          </figure>
                          <div className="grid grid-rows-[auto_1fr] md:grid-rows-[auto_1fr_auto] h-[200px] mx-2 md:mx-4 mb-4">
                            <aside className="sm:grid align-middle mt-2 h-fit md:my-2">
                              
                              
                              <time
                                className="rounded-lg sm:my-auto my-1 text-lg"
                                dateTime={post.publishedAt}
                              >
                              <span className='text-2xl font-extrabold'>Klokken : </span>
                              <span className='text-2xl font-extrabold'>   
          {new Intl.DateTimeFormat('da-DK', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }).format(new Date(post.publishedAt))}
        </span>
                              </time>
                              <aside className='grid grid-cols-[auto_auto] place-content-start gap-x-4 mt-2 '>
                                  <p className="text-sm">
                                  Kategori: {post.category} |
                                </p>
                                <p className="text-sm">
                                    Journalist: {post.JournalistName} |
                                </p>
                                <p className="text-sm">
                                    Læsetid: {post.reading} minutter |
                                </p>
                                <p className="text-sm">
                                    Tag: {post.tag}
                                </p>
                              </aside>
                            </aside>
                            <header>
                             
                                <h1 className="text-sm md:text-lg font-bold py-0 rounded-lg">
                                  {post.title}
                                </h1>
                            </header>
                          </div>
        </Link>
                      </div>
        ))}
              </article>
            </section>
                  ))
            ) : (  <p className='text-center'>Der er ingen artikler i schedule mode</p> )
          }


        </section>
    </main>
  )
}
