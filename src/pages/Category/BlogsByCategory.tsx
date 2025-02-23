import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import CategoryCard from '../../components/Category/CategoryCard';
import { useParams } from 'react-router-dom';
import BlogCard from '../../components/BlogCard';
import NavBar from '../../components/NavBar';
import { BlogCardI } from '../../types/blog';
import CardBlogSkeleton from '../../components/Skeletons/Blog/CardBlogSkeleton';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CircularButton from '../../components/User/CircularButton';
import { UserSimpleInfoI } from '../../types/user';

const BlogsByCategory = () => {

  /**
   * Redux state
   */
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  /**
   * use route params
   */
  const { nameCategory } = useParams<{ nameCategory: string }>();
  
  /**
   * State
   */
  const [categoryInfo, setCategoryInfo] = useState<any>({});
  const [blogs, setBlogs] = useState<BlogCardI[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);  

  /**
   * Refs
   */
  const abortController = useRef<AbortController | null>(null);
  const currentCategory = useRef<string | null | undefined>(undefined);
  const fetchingInProgress = useRef<boolean>(false); 

  /**
   * useEffect
   */
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingBlogs, hasMore]);
  
  /**
   * functions 
   */
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

  return (

    <div className='overflow-x-hidden'>
      <NavBar />
      <div className="w-full max-w-screen-lg px-2 lg:mx-auto mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <CategoryCard
            categoryId={categoryInfo?.categoryFullInfoDTO?.categoryId ?? null} // Asignar null si no está disponible
            nameCategory={categoryInfo?.categoryFullInfoDTO?.name ?? ''}
            color={categoryInfo?.categoryFullInfoDTO?.color ?? ''}
            postsNumber={categoryInfo?.categoryFullInfoDTO?.postsNumber ?? 0}
            description={categoryInfo?.categoryFullInfoDTO?.description ?? ''}
            usersFollowersIds={categoryInfo?.usersFollowersIds || []}
          />

        </div>

        <aside className="hidden md:block pb-4 px-4 bg-gray-100 rounded-lg lg:col-span-1 max-h-[800px] overflow-auto">
          <h2 
            // style={{ color: categoryInfo?.categoryFullInfoDTO.color || '#fff' }}
            className="mb-4 text-lg font-semibold text-gray-700"
          >{categoryInfo?.categoryFullInfoDTO?.name}</h2>
          <hr />
            {
              accessToken && 
              <div className='mb-4'>
                <Link
                  to={`/create-blog`}
                  className="px-6 py-2 mt-5 w-28 bg-blue-500 text-white text-sm rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Create Blog
                </Link>
              </div>
            }
          <hr />
          <p 
            className='mb-4 leading-relaxed'
          >{categoryInfo?.categoryFullInfoDTO?.longDescription}</p>
          <hr />
          <div>
            <p className='mb-2 text-base font-semibold text-gray-700'>Users than follow this category</p>
            <ul className="flex flex-wrap ">
              {categoryInfo?.follewersCategory?.map((user: any) => (
                <li key={user?.userId} className="flex items-center space-x-3">
                  <CircularButton 
                    {...user as UserSimpleInfoI} 
                  />
                </li>
              ))}
            </ul>
          </div>

        </aside>

        <div className="lg:col-span-2">
          {loadingBlogs ? (
            <CardBlogSkeleton />
          ) : blogs.length > 0 ? (
            <div className="">
              {blogs.map((blog, index) => (
                <BlogCard key={index} {...blog} />
              ))}
            </div>
          ) : (
            initialLoad && !loadingBlogs && blogs.length === 0 && (
              <p className="text-center text-gray-500 font-bold mt-10">
                There are no blogs in this category
              </p>
            )
          )}
        </div>
      </div>
  </div>

  );
};

export default BlogsByCategory