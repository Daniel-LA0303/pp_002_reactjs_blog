import { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar"
import { BlogCardI } from "../../../types/blog";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlogCard from "../../../components/BlogCard";
import { Link } from "react-router-dom";


const BlogsByUserDashboard = () => {

    const { id } = useParams<{ id: string }>(); 

    const [blogs, setBlogs] = useState<BlogCardI[]>([]);
    const [page, setPage] = useState(0);
    const [loadingBlogs, setLoadingBlogs] = useState(false);
    const [hasMore, setHasMore] = useState(true); 


      // verify id from params
  const userIdNumber = id ? parseInt(id) : NaN;


    const fetchBlogs = async () => {

        if (loadingBlogs || !hasMore) return;
        setLoadingBlogs(true);
        
        try {
          const response = await axios.get(
            `http://127.0.0.1:8080/api/blog/pagination-by-user?userId=${userIdNumber}&page=${page}&size=5`
          );
          const { content, last } = response.data.data;
          setBlogs((prevBlogs) => [...prevBlogs, ...content]);
          setPage((prevPage) => prevPage + 1);
          setHasMore(!last);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        } finally {
          setLoadingBlogs(false);
        }
      };
    
      // function activate scroll
      const handleScroll = () => {
        if (
          !loadingBlogs &&
          hasMore &&
          window.innerHeight + document.documentElement.scrollTop + 50 >=
          document.documentElement.scrollHeight
        ) {
          fetchBlogs();
        }
      };



          // fecth get blogs
          useEffect(() => {
            fetchBlogs();
          }, []);
        
          // activate scroll
          useEffect(() => {
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll); 
          }, [loadingBlogs, hasMore]);
      

  return (
    <div className="bg-gray-100 overflow-x-hidden">
        <NavBar />

         {/* blogs by user */}
         <div className='w-full sm:w-9/12 md:w-6/12 mx-auto'>
            <div className='w-full items-center mt-20'>
              {blogs.length !== 0 ? blogs.map((b, index) => (
                <BlogCard 
                  key={index} 
                  {...b} 
                  {...blogs}
                />
              )) : 
              <div className='flex flex-col justify-center items-center '>
                <p className='text-center text-2xl mt-10'>You do not have blogs yet</p>
                <p className='text-lg mt-5 mb-3'>You can create a blog here</p>
                <Link to={`/create-blog`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Create Blog
                  </Link>
              </div>
              }
              {loadingBlogs && <p>Cargando más blogs...</p>}
            </div>
          </div>
        
    </div>
  )
}

export default BlogsByUserDashboard