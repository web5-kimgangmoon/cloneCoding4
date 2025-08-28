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
import { useId, useState } from "react";

export const RightSection = () => {
  const inputId = useId();
  const [text, setText] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  return (
    <section className="flex flex-col justify-between w-2/7 pr-2 h-full select-none border-l border-Lgray">
      <div className="relative w-full h-10 mx-4">
        <label
          className={
            "relative pl-10 flex items-center w-full h-full border border-Dgray rounded-3xl"
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
          className="absolute top-full left-0 w-full h-auto rounded-2xl overflow-hidden shadow-md p-4"
        >
          <ul>
            <li className="flex">
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
                <span className="block text-left font-bold">김강문</span>
                <span className="block text-left text-Dgray">@SSD</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
