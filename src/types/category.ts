// Categories Interfaces

/**
 * category
 */
export interface Category {
  categoryId: number;
  name: string;
  description: string;
  color: string;
  postsNumber: number;
  createdAt: string;
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


