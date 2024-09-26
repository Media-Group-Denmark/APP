import React from 'react'
import { ArticleLink } from '../utils/ArticleLink';

const Breadcrumb: React.FC<{ navItem: string, link: string, navItemTwo: string | undefined }> = ({ navItem, link, navItemTwo }) => {
  return (
    <nav
        className="flex px-3 md:px-8 max-w-[1000px] m-auto text-fade_color_light dark:text-fade_color_dark py-6 pt-6 rounded-lg "
        aria-label="Breadcrumb"
      >
        {/* <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <ArticleLink
              href="/"
              className="text-sm text-fade_color_light dark:text-fade_color_dark hover:text-gray-900 dark:hover:text-gray-400 inline-flex items-center "
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Forside
            </ArticleLink>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <ArticleLink
                href={`${link}`}
                className="text-fade_color_light dark:text-fade_color_dark hover:text-gray-900 dark:hover:text-gray-400 ml-1 md:ml-2 text-sm font-medium "
              >
                {navItem}
              </ArticleLink>
            </div>
          </li>

        { navItemTwo && (
          <li className=" cursor-default " aria-current="page">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-accent_color_light dark:text-accent_color_dark ml-1 md:ml-2 text-sm font-medium capitalize ">
                {navItemTwo}
              </span>
            </div>
          </li>
        )}

        </ol> */}
      </nav>
  )
}

export default Breadcrumb;