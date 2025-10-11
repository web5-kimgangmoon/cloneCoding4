import clsx from "clsx";
import { Qsort } from "../types";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { useWritingBoard } from "../interactServer/action/home";

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
      <WritingSection />
    </section>
  );
};

const SortMenu = ({ sort, path }: { sort: Qsort; path: string }) => {
  return (
    <header className="grid grid-rows-1 grid-cols-2 text-xl font-bold border-b border-b-Lgray select-none">
      <Link
        className="flex justify-center py-4"
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
      <Link className="flex justify-center py-4" href={path + "?sort=inform"}>
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

const WritingSection = () => {
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
