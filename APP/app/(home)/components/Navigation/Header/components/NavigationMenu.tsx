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
import { usePathname, useSearchParams } from "next/navigation";
import MailChimpForm from "../../Footer/components/MailChimpForm";
export const revalidate = 60000;

export default function NavigationMenu() {
  const [navData, setNavData] = useState<any>(null);
  const [logo, setLogo] = useState("");

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

  useEffect(() => {
    async function loadNavigation() {
      const baseUrl = theme.local_url || theme.site_url; // Brug local_url hvis defineret, ellers site_url
      const apiUrl = `${baseUrl}/api/navigation`; // Dynamisk URL baseret på miljø

      try {
        const res = await fetch(apiUrl, {
          next: { revalidate: 3600 }, // Caching i Next.js
        });

        if (res.ok) {
          const data = await res.json();
          setNavData(data); // Opdater navigationen i state
        } else {
          console.error("Failed to fetch navigation:", res.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch navigation:", error);
      }
    }

    loadNavigation();
  }, []);

  return (
    <header
      className={`flex fixed top-0  items-center justify-center gap-4 border-b bg-second_color_light dark:bg-second_color_dark px-4 md:px-6`}
    >
      <nav
        className={` h-16 content-center bg-second_color_light dark:bg-second_color_dark w-screen items-center justify-center`}
      >
        <ul
          className={` md:w-[1000px] bg-second_color_light dark:bg-second_color_dark m-auto  flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 px-2 lg:pl-4 `}
        >
          <li className="flex-shrink-0">
            {navData ? (
              <ArticleLink href="/">
                <Image
                  src={logo ? urlFor(logo).url() : theme.logo_url}
                  alt="Logo"
                  width={110}
                  height={62}
                  className="object-contain w-[80px] h-auto sm:w-[90px] sm:h-[62px] md:w-[120px] md:h-auto"
                />
              </ArticleLink>
            ) : null}
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
          {navData?.navItems.map(
            (link: { _key: any; name: any; slug: any }) => {
              return (
                <li key={link._key}>
                  <Link
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
            }
          )}
          <span className="hidden md:grid grid-cols-2 items-center ml-auto ">
            <DarkModeToggle onClick={toggle} />
            <SearchButton />
          </span>
        </ul>
      </nav>

      {/*   Phone Nav */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <span className="grid md:hidden">
          <DarkModeToggle onClick={toggle} />
        </span>
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
              ? navData.navItems.map((link: NavigationItem) => {
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
                })
              : null}
          </nav>
          <aside className="mt-auto grid place-content-center h-full">
            <MailChimpForm />
          </aside>
        </SheetContent>
      </Sheet>
    </header>
  );
}
