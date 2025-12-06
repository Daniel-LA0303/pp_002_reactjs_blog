// Blog interfaces

import { CategoryAllInfoI, CategorySmallInfo } from "../../category/types/category";
import { UserInfoCard } from "../../user/types/user";

/**
 * create a blog
 */
export interface CreateBlogRequestI
{
  userId: number;
  title: string;
  description: string;
  content: string;
  categories: number[];
  blogImage?: string;
}

export interface CreateBlogResponseI {
  blogId: number;
  title: string;
  description: string;
  content: string;
  status: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  categories: CategoryAllInfoI[]
}

export interface CreateBlogValidationErrorResponseI {
  title: string;
  description: string;
  content: string;
}

// export interface BlogEngagement{
//   likesNumber: number;
//   commentsNumber: number;
//   savedNumber: number;
// }

export interface BlogPageResponse{
  blogId: number;
  title: string;
  description: string;
  content: string;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED"; 
  slug: string;
  createdAt: string; 
  categories: CategorySmallInfo[];
  userInfo: UserInfoCard;
  blogEngagement: BlogEngagement;
  usersLiked: number[];
  usersReaded: number[];
}


export interface BlogCardI{
  blogId: number;
  title: string;
  description: string;  
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED"; 
  slug: string;
  createdAt: string;
  userId: number;
  username: string;
  categories: CategorySmallInfo[];
  blogEngagement: BlogEngagement;
  usersLiked: number[];
  usersReaded: number[];
}

export interface BlogEngagement{
  blogId: number; 
  commentsNumber: number;
  likesNumber: number;
  savedNumber: number;
}

export interface BlogsPageableRequestI{
  userId: number;
  page?: number;
  size?: number;
}

export interface PageableI {
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface BlogsPageableResponseI {
  content: BlogCardI[];
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
