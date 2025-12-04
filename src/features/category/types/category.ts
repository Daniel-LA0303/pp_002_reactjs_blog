// Categories Interfaces

import { PageableI } from "../../blog/types/blog";
import { UserSimpleInfoI } from "../../user/types/user";

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

