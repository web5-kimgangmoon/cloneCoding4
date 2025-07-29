import Image from "next/image";
import Link from "next/link";

export const LeftSection = () => {
  return (
    <div>
      <MenuBar></MenuBar>
      {/* <Post></Post>
      <UserBtn></UserBtn> */}
    </div>
  );
};

const MenuBar = () => {
  const imgArr = [{ src: "logo.svg", alt: "logo.svg", href: "/" }];
  return (
    <nav>
      <ul>
        <li className="block w-4 h-4">
          <Link href={"/"} className="w-full h-full block relative">
            <Image
              src={"logo.svg"}
              alt="logo.svg"
              style={{ objectFit: "fill" }}
              fill
            />
          </Link>
        </li>
      </ul>
      {/* <Logo></Logo>
      <Home></Home>
      <Profile></Profile>
      <Notification></Notification> */}
    </nav>
  );
};
