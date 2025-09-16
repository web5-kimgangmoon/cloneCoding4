"use client";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";

export const RightSection = () => {
  const inputId = useId();
  const [text, setText] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  return (
    <section className="flex flex-col w-3/7 h-full pl-4 border-l border-Lgray">
      <div className="relative w-full h-10">
        <label
          className={
            "relative pl-10 flex items-center w-full h-full border border-Dgray rounded-3xl select-none"
          }
          htmlFor={inputId}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        >
          <span className="absolute top-[calc(50%-0.75rem)] left-0 block h-6 aspect-square ml-2">
            <Image
              src={"search.svg"}
              alt="search.svg"
              fill
              style={{ objectFit: "fill" }}
            />
          </span>
          <input
            className="outline-none w-full h-full pr-4"
            id={inputId}
            placeholder="Search"
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.currentTarget.value);
            }}
          />
        </label>
        <div
          hidden={!isFocus}
          className="absolute top-full left-0 w-full h-auto rounded-2xl overflow-hidden shadow-md p-4 bg-white"
        >
          <ul className="grid grid-rows-1 gap-4">
            <SearchItem name="김강문" email="SSD" href=""></SearchItem>
            <SearchItem name="김강문" email="SSD" href=""></SearchItem>
            <SearchItem name="김강문" email="SSD" href=""></SearchItem>
            <SearchItem name="김강문" email="SSD" href=""></SearchItem>
          </ul>
        </div>
      </div>
      <ArticlesSection></ArticlesSection>
    </section>
  );
};

const SearchItem = ({
  name,
  email,
  href,
}: {
  name: string;
  email: string;
  href: string;
}) => {
  return (
    <li>
      <Link href={href} className="flex">
        <span className="block relative w-12 aspect-square">
          <Image
            className="rounded-full"
            src={"userImg.svg"}
            alt="userImg.svg"
            style={{ objectFit: "fill" }}
            fill
          ></Image>
        </span>
        <span className="block text-sm w-full pl-2">
          <span className="block text-left font-bold">{name}</span>
          <span className="block text-left text-Dgray">@{email}</span>
        </span>
      </Link>
    </li>
  );
};

const ArticlesSection = () => {
  return (
    <div className="p-4 border-1 border-Lgray rounded-2xl mt-5">
      <h3 className="text-xl font-bold">What's happening</h3>
      <ul className="grid grid-rows-1 gap-2">
        <ArticleItem name="김강문" email="ssd" href=""></ArticleItem>
      </ul>
    </div>
  );
};

const ArticleItem = ({
  name,
  email,
  href,
}: {
  name: string;
  email: string;
  href: string;
}) => {
  return (
    <li>
      <Link href={href} className="flex">
        <span className="block relative w-12 aspect-square">
          <Image
            className="rounded-full"
            src={"userImg.svg"}
            alt="userImg.svg"
            style={{ objectFit: "fill" }}
            fill
          ></Image>
        </span>
        <span className="block text-sm w-full pl-2">
          <span className="block text-left font-bold">{name}</span>
          <span className="block text-left text-Dgray">@{email}</span>
        </span>
      </Link>
    </li>
  );
};
