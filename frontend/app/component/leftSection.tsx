import { BellIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export const LeftSection = () => {
  return (
    <section>
      <header className="w-10 h-10">
        <Logo />
      </header>
      <MenuBar></MenuBar>
      {/* <Post></Post>
      <UserBtn></UserBtn> */}
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
    { icon: "profile", href: "/", title: "profile" },
    { icon: "notification", href: "/", title: "notification" },
  ];
  return (
    <nav>
      <ul className="grid gap-5 pt-5">
        {menuArr.map((v, idx) => (
          <li className="" key={idx}>
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
  return <button></button>;
};
