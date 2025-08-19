import { CenterSection } from "./component/centerSection";
import { LeftSection } from "./component/leftSection";
import { RightSection } from "./component/rightSection";

export default function Home() {
  return (
    <div className="container mx-auto xl:max-w-[1440px] max-h-[1024px] py-1 h-screen">
      <LeftSection></LeftSection>
      <CenterSection></CenterSection>
      <RightSection></RightSection>
    </div>
  );
}
