import theme from "@/app/lib/theme.json";

export default function AdContainer({
  name,
  mobile,
  desktop,
}: {
  name: string;
  mobile?: boolean;
  desktop?: boolean;
}) {
  if (!mobile && !desktop) {
    console.error("No device chosen in AdContainer");
  }
  return (
    <aside
      className={
        mobile ? "mobile md:hidden" : desktop ? "desktop hidden md:grid" : ""
      }
      data-ad-unit-id={`/${theme.site_ad_id}/${theme.site_ad_name}/${name}`}
    />
  );
}
