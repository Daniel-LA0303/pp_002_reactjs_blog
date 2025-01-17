import axios from 'axios';
import { useEffect, useState } from 'react'
import CategoryCard from '../../components/Category/CategoryCard';
import { useParams } from 'react-router-dom';
import BlogCard from '../../components/BlogCard';
import NavBar from '../../components/NavBar';
import { BlogCardI } from '../../types/blog';
import { Category } from '../../types/category';

const BlogsByCategory = () => {

  const { nameCategory } = useParams<{ nameCategory: string }>();

  const [categoryInfo, setCategoryInfo] = useState<Category>();
  const [blogs, setBlogs] = useState<BlogCardI[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(false);

  // Reinicia estado al cambiar la categoría
  useEffect(() => {
    console.log("Category changed to:", nameCategory);
    setBlogs([]);
    setPage(0);
    setHasMore(true);
    fetchCategoryInfo();
    const delayFetchBlogs = setTimeout(() => {
      fetchBlogs(); // Inicia con la primera página
    }, 400);
    return () => clearTimeout(delayFetchBlogs);
  }, [nameCategory]);
  

  // Cargar información de la categoría
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

  // Cargar blogs
  const fetchBlogs = async () => {
    if (loadingBlogs || !hasMore) return;
    setLoadingBlogs(true);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/api/blog/${nameCategory}/blogs?page=${page}&size=5`
      );
      console.log("Blogs:", response);

      const { content, last } = response.data;
      setBlogs((prevBlogs) => {
        // Evitar duplicados al comparar la longitud actual y la nueva
        if (page === 0) {
          return [...content]; // Si es la primera página, reemplazamos los blogs
        } else {
          return [...prevBlogs, ...content]; // Si no es la primera página, agregamos más
        }
      });
      setHasMore(!last);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoadingBlogs(false);
    }
  };

  // Disparar la carga de blogs al cambiar `page` o `nameCategory`
  useEffect(() => {
    // if (page > 0) {
      fetchBlogs(); // Solo llamamos a fetchBlogs si la página no es 0
    // }
  }, [page]);


  // Manejar scroll para cargar más blogs
  const handleScroll = () => {
    if (
      !loadingBlogs &&
      hasMore &&
      window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingBlogs, hasMore]);

  

    // TODO this cause a bug
    // if(loadingBlogs) return <Spinner />

  return (
    <div>
      <NavBar />
      <div className='w-full md:w-5/6 lg:w-6/12 mx-auto mt-16'>
        <CategoryCard 
            {...categoryInfo as Category}
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