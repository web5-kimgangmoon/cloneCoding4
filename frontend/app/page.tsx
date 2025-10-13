"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { CenterSection } from "./component/centerSection";
import { LeftSection } from "./component/leftSection";
import { RightSection } from "./component/rightSection";
import { Qsort } from "./types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchIntervalInBackground: false } },
});

export default function Home() {
  const path = usePathname();
  const query = useSearchParams();

  const Qsort = query.get("sort");
  const sort: Qsort =
    Qsort !== "boardList" && Qsort !== "inform" ? "boardList" : Qsort;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative container flex mx-auto xl:max-w-[1440px] min-h-screen h-max">
        <LeftSection></LeftSection>
        <CenterSection sort={sort} path={path}></CenterSection>
        <RightSection></RightSection>
      </div>
    </QueryClientProvider>
  );
}
