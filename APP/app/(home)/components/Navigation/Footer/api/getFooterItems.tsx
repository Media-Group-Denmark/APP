import { client } from "@/app/lib/sanityclient";
import { FooterItem } from "../models/footer";


export async function getFooterItems(): Promise<FooterItem[] | undefined> {
  
    const query = `*[_type == "footer"] {
      footerTitle,
      _id,
      footerItems[] {
        title,
        _key,
        links[] {
          _key,
          "name": @->name,
          "title": @->title,
          "type": @->_type,
            "slug": @->slug.current
          }
        }
      } `;
      try {
        const data = await client.fetch(query);
        return data;
      }
      catch (error) {
        console.error(error);
      }
      return undefined; 
    }