import { PageableI } from "./blog";

export interface newCommentRequestI {
    blogId: number;
    userId: number | null;
    content: string;
}

export interface commentResponseI {
    commentId: number;
    content: string;
    userId: number;
    blogId: number;
    profilePicture: string;
    username: string;
    updatedAt: string;
}

export interface CommentsPageableResponseI {
  content: commentResponseI[];
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