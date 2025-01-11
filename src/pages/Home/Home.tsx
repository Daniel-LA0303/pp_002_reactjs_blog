import BlogCard from '../../components/BlogCard'
import RecommendBlog from '../../components/Blog/RecommendBlog'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar';
import NavBar from '../../components/NavBar';
import SideBarMenu from '../../components/sidebar/SideBarMenu';

const Home = () => {

    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); 

    //temp state
    const [homePageInfo, setHomePageInfo] = useState({
        usersTop: [],
        categoriesTop: []
    });
  
    useEffect(() => {
        
        const fetchHomeInfo = async () => {
            try {
                
                const response = await axios.get(`http://127.0.0.1:8080/api/blog/home-page-info`)
                console.log(response);
                setHomePageInfo(response.data.data);
            } catch (error) {
                console.log(error);
                
            }
        }

        fetchHomeInfo();
      }, []);


    const fetchBlogs = async () => {
      if (loading || !hasMore) return;
  
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/api/blog/pagination?page=${page}&size=10`
        );
        console.log(response);
        
        const { content, last } = response.data.data; 
        setBlogs((prevBlogs) => [...prevBlogs, ...content]); 
        setPage((prevPage) => prevPage + 1); 
        setHasMore(!last); 
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
  
    // Cargar datos iniciales
    useEffect(() => {
      fetchBlogs();
    }, []);
  
    // Manejar el Infinite Scroll
    const handleScroll = () => {
      if (
        !loading &&
        hasMore &&
        window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.scrollHeight
      ) {
        fetchBlogs();
      }
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll); 
    }, [loading, hasMore]);
  return (
<div className="overflow-x-hidden bg-gray-100">
    
    <NavBar />

    <div className="px-3 md:px-6 py-8 mt-20">
        <div className="w-full md:w-full lg:w-11/12 flex justify-between mx-auto">

            {/* aside menu */}
            <div className='hidden md:block md:w-2/12 lg:w-2/12'>
                <SideBarMenu />
            </div>

            {/* blogs home */}
            <div className="w-full md:w-6/12 lg:w-7/12">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-700 md:text-2xl">Post</h1>

                </div>

                {/* show blogs */}

            {blogs.map((b, index) => (
              <BlogCard 
                    key={index} {...b} 
                    {...blogs}

                />
            ))}

            {/* Indicador de carga */}
            {loading && <p>Cargando más blogs...</p>}
                
                



                
            </div>

            {/* top autors/categories */}
            <div className="hidden md:w-4/12 lg:w-3/12  -mx-8 md:block ml-0">
                <div className="px-8">
                    <h1 className="mb-4 text-xl font-bold text-gray-700">Top Authors</h1>
                    <div className="flex flex-col max-w-sm px-6 py-4 mx-auto bg-white rounded-lg shadow-md">
                        <ul className="-mx-4">
                            {homePageInfo.usersTop.map(user => (
                                <li key={user.userId} className="flex items-center mb-4">
                                    <Link  to={`/profile/${user.userId}`}>
                                        <img
                                            src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=731&amp;q=80"
                                            alt="avatar"
                                            className="object-cover w-10 h-10 mx-1 rounded-full"
                                        />
                                    </Link>
                                    <p>
                                        <Link
                                        to={`/profile/${user.userId}`}
                                        className="mx-1 font-bold text-gray-700 hover:underline"
                                        >
                                        {user.name}
                                        </Link>
                                        <p className="mx-1 text-xs font-light text-gray-700">
                                        Created {user.blogsCounts} Posts
                                        </p>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="px-8 mt-10">
                    <h1 className="mb-4 text-xl font-bold text-gray-700">Top Categories</h1>
                    <div className="flex flex-col max-w-sm px-4 py-6 mx-auto bg-white rounded-lg shadow-md">
                        <ul>
                            {homePageInfo.categoriesTop.map(category => (
                                <li key={category.categoryId}>
                                    <Link
                                        to={`/categoy-by-blog/${category.name}`}
                                        className="mx-1 font-bold text-gray-700 hover:text-gray-600  flex"
                                         
                                    >   
                                        <span 
                                            className=''
                                            style={{ color: category.color }}
                                        >#</span>
                                        <div className='flex justify-between w-full'>
                                            <p className='ml-1 hover:underline'>{category.name}</p>
                                            <p> 
                                                <span className='font-normal text-xs hover:no-underline'>followers </span>
                                                {category.followers}
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>
                <div className="px-8 mt-10">
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