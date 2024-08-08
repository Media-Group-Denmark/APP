"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ChangeEvent, useTransition, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import React from "react";

export function SearchBar({ category, journalist, tag }: { category: any[], journalist: any[], tag: any[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  /* ---------------------------- Categeory Filter ---------------------------- */
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [usertoggleCategory, setUsertoggleCategory] = useState<boolean>(false);
  const [textCategory, setTextCategory] = useState<string>("Alle Kategorier");

  const toggleCategory = () => {
    setUsertoggleCategory(!usertoggleCategory);
  };

  const selectCategory = (categoryName: string, categorySlug: string) => {
    setTextCategory(categoryName);
    setSelectedCategory(categorySlug);
    handleSearch(searchParams.get("q"), categorySlug, selectedJournalist, selectedTag);
  };

  /* ---------------------------- Journalist Filter --------------------------- */
  const [selectedJournalist, setSelectedJournalist] = useState<string>("");
  const [usertoggleJournalist, setUsertoggleJournalist] = useState<boolean>(false);
  const [textJournalist, setTextJournalist] = useState<string>("Alle Journalister");

  const toggleJournalist = () => {
    setUsertoggleJournalist(!usertoggleJournalist);
  };

  const selectJournalist = (journalistName: string, journalistSlug: string) => {
    setTextJournalist(journalistName);
    setSelectedJournalist(journalistSlug);
    handleSearch(searchParams.get("q"), selectedCategory, journalistSlug, selectedTag);
  };

  /* ------------------------------- Tag Filter ------------------------------- */
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [usertoggleTag, setUsertoggleTag] = useState<boolean>(false);
  const [textTag, setTextTag] = useState<string>("Alle Tags");

  const toggleTag = () => {
    setUsertoggleTag(!usertoggleTag);
  };

  const selectTag = (tagName: string, tagSlug: string) => {
    setTextTag(tagName);
    setSelectedTag(tagSlug);
    handleSearch(searchParams.get("q"), selectedCategory, selectedJournalist, tagSlug);
  };

  const handleSearch = useDebouncedCallback(
    (
      query = searchParams.get("q") || "",
      category = selectedCategory,
      journalist = selectedJournalist,
      tag = selectedTag
    ) => {
      const updatedSearchParams = new URLSearchParams(searchParams.toString());

      if (query) {
        updatedSearchParams.set("q", query);
      } else {
        updatedSearchParams.delete("q");
      }

      if (category) {
        updatedSearchParams.set("category", category);
      } else {
        updatedSearchParams.delete("category");
      }

      if (journalist) {
        updatedSearchParams.set("journalist", journalist);
      } else {
        updatedSearchParams.delete("journalist");
      }

      if (tag) {
        updatedSearchParams.set("tag", tag);
      } else {
        updatedSearchParams.delete("tag");
      }

      startTransition(() => {
        router.replace(`${pathname}?${updatedSearchParams.toString()}`);
      });
    },
    300
  );

  return (
    <div className="containerr relative z-10 mx-auto pb-12 ">
      <div className="rounded-lg  p-10 shadow-lg bg-main_color_light dark:bg-second_color_dark">

        
        <div className="mb-4 flex items-center">
          <input
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-lg border bg-main_color_light dark:bg-main_color_dark  border-gray-400 p-2"
            placeholder="Søg i arkivet ..."
          />
        </div>

        <div className="grid md:flex gap-4">
          <div
            onClick={() => toggleCategory()}
            className="relative group md:w-[200px]"
          >
            <button
              id="dropdown-button"
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium  bg-main_color_light dark:bg-main_color_dark border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              <span className="mr-2">{textCategory}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2 -mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {usertoggleCategory && (
              <div
                id="dropdown-menu"
                className="max-h-[300px] z-20 w-full overflow-y-scroll absolute right-0 mt-2 rounded-md shadow-lg 
                bg-main_color_light dark:bg-main_color_dark text-text_main_color_dark dark:text-text_main_color_dark ring-1 ring-black ring-opacity-5 p-1 space-y-1"
              >
                <p
                  onClick={() => selectCategory("Alle Kategorier", "")}
                  className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-500 active:bg-blue-100 cursor-pointer rounded-md"
                >
                  Alle kategorier
                </p>
                {category.map((cat) => (
                  <p
                    key={cat._id}
                    onClick={() => selectCategory(cat.name, cat.slug)}
                    className="block px-4 py-2 hover:bg-gray-200  dark:hover:bg-gray-500 active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    {cat.name}
                  </p>
                ))}
              </div>
            )}
          </div>
  
          <div
            onClick={() => toggleJournalist()}
            className="relative group md:w-[200px]"
          >
            <button
              id="dropdown-button"
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium bg-main_color_light dark:bg-main_color_dark border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              <span className="mr-2">{textJournalist}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2 -mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {usertoggleJournalist && (
              <div
                id="dropdown-menu"
                className="max-h-[300px] z-20 w-full overflow-y-scroll absolute right-0 mt-2 rounded-md shadow-lg 
                bg-main_color_light dark:bg-main_color_dark text-text_main_color_dark dark:text-text_main_color_dark ring-1 ring-black ring-opacity-5 p-1 space-y-1"
              >
                <p
                  onClick={() => selectJournalist("Alle Journalister", "")}
                  className="block px-4 py-2  hover:bg-gray-200  dark:hover:bg-gray-500 active:bg-blue-100 cursor-pointer rounded-md"
                >
                  Alle Journalister
                </p>
                {journalist.map((cat) => (
                  <p
                    key={cat._id}
                    onClick={() => selectJournalist(cat.name, cat.slug)}
                    className="block px-4 py-2  hover:bg-gray-200  dark:hover:bg-gray-500 active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    {cat.name}
                  </p>
                ))}
              </div>
            )}
          </div>
  
          <div
            onClick={() => toggleTag()}
            className="relative group md:w-[200px]"
          >
            <button
              id="dropdown-button"
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium bg-main_color_light dark:bg-main_color_dark border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              <span className="mr-2">{textTag}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2 -mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {usertoggleTag && (
              <div
                id="dropdown-menu"
                className="max-h-[300px] z-20 w-full overflow-y-scroll absolute right-0 mt-2 rounded-md shadow-lg bg-main_color_light dark:bg-main_color_dark text-text_main_color_dark dark:text-text_main_color_dark ring-1 ring-black ring-opacity-5 p-1 space-y-1"
              >
                <p
                  onClick={() => selectTag("Alle tags", "")}
                  className="block px-4 py-2  hover:bg-gray-200  dark:hover:bg-gray-500 active:bg-blue-100 cursor-pointer rounded-md"
                >
                  Alle tags
                </p>
                {tag.map((cat) => (
                  <p
                    key={cat._id}
                    onClick={() => selectTag(cat.name, cat.slug)}
                    className="block px-4 py-2  hover:bg-gray-200  dark:hover:bg-gray-500 active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    {cat.name}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
