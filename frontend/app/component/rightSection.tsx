import { Menu, MenuButton } from "@headlessui/react";
import Image from "next/image";

export const RightSection = () => {
  return (
    <section className="flex flex-col justify-between w-1/7 pr-2 h-full select-none border-l border-Lgray">
      <header className="w-10 h-10">
        <div></div>
        <Menu>
          <MenuButton></MenuButton>
        </Menu>
        <Image src={"search.svg"} alt="search.svg"></Image>
        <input></input>
      </header>
    </section>
  );
};
