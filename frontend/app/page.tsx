import { CenterSection } from "./component/centerSection";
import { LeftSection } from "./component/leftSection";
import { RightSection } from "./component/rightSection";

export default function Home() {
  return (
    <>
      <LeftSection></LeftSection>
      <CenterSection></CenterSection>
      <RightSection></RightSection>
    </>
  );
}
