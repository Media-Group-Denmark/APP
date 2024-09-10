import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';


export default function loading() {
  return (
    <section className="bg-[#fff] dark:bg-main_color_dark border-y-2 border-gray-100 md:pt-4 ">
      <section className="m-auto">
        <>
          <div className="py-3 rounded-lg lg:py-8 articleSection ">
            <div className="containerr lg:px-6 grid-cols-1 pt-0 mx-auto articleContent grid gap-6 ">
              <article className="w-full rounded-lg">
                <section>
                  <div className="grid ">
                    <p>
                      <button className="text-accent_color_light hidden md:block dark:text-accent_color_dark font-bold uppercase text-md lg:text-xl rounded-lg">
                        {<Skeleton width={100} height={40} />}
                      </button>
                      <button className="text-accent_color_light block md:hidden dark:text-accent_color_dark font-bold uppercase text-md lg:text-xl rounded-lg">
                        {<Skeleton width={100} height={20} />}
                      </button>
                    </p>
                  </div>
                  <header>
                    <h1 className="text-xl lg:text-4xl font-extrabold my-1 lg:my-2">
                    {<Skeleton height={80} />}
                    </h1>
                  </header>
                  <footer className="py-1 lg:py-4">
                    <div className="items-center p-2 mt-1 md:mt-2 border-t-2 border-gray-200">
                      <time className=" hidden md:block text-xs">
                      {<Skeleton width={150} height={20} />}
                      </time>

                      <div className="flex gap-x-2 lg:mt-2 align-middle">
                        <p>
                          <p className="text-fade_color_light  dark:text-fade_color_dark font-semibold text-xs lg:text-md">
                            
                            <b className="text-text_second_color_dark dark:text-text_second_color_dark text-xs lg:text-md">
                            {<Skeleton width={300} height={20} />}
                            </b>
                          </p>
                        </p>
                      </div>
                    </div>
                  </footer>
                  <figure className="relative block w-full h-[14em] md:h-[25em] overflow-clip bg-gray-300 rounded-t-lg object-cover">
                  {<Skeleton height={400} />}
                    <figcaption className="absolute text-xs lg:text-sm bottom-0 right-0 text-gray-300 p-1 bg-gray-400 bg-opacity-50">
                      Foto:
                    </figcaption>
                  </figure>
                  <div className="my-2 px-3 ">
                    
                      <button className="text-xs lg:text-sm text-fade_color_light dark:text-fade_color_dark relative rounded-full px-3 py-1.5 font-medium hover:bg-gray-100">
                      {<Skeleton width={100} height={25} />}
                      </button>
                      <button className="text-xs lg:text-sm text-fade_color_light dark:text-fade_color_dark relative rounded-full px-3 py-1.5 font-medium hover:bg-gray-100">
                      {<Skeleton width={100} height={25} />}
                      </button>
                      <button className="text-xs lg:text-sm text-fade_color_light dark:text-fade_color_dark relative rounded-full px-3 py-1.5 font-medium hover:bg-gray-100">
                      {<Skeleton width={100} height={25} />}
                      </button>
                  </div>
                  <h2 className="text-md lg:text-2xl hidden md:block  font-semibold my-2 mb-4 lg:my-4 px-3">
                  {<Skeleton height={250} />}
                  </h2>
                  <h2 className="text-md lg:text-2xl font-semibold block md:hidden my-2 mb-4 lg:my-4 px-3">
                  {<Skeleton height={100} />}
                  </h2>
                </section>

                <aside className="mobile md:hidden"></aside>

                <aside className="desktop hidden md:grid"></aside>

                <section className="articleText leading-8 px-3 text-lg prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-primary">
                {<Skeleton height={500} />}
                {<Skeleton height={200} />}
                {<Skeleton height={200} />}
                {<Skeleton height={200} />}
                {<Skeleton height={200} />}
                </section>
                <section></section>
              </article>
            </div>
          </div>
        </>
      </section>
    </section>
  );
}
