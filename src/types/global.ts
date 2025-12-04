import { CategoryTop } from "../features/category/types/category";
import { UserTop } from "../features/user/types/user";


export interface UserCategoryTop{
    usersTop: UserTop[];
    categoriesTop: CategoryTop[];
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
