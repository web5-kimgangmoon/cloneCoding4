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
    <section className="sticky top-0 flex flex-col w-3/7 h-screen py-1 pl-4 border-l border-Lgray">
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
          className="absolute top-full left-0 w-full h-auto rounded-2xl overflow-hidden shadow-md p-4 bg-white z-5"
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
      <h3 className="text-xl font-bold pb-3">What's happening</h3>
      <ul className="grid grid-rows-1 gap-2">
        <ArticleItem name="김강문" email="ssd" href=""></ArticleItem>
        <ArticleItem name="김강문" email="ssd" href=""></ArticleItem>
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
      <span className="flex pb-3">
        <span className="block relative w-9 aspect-square">
          <Image
            className="rounded-full"
            src={"userImg.svg"}
            alt="userImg.svg"
            style={{ objectFit: "fill" }}
            fill
          ></Image>
        </span>
        <span className="flex items-center grow h-9">
          <span className="block grow pl-2">
            <span className="block text-sm text-left font-bold">{name}</span>
            <span className="block text-xs text-left text-Dgray">@{email}</span>
          </span>
          <button className="text-nowrap">
            <Link
              href={href}
              className="text-xs text-white bg-black px-3 py-1 rounded-xl"
            >
              보러가기
            </Link>
          </button>
        </span>
      </span>
      <span className="text-sm">제목투성이의 제목</span>
    </li>
  );
};
