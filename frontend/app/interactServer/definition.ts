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
