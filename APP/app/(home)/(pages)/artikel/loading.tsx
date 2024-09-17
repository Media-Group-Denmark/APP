import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';


export default function loading() {
  return (
    <section className="">
      <section className="m-auto">
        <>
          <div >
            <div >
              <article className="w-full rounded-lg">
                <section>
                  <div className="grid ">
                    <p>
                      <button >
                        {<Skeleton width={100} height={40} />}
                      </button>
                      <button >
                        {<Skeleton width={100} height={20} />}
                      </button>
                    </p>
                  </div>
                  <header>
                    <h1 >
                    {<Skeleton height={80} />}
                    </h1>
                  </header>
                  <footer >
                    <div >
                      <time className=" hidden md:block text-xs">
                      {<Skeleton width={150} height={20} />}
                      </time>

                      <div >
                        <p>
                          <p >
                            
                            <b >
                            {<Skeleton width={300} height={20} />}
                            </b>
                          </p>
                        </p>
                      </div>
                    </div>
                  </footer>
                  <figure className="relative block ">
                  {<Skeleton height={400} />}
                    
                  </figure>
                  <div className="my-2 px-3 ">
                    
                      <button>
                      {<Skeleton width={350} height={25} />}
                      </button>
                  </div>
                  </section>
                <section>
                {<Skeleton height={800} />}
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
