import theme from "@/app/lib/theme.json";
import NewNav from "./components/NavigationMenu";

export default function Header() {
  return (
    <header className="fixed md:relative z-40 w-screen min-h-[65px] ">
      <NewNav />
    </header>
  );
}
