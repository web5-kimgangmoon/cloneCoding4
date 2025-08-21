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
      <div className="relative w-full h-8 mx-5">
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
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.currentTarget.value);
            }}
          />
        </label>
        <div hidden={!isFocus} className="absolute top-full left-0">
          <div className="w-5 h-5 bg-blue-500"></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  );
};
