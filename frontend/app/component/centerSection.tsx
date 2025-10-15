import clsx from "clsx";
import { Qsort } from "../types";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { useWritingBoard } from "../interactServer/action/home";
import { useGetPostAll } from "../interactServer/data/posts";
import { useMotionValueEvent, useScroll } from "motion/react";

export const CenterSection = ({
  sort,
  path,
}: {
  sort: Qsort;
  path: string;
}) => {
  return (
    <section className="w-full">
      <SortMenu sort={sort} path={path}></SortMenu>
      <WritingBlock />
      <BoardListBlock />
    </section>
  );
};

const SortMenu = ({ sort, path }: { sort: Qsort; path: string }) => {
  return (
    <header className="sticky backdrop-blur top-0 z-7 bg-white/30 grid grid-rows-1 grid-cols-2 text-xl font-bold border-b border-b-Lgray select-none">
      <Link
        className="flex justify-center py-4 hover:bg-Dgray/30 transition-colors"
        href={path + "?sort=boardList"}
      >
        <h6
          className={clsx(
            "relative w-max h-full",
            sort === "boardList"
              ? "before:absolute before:-bottom-4 before:w-full before:border-b-4 before:border-b-blue-300"
              : "text-Dgray"
          )}
        >
          BoardList
        </h6>
      </Link>
      <Link
        className="flex justify-center py-4 hover:bg-Dgray/30 transition-colors"
        href={path + "?sort=inform"}
      >
        <h6
          className={clsx(
            "relative w-max h-full",
            sort === "inform"
              ? "before:absolute before:-bottom-4 before:w-full before:border-b-4 before:border-b-blue-300"
              : "text-Dgray"
          )}
        >
          Inform
        </h6>
      </Link>
    </header>
  );
};

const WritingBlock = () => {
  const [img, setImg] = useState<null | [Blob, string]>(null);
  const [text, setText] = useState<string>("");
  const imgInputId = useId();
  const imgPreviewId = useId();
  const textAreaId = useId();

  const writingBoard = useWritingBoard();

  // 임시 알림.(모달은 나중에 추가)
  useEffect(() => {
    if (writingBoard.error !== null) alert(writingBoard.error.message);
    if (writingBoard.data !== undefined) {
      alert(writingBoard.data.message);
    }

    const previewNode = document.getElementById(imgPreviewId);
    const imgInputNode = document.getElementById(imgInputId);
    const textNode = document.getElementById(textAreaId);
    if (previewNode) previewNode.style.display = "none";
    if (imgInputNode instanceof HTMLInputElement) imgInputNode.value = "";
    if (textNode) {
      textNode.style.height = "auto";
      textNode.style.height = `${textNode.scrollHeight}px`;
    }
    setImg(null);
    setText("");
  }, [writingBoard.error, writingBoard.data]);

  return (
    <div className="flex items-start p-4 gap-3">
      <div className="relative w-10 aspect-square rounded-full">
        <Image
          src={"userImg.svg"}
          alt="userImg.svg"
          fill
          style={{ objectFit: "fill" }}
          className="rounded-full"
        ></Image>
      </div>
      <div className="flex flex-col gap-[0.125rem] w-full">
        <textarea
          name="text"
          id={textAreaId}
          placeholder="What's happening?"
          className="outline-none w-full break-all border-b border-Lgray select-none resize-none text-lg py-1 overflow-hidden"
          onChange={(e) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            setText(e.currentTarget.value);
          }}
          rows={1}
          value={text}
        ></textarea>
        <img
          id={imgPreviewId}
          className="w-full aspect-3/2 border border-Dgray rounded-4xl mt-3"
          style={{ display: "none" }}
          alt={"there's no image"}
        ></img>
        <div className="flex justify-between pt-2 w-full">
          <label
            className="block relative w-6 aspect-square cursor-pointer select-none"
            htmlFor={imgInputId}
          >
            <Image
              src={"imgSelect.svg"}
              alt="imgSelect.svg"
              fill
              style={{ objectFit: "fill" }}
            ></Image>
            <input
              type="file"
              className="hidden"
              id={imgInputId}
              accept="image/*"
              onChange={async (e) => {
                const previewElem = document.getElementById(imgPreviewId);
                if (e.currentTarget.files === null) return;
                if (e.currentTarget.files[0] === undefined) return;
                if (previewElem === null) return;
                if (!e.currentTarget.files[0].type.match(/^image\//)) {
                  e.currentTarget.value = "";
                  return;
                }

                const blob = new Blob([e.currentTarget.files[0]], {
                  type: e.currentTarget.files[0].type,
                });
                const previewURL = URL.createObjectURL(blob);
                if (img !== null) URL.revokeObjectURL(img[1]);

                setImg([blob, previewURL]);
                previewElem.setAttribute("src", previewURL);
                previewElem.style.display = "block";
              }}
            ></input>
          </label>
          <button
            className={clsx(
              "text-sm font-bold px-3 py-1 rounded-4xl text-white transition-colors",
              img !== null || text !== ""
                ? "bg-black cursor-pointer"
                : "bg-Dgray"
            )}
            onClick={() => {
              if (img !== null || text !== "")
                writingBoard.mutate({
                  content: text,
                  img:
                    img !== null && img[0] !== undefined ? img[0] : undefined,
                });
            }}
          >
            POST
          </button>
        </div>
      </div>
    </div>
  );
};

const BoardListBlock = () => {
  const boardList = useGetPostAll({ offset: 0, limit: 10 });

  // useEffect(() => {}, []);
  // if (
  //   boardList.data.pageParams.length === 0 &&
  //   (boardList.isFetching || boardList.isPending)
  // )
  //   return <div></div>;

  const ulRef = useRef<HTMLUListElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ulRef });
  useMotionValueEvent(scrollYProgress, "change", (l) => {
    if (
      !boardList.isPending &&
      !boardList.isFetching &&
      boardList.hasNextPage &&
      l > 0.8
    ) {
      boardList.fetchNextPage();
    }
  });
  return (
    <div>
      <ul className="" ref={ulRef}>
        {boardList.data.pages[0] &&
          boardList.data.pages[0].posts.map((v) => (
            <LiBoard
              user={v.Writer.name}
              email={v.Writer.email}
              img={v.img_link}
              content={v.content}
              boardId={v.id}
              viewCnt={v.view_cnt}
              cmtCnt={v._count.replied_post}
              likeCnt={v._count.Like}
              key={v.id}
            />
          ))}
        {boardList.data.pages.length > 1 &&
          boardList.data.pages.map((p) => {
            return p.posts
              .map((v) => (
                <LiBoard
                  user={v.Writer.name}
                  email={v.Writer.email}
                  img={v.img_link}
                  content={v.content}
                  boardId={v.id}
                  viewCnt={v.view_cnt}
                  cmtCnt={v._count.replied_post}
                  likeCnt={v._count.Like}
                  key={v.id}
                />
              ))
              .flat();
          })}
        {boardList.isPending && boardList.isFetching && (
          <div className="flex justify-center items-center w-full h-30">
            <div className="flex justify-center items-center border-7 border-t-blue-300 border-gray-200 aspect-square animate-spin rounded-full">
              <div className="w-4 aspect-square bg-white rounded-full"></div>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
};

const LiBoard = ({
  content,
  img,
  user,
  email,
  boardId,
  cmtCnt,
  viewCnt,
  likeCnt,
}: {
  content: string;
  img: string | null;
  user: string;
  email: string;
  boardId: number;
  cmtCnt: number;
  viewCnt: number;
  likeCnt: number;
}) => {
  return (
    <li className={"relative border-t last:border-b border-Lgray p-2"}>
      <Link
        className="flex items-start px-2 py-3 hover:bg-gray-200 transition-colors rounded-4xl cursor-pointer"
        href={`post/${boardId}`}
      >
        <div className="block relative w-10 aspect-square">
          <Image
            className="rounded-full"
            src={"userImg.svg"}
            alt="userImg.svg"
            style={{ objectFit: "fill" }}
            fill
          ></Image>
        </div>
        <div className="grow pl-2">
          <h6 className="flex text-sm w-full gap-1 text-[1rem]">
            <strong className="font-bold">{user}</strong>
            <strong className="text-Dgray">@{email.split("@")[0]}</strong>
          </h6>
          <p className="pb-1">{content}</p>
          {img !== null && (
            <div className="relative w-full aspect-3/2">
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/img?img=${img}`}
                alt={img}
                className="border border-Dgray rounded-4xl"
                fill
                style={{ objectFit: "fill" }}
              ></Image>
            </div>
          )}
          <footer className="flex pt-2">
            <BIcon src="comment.svg" value={cmtCnt}></BIcon>
            <BIcon src="Heart.svg" value={likeCnt}></BIcon>
            <BIcon src="view 1.svg" value={viewCnt}></BIcon>
          </footer>
        </div>
      </Link>
    </li>
  );
};

const BIcon = ({ src, value }: { src: string; value: number }) => {
  return (
    <div className="flex grow text-Dgray items-center">
      <div className="relative w-8 aspect-square">
        <Image src={src} alt={src} fill style={{ objectFit: "fill" }}></Image>
      </div>
      <strong>{value}</strong>
    </div>
  );
};
