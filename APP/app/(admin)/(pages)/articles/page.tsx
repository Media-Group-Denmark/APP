import { client, urlFor } from "@/app/lib/sanityclient";
import { Article } from "@/app/(home)/(pages)/(article-collections)/models/article";
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/shadcn/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/shadcn/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/shadcn/ui/tabs";
import { Badge } from "../../components/shadcn/ui/badge";
import React from "react";
import Link from "next/link";
import theme from "@/app/lib/theme.json";
import Navigation from "../../components/Navigation/Navigation";
import ArticleSidebar from "./components/ArticleSidebar";
import { getArticleData } from "./api/getArticleData";
export const revalidate = 600;

export default async function articles() {

  const articles: Article[] = await getArticleData();

  return (
    <section className="grid grid-cols-[auto_1fr]">
      <ArticleSidebar articles={articles} />
      <section className="grid w-full">
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
                    
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </aside>
      </section>
    </section>
  );
}
