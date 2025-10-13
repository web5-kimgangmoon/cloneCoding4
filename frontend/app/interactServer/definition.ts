export interface PostBoardBodyReq {
  content: string;
  img?: Blob;
}

export interface PostBoardQueryReq {
  reply?: number;
}

export interface PostBoardBodyRes {
  message: string;
}

export interface GetBoardBodyRes {
  posts: {
    id: number;
    writer_id: number;
    reply_id: number;
    content: string;
    img_link: string;
    view_cnt: number;
    created_at: Date;
    updated_at: Date;
    _count: {
      replied_post: number;
    };
  }[];
}
export interface GetBoardQueryReq {
  limit: number;
  offset: number;
}
