
import Navigation from "./Navigation";
import theme from "@/app/lib/theme.json";

export default function Header() {
 
  

  return (
    <header className=" duration-500 h-fit md:h-[300px] shadow fixed md:relative z-40 w-screen ">
      <div
        className="desktop !mb-0 hidden md:grid place-content-center h-0 md:h-[260px] overflow-clip bg-second_color_light dark:bg-second_color_dark -z-10 sticky top-0 "
        data-ad-unit-id={`/49662453/${theme.site_ad_name}/Leaderboard_1`}
      ></div>
      <Navigation />
    </header>
  );
};


