
import Navigation from "./Navigation/Navigation";

export default function Header() {
 
  

  return (
    <header className=" duration-500 md:h-[300px] shadow fixed md:relative z-50 w-screen ">
      <div
        className="grid place-content-center md:h-[260px] overflow-hidden bg-second_color_light dark:bg-second_color_dark -z-10 sticky top-0 "
        id="adBanner"
      ></div>
      <Navigation />
    </header>
  );
};


