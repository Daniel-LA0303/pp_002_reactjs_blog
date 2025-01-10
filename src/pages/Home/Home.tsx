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
  
    const fetchBlogs = async () => {
      if (loading || !hasMore) return;
  
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/api/blog/pagination?page=${page}&size=10`
        );
  
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
                    <ul>
                        <li><Link to={"/user-settings"}>Profile settings</Link></li>
                        <li><Link to={"/view-blog"}>View blog</Link></li>
                        <li><Link to={"/profile"}>Profile</Link></li>
                        <li><Link to={"/create-blog"}>Create a blog</Link></li>
                        <li><Link to={"/dashboard"}>Dashboard</Link></li>
                        <li><Link to={"/categories"}>Categories</Link></li>
                    </ul>
                    <div>
                        <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            <option>Latest</option>
                            <option>Last Week</option>
                        </select>
                    </div>
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
                
                



                <div className="mt-8">
                    <div className="flex">
                        <a href="#" className="px-3 py-2 mx-1 font-medium text-gray-500 bg-white rounded-md cursor-not-allowed">
                            previous
                        </a>
                    
                        <a href="#" className="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white">
                            1
                        </a>
                    
                        <a href="#" className="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white">
                            2
                        </a>
                    
                        <a href="#" className="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white">
                            3
                        </a>
                    
                        <a href="#" className="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white">
                            Next
                        </a>
                    </div>
                </div>
            </div>

            {/* top autors/categories */}
            <div className="hidden md:w-4/12 lg:w-3/12  -mx-8 md:block ml-0">
                <div className="px-8">
                    <h1 className="mb-4 text-xl font-bold text-gray-700">Top Authors</h1>
                    <div className="flex flex-col max-w-sm px-6 py-4 mx-auto bg-white rounded-lg shadow-md">
                        <ul className="-mx-4">
                            <li className="flex items-center"><img
                                    src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=731&amp;q=80"
                                    alt="avatar" className="object-cover w-10 h-10 mx-4 rounded-full" />
                                <p><a href="#" className="mx-1 font-bold text-gray-700 hover:underline">Alex John</a><span
                                        className="text-sm font-light text-gray-700">Created 23 Posts</span></p>
                            </li>
                            <li className="flex items-center mt-6"><img
                                    src="https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=333&amp;q=80"
                                    alt="avatar" className="object-cover w-10 h-10 mx-4 rounded-full" />
                                <p><a href="#" className="mx-1 font-bold text-gray-700 hover:underline">Jane Doe</a><span
                                        className="text-sm font-light text-gray-700">Created 52 Posts</span></p>
                            </li>
                            <li className="flex items-center mt-6"><img
                                    src="https://images.unsplash.com/photo-1531251445707-1f000e1e87d0?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=281&amp;q=80"
                                    alt="avatar" className="object-cover w-10 h-10 mx-4 rounded-full" />
                                <p><a href="#" className="mx-1 font-bold text-gray-700 hover:underline">Lisa Way</a><span
                                        className="text-sm font-light text-gray-700">Created 73 Posts</span></p>
                            </li>
                            <li className="flex items-center mt-6"><img
                                    src="https://images.unsplash.com/photo-1500757810556-5d600d9b737d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=735&amp;q=80"
                                    alt="avatar" className="object-cover w-10 h-10 mx-4 rounded-full" />
                                <p><a href="#" className="mx-1 font-bold text-gray-700 hover:underline">Steve Matt</a><span
                                        className="text-sm font-light text-gray-700">Created 245 Posts</span></p>
                            </li>
                            <li className="flex items-center mt-6"><img
                                    src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=373&amp;q=80"
                                    alt="avatar" className="object-cover w-10 h-10 mx-4 rounded-full" />
                                <p><a href="#" className="mx-1 font-bold text-gray-700 hover:underline">Khatab
                                        Wedaa</a><span className="text-sm font-light text-gray-700">Created 332 Posts</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="px-8 mt-10">
                    <h1 className="mb-4 text-xl font-bold text-gray-700">Top Categories</h1>
                    <div className="flex flex-col max-w-sm px-4 py-6 mx-auto bg-white rounded-lg shadow-md">
                        <ul>
                            <li><a href="#" className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">-
                                    AWS</a></li>
                            <li className="mt-2"><a href="#"
                                    className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">-
                                    Laravel</a></li>
                            <li className="mt-2"><a href="#"
                                    className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">- Vue</a>
                            </li>
                            <li className="mt-2"><a href="#"
                                    className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">-
                                    Design</a></li>
                            <li className="flex items-center mt-2"><a href="#"
                                    className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">-
                                    Django</a></li>
                            <li className="flex items-center mt-2"><a href="#"
                                    className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">- PHP</a>
                            </li>
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