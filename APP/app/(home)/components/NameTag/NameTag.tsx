import React from "react";
import { ArticleLink } from "../utils/ArticleLink";
import { ChevronRight } from "lucide-react";

export default function NameTag({
  name,
  category,
  tag,
  journalist,
}: {
  name: string;
  category?: string;
  tag?: string;
  journalist?: string;
}) {
  const generateHref = () => {
    if (category) return `/kategori/${category}`;
    if (tag) return `/tag/${tag}`;
    if (journalist) return `/journalist/${journalist}`;
    return "";
  };
  const href = generateHref();
  const Wrapper = href ? ArticleLink : "p";
  const wrapperProps = href ? { href: href } : {};
  return (
    <Wrapper {...(wrapperProps as any)} className="text-lg flex font-bold mb-2">
      <span className="py-1">{name ? name : "Alle Nyheder"}</span>
      <figure className="flex gap-[12px]">
        <ChevronRight className="font-black my-auto" size={22} />
      </figure>
    </Wrapper>
  );
}
