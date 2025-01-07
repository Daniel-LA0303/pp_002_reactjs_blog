// Blog interfaces

import { CategoryAllInfoI } from "./category";

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
