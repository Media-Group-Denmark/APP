import { urlFor } from "@/app/lib/sanityclient";
import theme from "@/app/lib/theme.json";
import { singleArticle } from "../models/singleArticle";

export async function generateArticleMetadata(currentArticle: singleArticle) {
  
    if (currentArticle) {
      return {
        title: currentArticle.title,
        description: currentArticle.teaser,
        alternates: {
          canonical: `${theme.site_url}/artikel/${
            currentArticle.articleSlug
          }`,
        },  
        keywords: currentArticle.tag.join(", "),
        openGraph: {
          title: currentArticle.facebookTitle || currentArticle.title,
          description: currentArticle.facebookDescription || currentArticle.teaser,
          url: `${theme.site_url}/artikel/${
            currentArticle.newSlug || currentArticle.articleSlug
          }`,
          type: "article",
          siteName: theme.site_name,
          locale: "da_DK",
          images: [
            {
              url: urlFor(currentArticle.facebookImage || currentArticle.image)
                .format("webp")
                .width(400)
                .height(300)
                .fit("fill")
                .quality(85)
                .url(),
              width: 800,
              height: 600,
              alt: currentArticle.facebookTitle || currentArticle.title,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          site: theme.metadata.twitter.site,
          title: currentArticle.title,
          description: currentArticle.teaser,
          images: urlFor(currentArticle.image)
            .format("webp")
            .width(400)
            .height(300)
            .fit("fill")
            .quality(85)
            .url(),
        },
      };
    } else {
      return {
        title: "Default Title",
      };
    }
  }