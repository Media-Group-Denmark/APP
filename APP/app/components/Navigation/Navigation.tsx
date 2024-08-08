"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchNavData } from "./fetchNavServer";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { MoonIcon, SearchIcon, SunIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { urlFor } from "@/app/lib/sanityclient";
import theme from "@/app/lib/theme.json";
export const revalidate = 80000;

type NavigationItem = {
  name: string;
  href: string;
  current: boolean;
  _key: string;
};

const NavigationItem = ({ item, closeMenu }: {item: any, closeMenu: any} ) => {
  const router = useRouter(); 
  
  const handleClick = (e: any) => {
    e.preventDefault(); 
    closeMenu(); 
    router.push(item.href); 
  };

  return (
    <Link
      href={item.href}
      key={item._key}
      onClick={handleClick}
      className={`inline-flex items-center border-b-2 text-sm font-medium ${
        item.current
          ? "border-indigo-500 text-gray-900 dark:text-gray-200"
          : "border-transparent text-gray-600 dark:text-gray-200 hover:border-gray-300 hover:dark:text-gray-300"
      }`}
    >
      {item.name}
    </Link>
  );
};



const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);
  const [stickyNav, setStickyNav] = useState(false);
  const [logo, setLogo] = useState("");

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("dark mode") === "on";
    }
    return false;
  });


useEffect(() => {
  const root = document.documentElement;
  if (darkMode) {
    root.classList.add('dark');
    localStorage.setItem("dark mode", "on");
  } else {
    root.classList.remove('dark');
    localStorage.setItem("dark mode", "off");
  }

}, [darkMode]);

  useEffect(() => {

    async function loadNavigation() {
      const navData = await fetchNavData();
      if (navData) {
        if(!darkMode){ 
          setLogo(navData.logo._ref) 
        } else { 
          setLogo(navData.logoDark._ref) 
        }
        const navItems = [
          ...(navData.frontpageBoolean
            ? [{ name: "Forside", href: "/", current: pathname === "/" }]
            : []),
          ...navData.navItems.map((item: { name: any; slug: any }) => ({
            name: item.name,
            href: `/artikler/kategori/${item.slug}`,
            current: pathname === `/artikler/kategori/${item.slug}`,
          })),
        ];
        setNavigation(navItems);
      }
    }

    loadNavigation();
  }, [pathname, darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      // Kontroller skærmbredden for at bestemme, hvilket scroll-trigger-niveau der skal bruges
      const isDesktop = window.innerWidth > 800;
      const scrollTriggerHeight = isDesktop ? 260 : 0;

      // Opdaterer sticky-nav-tilstanden baseret på scroll-positionen
      setStickyNav(window.scrollY > scrollTriggerHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Disclosure
      as="nav"
      className={` bg-second_color_light dark:bg-second_color_dark min-h-[60px] z-50 border-t-2 border-slate-50 w-screen 
        ${stickyNav ? "fixed top-0" : "block"}`}
    >
      {({ open, close }) => (
        <>
          <div className=" mx-auto px-2 sm:px-6 lg:px-8 grid place-content-center">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex items-center w-[1000px] px-2 lg:px-0">
                <div className="flex-shrink-0">
                <Link href="/">
                <Image
                  className="w-auto h-auto "
                  width={100}
                  height={60}
                  src={logo ? urlFor(logo).url() : theme.logo_url}
                  alt="Logo"
                />
              </Link>
                </div>
                <div className="hidden lg:grid grid-cols-1 lg:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <div>
                        <NavigationItem key={item._key} item={item} closeMenu={close}/>
                        <p>{item._key} {item[0]}</p>
                      </div>
                    ))}
                  </div>
                </div>

<label className="ml-auto mr-4  cursor-pointer">
  <input className='toggle-checkbox' type='checkbox' checked={darkMode} onChange={() => setDarkMode(!darkMode)}></input>
  <div className='toggle-slot'>
    <div className='sun-icon-wrapper'>
      <SunIcon color={'#ffbb52'} className="iconify sun-icon" />
      <div className="iconify sun-icon" data-icon="feather-sun" data-inline="false"></div>
    </div>
    <div className='toggle-button'></div>
    <div className='moon-icon-wrapper'>
      <MoonIcon className="iconify moon-icon" />
      <div className="iconify moon-icon" data-icon="feather-moon" data-inline="false"></div>
    </div>
  </div>
</label>



                  <Link className="hidden lg:block" href={"/artikler/findartikel"}>
                    <div>
                      <button
                        type="submit"
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
                  </Link>
                  

                <div className="flex lg:hidden ">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16m-7 6h7"
                        />
                      </svg>
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                key={item._key}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault(); // Stopper standard link opførsel
                  close(); // Lukker menuen
                  router.push(item.href); // Navigerer manuelt
                }}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    item.current
                      ? "bg-indigo-50 border-indigo-500 text-accent_color_light dark:text-accent_color_dark"
                      : "border-transparent text-text_second_color_dark dark:text-text_second_color_light hover:bg-gray-50 hover:dark:bg-gray-300 hover:border-gray-300 hover:text-gray-800"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link className="block flex gap-2 bg-indigo-400 bg-opacity-20 pl-3 pr-4 py-2 text-[1rem]" href={"/artikler/findartikel"}><SearchIcon width={16} />  <p>Søg Artikler</p></Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navigation;
