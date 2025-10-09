import clsx from "clsx";
import { Qsort } from "../types";
import Link from "next/link";
import Image from "next/image";
import { useId } from "react";

export const CenterSection = ({
  sort,
  path,
}: {
  sort: Qsort;
  path: string;
}) => {
  return (
    <section className="w-full">
      <SortMenu sort={sort} path={path}></SortMenu>
      <WritingSection />
    </section>
  );
};

const SortMenu = ({ sort, path }: { sort: Qsort; path: string }) => {
  return (
    <header className="grid grid-rows-1 grid-cols-2 text-xl font-bold border-b border-b-Lgray select-none">
      <Link
        className="flex justify-center py-4"
        href={path + "?sort=boardList"}
      >
        <h6
          className={clsx(
            "relative w-max h-full",
            sort === "boardList"
              ? "before:absolute before:-bottom-4 before:w-full before:border-b-4 before:border-b-blue-300"
              : "text-Dgray"
          )}
        >
          BoardList
        </h6>
      </Link>
      <Link className="flex justify-center py-4" href={path + "?sort=inform"}>
        <h6
          className={clsx(
            "relative w-max h-full",
            sort === "inform"
              ? "before:absolute before:-bottom-4 before:w-full before:border-b-4 before:border-b-blue-300"
              : "text-Dgray"
          )}
        >
          Inform
        </h6>
      </Link>
    </header>
  );
};

const WritingSection = () => {
  const imgInputId = useId();
  return (
    <div>
      <div className="relative w-4 aspect-square">
        <Image
          src={"userImg.svg"}
          alt="userImg.svg"
          fill
          style={{ objectFit: "fill" }}
        ></Image>
      </div>
      <div>
        <input type="text"></input>
        <label
          className="block relative w-4 aspect-square cursor-pointer"
          htmlFor={imgInputId}
        >
          <Image
            src={"imgSelect.svg"}
            alt="imgSelect.svg"
            fill
            style={{ objectFit: "fill" }}
          ></Image>
          <input
            type="file"
            className="hidden"
            id={imgInputId}
            accept="image/*"
          ></input>
        </label>
      </div>
    </div>
  );
};
