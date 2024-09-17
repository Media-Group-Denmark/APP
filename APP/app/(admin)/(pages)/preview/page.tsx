import { client, urlFor } from '@/app/lib/sanityclient';
import { Article } from '@/app/(home)/models/article';
import { ArticleLink } from '@/app/(home)/components/utils/ArticleLink';
import React from 'react'
export const revalidate = 600;

async function getData() {
    const today: Date = new Date();
    const query = `
      *[
        _type == "article" && previewMode == true
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
        reading,
        previewMode
      }`;
    const data = await client.fetch(query);
    return data;
  }




export default async function PagePreview() {
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
    <section className='grid grid-cols-[auto_1fr] place-content-start pt-6'>
      <AdminSideBar />
        <section className='mt-12'>
          <header className='grid place-content-center text-center'>
              <h1 className='text-4xl'>Artikler i Preview Mode</h1>
              <p className='text-xl'>Her kan du se en liste over alle artikler der er i preview mode.</p>
          </header>
        
          <section className='bg-second_color_light dark:bg-second_color_dark p-4 rounded-lg !mt-12'>
        <article className="grid overflow-y-clip grid-cols-2 gap-4 md:gap-8 mt-4 lg:mt-0 relative">
          {
            data && data.length > 0 ? ( 
                  data.map((post: Article) => (
                    <div
                    key={post._id}
                    className="bg-second_color_light drop-shadow-xl dark:bg-second_color_dark rounded-lg relative"
                  >
                  <ArticleLink href={`/admin/preview/artikel/${post.articleSlug}`}>
                        <figure className="block w-full h-[7em] md:h-[10em] bg-gray-300 rounded-t-lg overflow-clip">
                          
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
                            <span className='font-extrabold'> Sat til ugivelse klokken : </span>
                            <span className='font-extrabold'>   
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
      </ArticleLink>
                    </div>
      ))
                
                
     ) : ( <p className='text-center'>Der er ingen artikler i preview mode</p> )
          }
            
        </article>
        </section>
        </section>
       
    </section>
  )
}