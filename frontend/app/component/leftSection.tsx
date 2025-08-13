import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BellIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export const LeftSection = () => {
  return (
    <section className="flex flex-col justify-between h-full">
      <div>
        <header className="w-10 h-10">
          <Logo />
        </header>

        <MenuBar></MenuBar>
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

const MenuBar = () => {
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
              <span className="text-xl">{v.title}</span>
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
      <MenuButton className={"relative flex items-center"}>
        <span className="block relative w-12 aspect-square">
          <Image
            src={"userImg.svg"}
            alt="userImg.svg"
            style={{ objectFit: "fill" }}
            fill
          ></Image>
        </span>
        <span className="block text-sm">
          <div className="block font-bold">김강문</div>
          <div className="block">@SSD</div>
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
      <MenuItems anchor="top">
        <MenuItem>
          <a className="block data-focus:bg-blue-100" href="/settings">
            Settings
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-focus:bg-blue-100" href="/support">
            Support
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-focus:bg-blue-100" href="/license">
            License
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};
