import axios from 'axios';
import { useEffect, useState } from 'react'
import CategoryCard from '../../components/Category/CategoryCard';
import { useParams } from 'react-router-dom';
import BlogCard from '../../components/BlogCard';
import Spinner from '../../components/Spinner/Spinner';
import NavBar from '../../components/NavBar';

const BlogsByCategory = () => {

    const { nameCategory } = useParams<{ nameCategory: string }>();

    const [categoryInfo, setCategoryInfo] = useState({});

    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loadingBlogs, setLoadingBlogs] = useState(false);

    useEffect(() => {
        const fetchCategoryInfo = async () => {
            try {
              const response = await axios.get(
                `http://127.0.0.1:8080/api/category/${nameCategory}`
              );
              console.log(response);
              
              setCategoryInfo(response.data.data);
    
            } catch (error) {
              console.error("Error fetching categories:", error);
            } finally {
            //   setLoadingCategories(false);
            }
        };

        fetchCategoryInfo();
    }, [nameCategory]);


    const fetchBlogs = async () => {
      if (loadingBlogs || !hasMore) return;
  
      setLoadingBlogs(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/api/blog/${nameCategory}/blogs?page=${page}&size=5`
        );

        console.log(response);
        
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
  
    // Lógica de scroll infinito
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
  
    useEffect(() => {
      fetchBlogs();
    }, [nameCategory]); // Ejecutar al cargar el componente
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [loadingBlogs, hasMore]);
    

    if(loadingBlogs) return <Spinner />

  return (
    <div>
      <NavBar />
      <div className='w-full md:w-5/6 lg:w-10/12 mx-auto mt-16'>
        <CategoryCard 
            category={categoryInfo}
        />


<div className="mt-4">
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))
        ) : (
          <p className="text-center text-2xl mt-10">
            No blogs available for this category
          </p>
        )}
      </div>
      {loadingBlogs && <p className="text-center mt-4">Loading more blogs...</p>}
    </div>
    </div>
  )
}

export default BlogsByCategory