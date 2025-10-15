import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { GetBoardBodyRes, GetBoardQueryReq } from "../definition";
import axiosRoot from "@/app/lib/axiosRoot";

export const useGetPostAll = ({ limit, offset }: GetBoardQueryReq) =>
  useInfiniteQuery<
    GetBoardBodyRes,
    Error,
    InfiniteData<GetBoardBodyRes, { limit: number; offset: number }>,
    ["get", "post", "all"],
    { limit: number; offset: number }
  >({
    queryKey: ["get", "post", "all"],
    queryFn: async (c) => {
      return (
        await axiosRoot.get("/post/all", {
          params: { limit, offset: c.pageParam.offset },
        })
      ).data;
    },
    initialData: { pages: [], pageParams: [] },
    initialPageParam: { limit, offset },
    getNextPageParam: (l, a) => {
      if (l.posts.length < 10) return undefined;
      return { limit, offset: a.length * 10 };
    },
  });
