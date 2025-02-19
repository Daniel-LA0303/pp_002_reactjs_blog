import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import CategoryCard from '../../components/Category/CategoryCard';
import { useParams } from 'react-router-dom';
import BlogCard from '../../components/BlogCard';
import NavBar from '../../components/NavBar';
import { BlogCardI } from '../../types/blog';
import { Category } from '../../types/category';
import CardBlogSkeleton from '../../components/Skeletons/Blog/CardBlogSkeleton';

const BlogsByCategory = () => {

  const { nameCategory } = useParams<{ nameCategory: string }>();
  
  const [categoryInfo, setCategoryInfo] = useState<Category | null>(null);
  const [blogs, setBlogs] = useState<BlogCardI[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);  
  
  const abortController = useRef<AbortController | null>(null);
  const currentCategory = useRef<string | null | undefined>(undefined);
  const fetchingInProgress = useRef<boolean>(false); 


  useEffect(() => {
    console.log("Category changed to:", nameCategory);
    setBlogs([]);  
    setPage(0);    
    setHasMore(true);  
    setInitialLoad(false); 
    fetchCategoryInfo();  
    
    console.log("page:", page);
    
    currentCategory.current = nameCategory;
  
    if (abortController.current) {
      abortController.current.abort();
    }

    abortController.current = new AbortController(); 

    const timeoutId = setTimeout(() => {
      fetchBlogs(0); 
      setInitialLoad(true); 
    }, 200);  
    
    return () => clearTimeout(timeoutId);

  }, [nameCategory]);  

  const fetchCategoryInfo = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/api/category/${nameCategory}`
      );
      console.log("Category Info:", response);
      setCategoryInfo(response.data.data);
    } catch (error) {
      console.error("Error fetching category info:", error);
    }
  };

  const fetchBlogs = async (page: number) => {
    if (loadingBlogs || fetchingInProgress.current || !hasMore) return;

    setLoadingBlogs(true);
    fetchingInProgress.current = true;  

    if (currentCategory.current !== nameCategory) {
      setLoadingBlogs(false);
      fetchingInProgress.current = false;  
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/api/blog/${nameCategory}/blogs?page=${page}&size=5`,
        { signal: abortController.current?.signal }  
      );

      if (currentCategory.current !== nameCategory) {
        setLoadingBlogs(false);
        fetchingInProgress.current = false;  
        return;
      }

      console.log("Blogs:", response);

      const { content, last } = response.data;
      setBlogs((prevBlogs) => {
        if (page === 0) {
          return [...content];
        } else {
          return [...prevBlogs, ...content];
        }
      });
      setHasMore(!last);  
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoadingBlogs(false);
      fetchingInProgress.current = false;  
    }
  };

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight;

    
    if (!loadingBlogs && hasMore && scrollPosition + 50 >= documentHeight) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchBlogs(nextPage); 
        return nextPage;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingBlogs, hasMore]);

  return (
    <div>
      <NavBar />
      <div className="w-full sm:w-11/12 lg:w-8/12 mx-auto mt-16">
        <CategoryCard {...categoryInfo as Category} />

        {loadingBlogs ? (
          <>
            <CardBlogSkeleton />
          </>
        ) : blogs.length > 0 ? (
          <div className="mt-4">
            {blogs.map((blog, index) => (
              <BlogCard key={index} {...blog} />
            ))}
          </div>
        ) : (
          initialLoad && !loadingBlogs && blogs.length === 0 && (
            <p className="text-center text-gray-500 font-bold mt-10">There are no blogs in this category</p>
          )
        )}
      </div>
    </div>
  );
};

export default BlogsByCategory