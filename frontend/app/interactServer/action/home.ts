import { useMutation } from "@tanstack/react-query";
import axiosRoot from "../../lib/axiosRoot";
import {
  PostBoardBodyReq,
  PostBoardBodyRes,
  PostBoardQueryReq,
} from "../definition";

export const useWritingBoard = () =>
  useMutation<PostBoardBodyRes, Error, PostBoardBodyReq & PostBoardQueryReq>({
    mutationKey: ["post", "board"],
    mutationFn: async ({
      content,
      img,
      reply,
    }: PostBoardBodyReq & PostBoardQueryReq) => {
      const formData = new FormData();
      img && formData.append("img", img);
      (reply || reply === 0) && formData.append("reply", String(reply));
      formData.append("content", content);
      return await axiosRoot.post("/post", formData, {
        headers: { "content-Type": "multipart/form-data" },
      });
    },
  });
