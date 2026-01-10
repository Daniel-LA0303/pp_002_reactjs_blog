import { PageableI } from "../../../types/blog";

export interface ReplyCardDTO {
    replyId: number;
    content: string;
    blogId: number;
    commentId: number;
    userId: number;
    username: string;
    profilePicture: string;
    updatedAt: string;
}

export interface RepliesPageableResponseI {
  content: ReplyCardDTO[];
  pageable: PageableI;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface ReplyCreateRequestDTO {
  content: string;
  userId: number;
  blogId: number;
  commentId: number;
}