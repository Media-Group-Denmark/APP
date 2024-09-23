import React from "react";
import { ArticleLink } from "../../../utils/ArticleLink";

export default function SearchButton() {
  return (
    <ArticleLink className="hidden lg:block" href={"/artikler/findartikel"}>
      <div>
        <button
          type="submit"
          aria-label="Søg artikler"
          className="flex flex-end items-center bg-accent_color_dark dark:bg-bg-accent_color_light bg-opacity-80 justify-center w-12 h-12 rounded-lg"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
    </ArticleLink>
  );
}
