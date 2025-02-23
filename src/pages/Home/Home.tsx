/**
 * react
 */
import { useEffect, useRef, useState } from 'react';

/**
 * react router dom
 */
import { Link } from 'react-router-dom';

/**
 * types
 */
import { BlogCardI } from '../../types/blog';
import { UserCategoryTop } from '../../types/global';


/**
 * components
 */
import NavBar from '../../components/NavBar';
import SideBarMenu from '../../components/sidebar/SideBarMenu';
import RecommendBlog from '../../components/Blog/RecommendBlog'
import BlogCard from '../../components/BlogCard'

/**
 * services
 */
import { fetchBlogsHomePage } from '../../services/blogService';
import { fetchHomePageInfo } from '../../services/globalService';
import CardBlogSkeleton from '../../components/Skeletons/Blog/CardBlogSkeleton';
import { Avatar, Tooltip } from '@mui/material';

const Home = () => {

    // state section
    const [blogs, setBlogs] = useState<BlogCardI[]>([]);
    const [page, setPage] = useState(0);
    const [loadingBlogs, setLoadingBlogs] = useState(false);
    const [hasMore, setHasMore] = useState(true);
  
    // Estado para la información de la página de inicio
    const [homePageInfo, setHomePageInfo] = useState<UserCategoryTop>({
      usersTop: [],
      categoriesTop: [],
    });
  
    const scrollTimeout = useRef<number | null>(null);
  
    // Función para obtener los blogs paginados
    const fetchBlogs = async () => {
      if (loadingBlogs || !hasMore) return;
  
      setLoadingBlogs(true);
      try {
        const response = await fetchBlogsHomePage(page, 10);
  
        console.log("Home page blogs", response);
  
        const { content, last } = response.data;
        setBlogs((prevBlogs) => [...prevBlogs, ...content]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(!last);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoadingBlogs(false);
      }
    };
  
    // Manejador de scroll
    const handleScroll = () => {
      if (
        !loadingBlogs &&
        hasMore &&
        window.innerHeight + document.documentElement.scrollTop + 50 >=
          document.documentElement.scrollHeight
      ) {
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
  
        scrollTimeout.current = window.setTimeout(() => {
          fetchBlogs();
        }, 100);
      }
    };
  
    // Llamado inicial para obtener la información de la página
    useEffect(() => {
      const fetchHomeInfo = async () => {
        try {
          const response = await fetchHomePageInfo();
          console.log("Get top users and categories", response);
          setHomePageInfo(response.data);
        } catch (error) {
          console.error("Error fetching home page info:", error);
        }
      };
  
      fetchHomeInfo();
    }, []);
  
    // Llamado inicial con retraso para obtener los blogs
    useEffect(() => {
      let isMounted = true;
      setLoadingBlogs(true);
  
      const delayFetchBlogs = setTimeout(async () => {
        try {
          const response = await fetchBlogsHomePage(0, 10);
          if (isMounted) {
            setBlogs(response.data.content);
            setPage(1);
            setHasMore(!response.data.last);
          }
        } catch (error) {
          console.error("Error fetching blogs:", error);
        } finally {
          if (isMounted) {
            setLoadingBlogs(false);
          }
        }
      }, 10); // Retraso de 10 ms para evitar la doble petición inicial
  
      return () => {
        isMounted = false;
        clearTimeout(delayFetchBlogs);
      };
    }, []); // Este useEffect solo se ejecuta una vez al inicio
  
    // Evento de scroll
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [loadingBlogs, hasMore]);
    
return (
    <div className="overflow-x-hidden bg-gray-100">
    
        <NavBar />

        <div className=" py-2 mt-20">
            <div className="w-full max-w-screen-lg px-2  lg:mx-auto flex flex-wrap gap-4">

                {/* aside menu */}
                <div className='hidden md:block md:flex-1 lg:w-2/12'>
                    <SideBarMenu />
                </div>

                {/* blogs home */}
                <div className="w-full md:flex-[2] lg:w-7/12">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold text-gray-700 md:text-2xl">Post</h1>

                    </div>

                    {/* show blogs */}
                    {
                        blogs.length === 0 
                        ? <CardBlogSkeleton />
                        :  blogs.map((b, index) => (
                            <BlogCard 
                                    key={index} {...b} 
                                    {...blogs}
                                />
                            ))
                    }

                    {/* charge*/}
                    {loadingBlogs && <p>Charge more blogs...</p>}               
                </div>

                {/* aside top authors, tup categories and blogs recommended */}
                <div className="hidden lg:block lg:w-3/12">
                    {/* top authors */}
                    <div className="pl-4">
                        <h1 className="mb-4 text-xl font-bold text-gray-700">Top Authors</h1>
                        <div className="flex flex-col max-w-sm px-6 py-4 mx-auto bg-white rounded-lg shadow-md">
                            <ul className="-mx-4">
                                {homePageInfo?.usersTop.map(user => (
                                    <li key={user.userId} className="flex items-center mb-4">
                                                <Tooltip title={user.name} arrow>
                                                <Link to={`/profile/${user.userId}`} style={{ textDecoration: 'none' }}>
                                                    <Avatar
                                                        src="https://i.pravatar.cc/150?img=3" 
                                                        alt="User"
                                                        sx={{
                                                            width: 40,  
                                                            height: 40, 
                                                            cursor: "pointer",
                                                            transition: "transform 0.2s ease-in-out",
                                                            "&:hover": {
                                                                transform: "scale(1.01)",
                                                            },
                                                        }}
                                                    />
                                                </Link>
                                            </Tooltip>
                                            <p>
                                            <Link
                                            to={`/profile/${user.userId}`}
                                            className="mx-1 font-bold text-gray-700 hover:underline"
                                            >
                                            {user.name}
                                            </Link>
                                            <span className="mx-1 text-xs font-light text-gray-700">
                                            Created {user.blogsCounts} Posts
                                            </span>
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* top categories */}
                    <div className="pl-4 mt-10">
                        <h1 className="mb-4 text-xl font-bold text-gray-700">Top Categories</h1>
                        <div className="flex flex-col max-w-sm px-4 py-6 mx-auto bg-white rounded-lg shadow-md">
                            <ul>
                                {homePageInfo.categoriesTop.map(category => (
                                    <li key={category.categoryId}>
                                        <Link
                                            to={`/categoy-by-blog/${category.name}`}
                                            className="mx-1 font-bold text-gray-700 hover:text-gray-600  flex"
                                            
                                        >   
                                            <div className='flex justify-between w-full flex-col md:flex-row'>
                                                <p className='hover:underline'>
                                                    <span 
                                                        className=''
                                                        style={{ color: category.color }}
                                                    >#</span>
                                                    {category.name}
                                                </p>
                                                <p> 
                                                    <span className='font-normal text-xs hover:no-underline'>followers </span>
                                                    {category.followers}
                                                </p>
                                                
                                            </div>
                                            <div className=" my-2 border-t border-0.5 text-center"></div>
                                        </Link>
                                    </li>
                                ))}

                            </ul>
                        </div>
                    </div>

                    {/* top blogs */}
                    <div className="pl-4 mt-10">
                        <h1 className="mb-4 text-xl font-bold text-gray-700">Popular Posts</h1>
                        <RecommendBlog />
                        <RecommendBlog />
                        <RecommendBlog />
                        <RecommendBlog />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home