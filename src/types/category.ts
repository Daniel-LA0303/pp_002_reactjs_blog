// Categories Interfaces

import { PageableI } from "./blog";
import { UserSimpleInfoI } from "./user";

/**
 * category
 */
export interface Category {
  categoryId: number;
  name: string;
  description: string;
  color: string;
  postsNumber: number;
  longDescription: string;
  createdAt: string;
}

export interface BlogsByCatgoryInfoI {
  categoryFullInfoDTO: Category;
  follewersCategory: UserSimpleInfoI[];
  usersFollowersIds: number[];
}

/**
 * category select
 */
export interface CategoriesSelect {
  label: string;
  value: number;
}

/**
 * categories selected
 */
export interface CategoriesSelectedInterface {
  label: string;
  value: number;
}

export interface CategoryAllInfoI{
  categoryId: number;
  name: string;
  description: string;
  color: string;
  value: string;
  label: string;
  createdAt: string;
  updatedAt: string;
}


export interface ApiResponse<T> {
  status: number;
  path: string;
  method: string;
  message: string;
  data: T;
  error: boolean;
  timestamp: string;
}


export interface CategorySmallInfo{
  categroyId: number; 
  name: string;
  description: string;
  color: string; // Hexadecimal format
  createdAt: string;
}

export interface CategoryTop{
  categoryId: number;
  name: string;
  color: string;
  followers: number
}

export interface CategoryPageableResponseI {
  content: Category[];
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

