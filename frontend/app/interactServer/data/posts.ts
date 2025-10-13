import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { GetBoardBodyRes, GetBoardQueryReq } from "../definition";

export const usePostAll = ({ limit, offset }: GetBoardQueryReq) => {
  useInfiniteQuery<
    GetBoardBodyRes,
    Error,
    InfiniteData<GetBoardBodyRes, number>
  >({
    queryKey: ["get", `all`, `limit ${limit}`, `offset ${offset}`],
    queryFn: () => {
      return { posts: [] };
    },
    initialData: { pages: [], pageParams: [] },
    initialPageParam: 1,
    getNextPageParam: (l, a) => {},
  });
};
