"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { CenterSection } from "./component/centerSection";
import { LeftSection } from "./component/leftSection";
import { RightSection } from "./component/rightSection";
import { useEffect, useState } from "react";
import { Qsort } from "./types";

export default function Home() {
  const path = usePathname();
  const query = useSearchParams();

  const Qsort = query.get("sort");
  const sort =
    Qsort !== "boardList" && Qsort !== "inform" ? "boardList" : Qsort;

  return (
    <div className="container flex mx-auto xl:max-w-[1440px] max-h-[1024px] py-1 h-screen">
      <LeftSection></LeftSection>
      <CenterSection sort={sort} path={path}></CenterSection>
      <RightSection></RightSection>
    </div>
  );
}
