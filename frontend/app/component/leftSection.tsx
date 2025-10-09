import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSection,
} from "@headlessui/react";
import { BellIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export const LeftSection = () => {
  return (
    <section className="flex flex-col justify-between w-2/7 pr-2 h-full select-none border-r border-Lgray">
      <div>
        <header className="w-10 h-10">
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
    <nav>
      <ul className="grid gap-5 py-5">
        {menuArr.map((v, idx) => (
          <li className="w-fit" key={idx}>
            <Link href={"/"} className="flex items-center gap-2">
              {v.icon === "Home" && (
                <HomeIcon className="inline-block w-10 h-10" />
              )}
              {v.icon === "profile" && (
                <UserIcon className="inline-block w-10 h-10" />
              )}
              {v.icon === "notification" && (
                <BellIcon className="inline-block w-10 h-10" />
              )}
              <span
                className={clsx(
                  "text-xl",
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
    <button className="bg-black text-white py-1 w-35 rounded-4xl">Post</button>
  );
};

const UserBtn = () => {
  return (
    <Menu>
      <MenuButton
        className={
          "relative flex items-center mb-3 px-5 py-3 outline-none hover:bg-gray-200 rounded-4xl cursor-pointer"
        }
      >
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
        <span className="block relative w-4 h-4">
          <Image
            src={"···.svg"}
            alt="···.svg"
            style={{ objectFit: "fill" }}
            fill
          />
        </span>
      </MenuButton>
      <MenuItems
        anchor="top start"
        className={
          "outline-none translate-x-1/7 -translate-y-5 overflow-visible!"
        }
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
        <div className="absolute -bottom-1 left-1/2 -translate-x-1 rotate-45 w-2 aspect-square bg-white shadow-LBmd border-l-Lgray border-b-Lgray"></div>
      </MenuItems>
    </Menu>
  );
};
