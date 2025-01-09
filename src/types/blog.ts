// Blog interfaces

import { CategoryAllInfoI, CategorySmallInfo } from "./category";
import { UserInfoCard } from "./user";

/**
 * create a blog
 */
export interface CreateBlogRequestI {
  userId: number;
  title: string;
  description: string;
  content: string;
  categories: number[];
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

export interface BlogEngagement{
  likesNumber: number;
  commentsNumber: number;
  savedNumber: number;
}

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
}


export interface BlogCard{
  blogId: number;
  title: string;
  description: string;  
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED"; 
  slug: string;
  createdAt: string;
  userId: number;
  username: string;
  categories: CategorySmallInfo[];
}
