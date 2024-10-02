"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/app/(admin)/components/shadcn/ui/sheet";
import { Button } from "@/app/(admin)/components/shadcn/ui/button";
import { Menu, Package2 } from "lucide-react";
import { ArticleLink } from "../../../utils/ArticleLink";
import { urlFor } from "@/app/lib/sanityclient";
import Image from "next/image";
import theme from "@/app/lib/theme.json";
import DarkModeToggle from "./DarkModeToggle/DarkModeToggle";
import SearchButton from "./SearchBar";
import { getNavItems } from "../api/getNavItems";
import { usePathname, useSearchParams } from "next/navigation";
import MailChimpForm from "../../Footer/components/MailChimpForm";

export default function NewNav() {
  const [navData, setNavData] = useState<any>(null);
  const [logo, setLogo] = useState("");
  const [stickyNav, setStickyNav] = useState(false);
 
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false); // Close the menu when a link is clicked
  };


  function toggle() {
    const mode = localStorage.getItem("dark mode");
    if (mode === "on") {
      setLogo(navData?.logo._ref);
    } else {
      setLogo(navData?.logoDark._ref);
    }
  }
 /*  useEffect(() => {
    toggle(); 
  }, [navData]); */
  
  useEffect(() => {
    async function loadNavigation() {
      const data = await getNavItems();
      setNavData(data);
    }
    loadNavigation();
  }, []);


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
    <header className={`${stickyNav ? "fixed top-0" : "flex"} flex  items-center justify-center gap-4 border-b bg-second_color_light dark:bg-second_color_dark px-4 md:px-6`}>
      <nav className={` h-16 content-center bg-second_color_light dark:bg-second_color_dark w-screen items-center justify-center`} >
       <ul className={` md:w-[1000px] bg-second_color_light dark:bg-second_color_dark m-auto  flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 px-2 lg:pl-4 `}>
          <li className="flex-shrink-0">
            {
              navData ? (
                <ArticleLink href="/">
                <Image
                  src={logo ? urlFor(logo).url() :  theme.logo_url}
                  alt="Logo"
                  width={110}
                  height={62}
                  className="object-contain"
                />
              </ArticleLink>
              ) : null
            }
          </li>
          {navData?.frontpageBoolean ? (
            <li>
              <Link
                href="/"
                className="text-muted-foreground transition-colors hover:text-foreground hidden md:inline-block"
              >
                Forside
              </Link>
            </li>
          ) : null}
          {navData?.navItems.map((link: { _key: any; name: any; slug: any }) => {
            return (
              <li>
                <Link
                  key={link._key}
                  href={`/kategori/${link.slug}`}
                  className={`transition-colors hover:text-foreground hidden md:inline-block ${
                    pathname === `/kategori/${link.slug}`
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
          <span className="hidden md:grid grid-cols-2 items-center ml-auto ">
            <DarkModeToggle onClick={toggle} />
            <SearchButton />
          </span>
       </ul>
      </nav>

      {/*   Phone Nav */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <span className="grid md:hidden"><DarkModeToggle onClick={toggle} /></span>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden ml-auto"
            data-state={isOpen ? "open" : "closed"} // Set data-state based on isOpen state
          onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-medium">
              {navData
                ? navData.navItems.map(
                   (link: NavigationItem) => {
                    return (
                      <Link
                        key={link._key}
                        href={`/kategori/${link.slug}`}
                        className={`transition-colors hover:text-foreground ${
                          pathname === `/kategori/${link.slug}`
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                        onClick={handleLinkClick}
                      >
                        {link.name} 
                      </Link>
                    );
                  }
                )
              : null}
              <MailChimpForm />
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}