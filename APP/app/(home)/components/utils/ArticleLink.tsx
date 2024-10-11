"use client";
import Link, { LinkProps } from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface TransitionLinkProps extends LinkProps {
    children: React.ReactNode;
    href: string;
    className?: string;
    rel?: string;
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function darkModeCheck() {
    const darkMode = localStorage.getItem("dark mode");
    if (darkMode === "on") { 
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
}

export const ArticleLink: React.FC<TransitionLinkProps> = ({
  children,
  href,
  className,
  rel,
  ...props
}) => {
    const router = useRouter();
    useEffect(() => {
        darkModeCheck();
      }, []);
    
  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const body = document.querySelector(".loadingScreen");
    const darkMode = localStorage.getItem("dark mode");

    if (darkMode === "on") {
      body?.classList.add("page-transition-dark-mode");
    } else {
      body?.classList.add("page-transition-light-mode");
    }

    await sleep(100);
    router.push(href);
    await sleep(100);

    if (darkMode === "on") {
      body?.classList.remove("page-transition-dark-mode");
    } else {
      body?.classList.remove("page-transition-light-mode");
    }
  };

  return (
    <Link {...props} href={href} className={className} rel={rel} onClick={handleTransition}>
      {children}
    </Link>
  );
};