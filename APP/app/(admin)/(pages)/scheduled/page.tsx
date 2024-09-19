import { client, urlFor } from "@/app/lib/sanityclient";
import { Article } from "@/app/(home)/models/article";
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import React from "react";
import Link from "next/link";
import theme from "@/app/lib/theme.json";
export const revalidate = 600;

async function getData() {
  const today: Date = new Date();
  const query = `
      *[
        _type == "article" && publishedAt > "${today.toISOString()}"
      ]
       | order(coalesce(publishedAt, _createdAt) desc) [0...50] {
        _id,
        _createdAt,
        _updatedAt,
        _type,
        title,
        teaser,
        publishedAt,
        isPublished,
        changePublishDate,
        "articleSlug": slug.current,
        "image": metaImage.asset,
        "category": category->name,
        "categorySlug": category->slug.current,
        "tag": tag[]->name,
        "tagSlug": tag[]->slug.current,
        "JournalistName": journalist->name,
        "JournalistPhoto": journalist->image,
        "JournalistSlug": journalist->slug.current,
        views,
        reading
      }`;
  const data = await client.fetch(query);
  return data;
}

export default async function ScheduledPost() {
  const data: Article[] = await getData();

  return (
    <section className="grid place-content-start pt-6">
      <aside className="grid flex-1 items-start gap-4 md:gap-8">
        <Tabs defaultValue="watch">
          <div className="items-center hidden gap-2">
            <TabsList>
              <TabsTrigger value="watch">Watch</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="watch">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Planlagte artikler</CardTitle>
                <CardDescription>
                  Se alle planlagte artikler her.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Navn</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Journalist</TableHead>
                      <TableHead>Tag</TableHead>
                      <TableHead>Læsetid</TableHead>
                      <TableHead>Dato</TableHead>
                      <TableHead>Klokken</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Preview
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data && data.length > 0
                      ? data.map((post) => (
                          <TableRow>
                            <TableCell className="hidden sm:table-cell">
                              <figure className="relative">
                                <img
                                  width={700}
                                  height={400}
                                  src={urlFor(post.image)
                                    .format("webp")
                                    .width(700)
                                    .height(400)
                                    .fit("fill")
                                    .quality(85)
                                    .url()}
                                  alt={`Billede af ${post.source}`}
                                  className="block w-full h-[14em] md:h-[5em] bg-gray-300 rounded-md object-cover"
                                />
                              </figure>
                            </TableCell>
                            <TableCell className="font-medium w-[80vw] max-w-[50ch] ">
                              {post.title}
                            </TableCell>
                            <TableCell>
                              <Link
                                href={`${theme.site_url}/artikler/kategori/${post.categorySlug}`}
                              >
                                <Badge variant="secondary">
                                  {post.category}
                                </Badge>
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Link
                                href={`${theme.site_url}/artikler/journalist/${post.JournalistSlug}`}
                              >
                                <Badge variant="secondary">
                                  {post.JournalistName}
                                </Badge>
                              </Link>
                            </TableCell>
                            <TableCell className="m-auto w-[60vw] max-w-[30ch]">
                              {post.tag.map((tag, index) => (
                                <Link
                                  href={`${theme.site_url}/artikler/tag/${post.tagSlug[index]}`}
                                >
                                  <Badge className="m-1" variant="secondary">
                                    {tag}
                                  </Badge>
                                </Link>
                              ))}
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                {post.reading} minutter
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="default">
                                {new Date(post.publishedAt).getMonth()} /{" "}
                                {new Date(post.publishedAt).getDate()} -{" "}
                                {new Date(post.publishedAt).getFullYear()}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="default">
                                {new Intl.DateTimeFormat("da-DK", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                }).format(new Date(post.publishedAt))}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">Se artikel</Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      : null}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </aside>
    </section>
  );
}
