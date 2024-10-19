import React from "react";
import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/(admin)/components/shadcn/ui/breadcrumb";

const CustomBreadcrumb: React.FC<{
  navItem: string;
  link: string;
  navItemTwo?: string;
}> = ({ navItem, link, navItemTwo }) => {
  return (
    <nav className="px-3 md:px-8 max-w-[1000px] m-auto text-fade_color_light dark:text-fade_color_dark pb-6 rounded-lg">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Forside</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href={link}>{navItem}</BreadcrumbLink>
          </BreadcrumbItem>
          {navItemTwo && (
            <>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{navItemTwo}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};

export default CustomBreadcrumb;