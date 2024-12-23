export interface Category {
    categoryId: number;
    name: string;
    description: string;
    color: string;
    createdAt: string;
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
  