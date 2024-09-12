import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

export default function loading() {
    const skeletonArray = Array(5).fill(null);
  return (
    <section>

      
      <div className='max-w-[950px] overflow-clip m-auto' ><Skeleton height={20} /></div>

      <section className=" grid lg:grid-cols-[auto_1fr] mx-auto ">
        <div className="containerr px-2 md:px-6 py-10 pt-0 m-auto ">

            {/* Both */}
        <section className="grid relative lg:grid-cols-[1fr_1fr] gap-3 max-w-[1000px]">
              
        <div className=" lg:w-[700px]">

            <article
            className="col-span-2 mb-4 bg-second_color_light dark:bg-second_color_dark rounded-lg relative"
            >
              <span>
                  <Skeleton height={400} />
                  <Skeleton height={300} />
              </span>
            </article>
                {/* <ArticleHero data={data} category={params.kategori} startIndex={0} endIndex={1} /> */}

                <aside className="hidden lg:inline-block">

                  {/* <SubArticlesListWide data={data} category={params.kategori} startIndex={1} endIndex={3} /> */}
                  <Skeleton height={80} />
                  <Skeleton height={80}  />

                </aside>

        </div>



              <aside className="hidden w-[280px] lg:inline-block">



              <section
      id="trending"
      className=" md:px-2 min-w-[280px] xl:w-full  rounded-2xl h-fit grid place-content-center"
    >


      <div>
        {/*  Header Start */}
        <h1 className="lineHeader text-center text-[0.95rem] font-bold mb-4">
          <span className="bg-accent-color-gradient text-white px-4 py-1">
            TOPNYHEDER
          </span>
        </h1>
        {/*  Header End */}

        <ul className="space-y-4">
          {skeletonArray.map((_, index) => (
            <li key={index}>
              <article className="bg-second_color_light dark:bg-second_color_dark rounded-2xl">
                {/*  Image Desktop Skeleton */}
                <figure className="hidden md:block w-full h-[5em] md:h-[7em] rounded-t-xl bg-gray-300 overflow-clip">
                  <Skeleton height="100%" width={250} />
                </figure>

                <div className="md:pb-2 md:pt-1 md:px-3">
                  {/*  Læsetid Desktop Skeleton */}
                  <span className="hidden md:inline-block">
                    <Skeleton width={80} height={20} />
                  </span>

                  <div className="flex items-center md:pb-2">
                    {/*  Image Mobile Skeleton */}
                    <figure className="block md:hidden max-w-20 mr-6 rounded-xl overflow-clip">
                      <Skeleton width={100} height={100} />
                    </figure>

                    <div>
                      <span className="inline-block md:hidden">
                        <Skeleton width={80} height={20} />
                      </span>

                      {/*  Title Skeleton */}
                      <h2 className="ml-2 text-main_color_dark dark:text-main_color_light font-semibold transition-colors text-sm">
                        <Skeleton width={150} height={20} />
                      </h2>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>


      </div>

    </section>



                {/* <TrendingArticlesListAltOmKendte
                dayInterval={14}
                views={0}
                startIndex={0}
                endIndex={100}
                data={data} category={params.kategori}
                articleAmount={5} 
                 /> */}

              </aside>

            </section>






            <aside className="mobile md:hidden" ></aside>
            <aside className="desktop hidden md:block" ></aside>
            
















            {/* Phone */}
            <section className="grid gap-4 md:hidden">
            <section
      id="trending"
      className=" md:px-2 min-w-[280px] xl:w-full  rounded-2xl h-fit grid place-content-center"
    >
      <div>
        {/*  Header Start */}
        <h1 className="lineHeader text-center text-[0.95rem] font-bold mb-4">
          <span className="bg-accent-color-gradient text-white px-4 py-1">
            TOPNYHEDER
          </span>
        </h1>
        {/*  Header End */}

        <ul className="space-y-4">
          {skeletonArray.map((_, index) => (
            <li key={index}>
              <article className="bg-second_color_light dark:bg-second_color_dark rounded-2xl">
                {/*  Image Desktop Skeleton */}
                <figure className="hidden md:block w-full h-[5em] md:h-[7em] rounded-t-xl bg-gray-300 overflow-clip">
                  <Skeleton height="100%" width={250} />
                </figure>

                <div className="md:pb-2 md:pt-1 md:px-3">
                  {/*  Læsetid Desktop Skeleton */}
                  <span className="hidden md:inline-block">
                    <Skeleton width={80} height={20} />
                  </span>

                  <div className="flex items-center md:pb-2">
                    {/*  Image Mobile Skeleton */}
                    <figure className="block md:hidden max-w-20 mr-6 rounded-xl overflow-clip">
                      <Skeleton width={100} height={100} />
                    </figure>

                    <div>
                      <span className="inline-block md:hidden">
                        <Skeleton width={80} height={20} />
                      </span>

                      {/*  Title Skeleton */}
                      <h2 className="ml-2 text-main_color_dark dark:text-main_color_light font-semibold transition-colors text-sm">
                        <Skeleton width={150} height={20} />
                      </h2>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
              <aside className="mobile md:hidden" ></aside>
              {/* <SubArticlesGrid data={data} category={params.kategori} startIndex={1} endIndex={3} /> */}
              <div className="mt-6 block">
              <article
          className="col-span-2 mb-4 bg-second_color_light dark:bg-second_color_dark rounded-lg relative"
        >
            <span>
                <Skeleton height={300} />
                <Skeleton height={200} />
            </span>
            </article>
                {/* <ArticleHero data={data} startIndex={3} endIndex={4} /> */}
              </div>
              <aside className="mobile md:hidden" ></aside>
              {/* <SubArticlesGrid data={data} category={params.kategori} startIndex={4} endIndex={6} /> */}
              <div className="mt-4 block">
              <article
          className="col-span-2 mb-4 bg-second_color_light dark:bg-second_color_dark rounded-lg relative"
        >
            <span>
                <Skeleton height={300} />
                <Skeleton height={200} />
            </span>
            </article>
                {/* <ArticleHero data={data} category={params.kategori} startIndex={6} endIndex={7} /> */}
              </div>
            </section>




        </div>
      </section>
    </section>
  )
}

