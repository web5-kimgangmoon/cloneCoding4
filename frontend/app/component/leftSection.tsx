import {
  _internal_ComponentMenuItems,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSection,
} from "@headlessui/react";
import {
  BellIcon,
  HomeIcon,
  PencilIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export const LeftSection = () => {
  return (
    <section className="sticky top-0 flex flex-col justify-between px-3 py-1 pr-2 h-screen select-none">
      <div className="flex flex-col items-center md:items-start">
        <header className="w-8 h-8">
          <Logo />
        </header>

        <MenuBar selectedStr="Home"></MenuBar>
        <PostBtn />
      </div>

      <UserBtn></UserBtn>
    </section>
  );
};

const Logo = () => {
  return (
    <Link href={"/"} className="w-full h-full block relative">
      <Image
        src={"logo.svg"}
        alt="logo.svg"
        style={{ objectFit: "fill" }}
        fill
      />
    </Link>
  );
};

const MenuBar = ({ selectedStr }: { selectedStr: string }) => {
  const menuArr = [
    { icon: "Home", href: "/", title: "Home" },
    { icon: "profile", href: "/", title: "Profile" },
    { icon: "notification", href: "/", title: "Notification" },
  ];
  return (
    <nav className="">
      <ul className="flex flex-col gap-5 py-5">
        {menuArr.map((v, idx) => (
          <li className="w-fit" key={idx}>
            <Link
              href={"/"}
              className="transition-[width] w-8 lg:w-full flex items-center gap-2"
            >
              {v.icon === "Home" && (
                <HomeIcon className="inline-block w-8 h-8" />
              )}
              {v.icon === "profile" && (
                <UserIcon className="inline-block w-8 h-8" />
              )}
              {v.icon === "notification" && (
                <BellIcon className="inline-block w-8 h-8" />
              )}
              <span
                className={clsx(
                  "text-xl hidden lg:inline",
                  selectedStr === v.title && "font-bold"
                )}
              >
                {v.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const PostBtn = () => {
  return (
    <button className="bg-black text-white p-1 lg:w-35 rounded-4xl transition-[width]">
      <span className="hidden lg:inline">Post</span>
      <PencilIcon className="inline lg:hidden h-6" />
    </button>
  );
};

const UserBtn = () => {
  const popUpRef = useRef<_internal_ComponentMenuItems | null>(null);

  return (
    <Menu>
      <MenuButton
        className={
          "lg:w-full relative flex items-center mb-3 lg:px-5 p-3 outline-none hover:bg-gray-200 rounded-4xl cursor-pointer"
        }
      >
        <span className="block relative w-10 aspect-square">
          <Image
            className="rounded-full"
            src={"userImg.svg"}
            alt="userImg.svg"
            style={{ objectFit: "fill" }}
            fill
          ></Image>
        </span>
        <span className="hidden lg:block text-sm pl-2 grow">
          <span className="block text-left font-bold">김강문</span>
          <span className="block text-left text-Dgray">@SSD</span>
        </span>
        <span className="hidden lg:block relative ml-4 w-4 h-4">
          <Image
            src={"···.svg"}
            alt="···.svg"
            style={{ objectFit: "fill" }}
            fill
          />
        </span>
      </MenuButton>
      <MenuItems
        anchor={{ to: "top start", gap: 15 }}
        className={"outline-none overflow-visible! bg-white"}
      >
        <MenuSection
          className={
            "flex flex-col gap-2 py-2 shadow-md rounded-2xl border-Lgray text-sm font-bold overflow-hidden"
          }
        >
          <MenuItem>
            <a
              className="block py-2 px-3 bg-gray-200/0 hover:bg-gray-200 hover:bg-opacity-100 transition-colors"
              href="/settings"
            >
              Add an existing account
            </a>
          </MenuItem>
          <MenuItem>
            <a
              className="block py-2 px-3 bg-gray-200/0 hover:bg-gray-200 hover:bg-opacity-100 transition-colors"
              href="/support"
            >
              Log out @ssd
            </a>
          </MenuItem>
        </MenuSection>
        <div className="absolute -bottom-1 left-1/5 lg:left-1/2 -translate-x-1 rotate-45 w-2 aspect-square bg-white shadow-LBmd border-l-Lgray border-b-Lgray"></div>
      </MenuItems>
    </Menu>
  );
};
