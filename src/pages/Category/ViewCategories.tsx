import React, { useEffect, useState } from "react";

import { Category } from "../../types/category"; 
import CategoryCard from "../../components/Category/CategoryCard";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import axios from "axios";

import NavBar from "../../components/NavBar";

const ViewCategories: React.FC = () => {
  /*const dispatch = useDispatch<AppDispatch>(); 
  const loading = useSelector((state: RootState) => state.categories.loading);
  const error = useSelector((state: RootState) => state.categories.error);*/

  const [categories, setCategories] = useState<Category[]>([]);

  
  const [page, setPage] = useState(0);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [hasMoreCategories, setHasMoreCategories] = useState(true);

  /**
   * TODO first we do it direct, in the future we need to do it with redux
   * @returns 
   */
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await dispatch(fetchCategories()).unwrap(); 
  //       setCategories(response); 
  //     } catch (err) {
  //       console.error("Error al obtener categorías", err);
  //       //console.log("status", err.status);
        
  //     }
  //   };

  //   fetchData();
  // }, [dispatch]);

  // if (loading) return <Spinner />;
  // if (error) return <Error />;

  const fetchCategories = async () => {
    if (loadingCategories || !hasMoreCategories) return;

    setLoadingCategories(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/api/category/pagination?page=${page}&size=10`
      );

      console.log(response.data.data);
      
      const { content, last } = response.data.data;
      setCategories((prevCategories) => [...prevCategories, ...content]);
      setPage((prevPage) => prevPage + 1);
      setHasMoreCategories(!last);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    fetchCategories();
  }, []);

  // Manejar el Infinite Scroll
  const handleScroll = () => {
    if (
      !loadingCategories &&
      hasMoreCategories &&
      window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.scrollHeight
    ) {
      fetchCategories();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingCategories, hasMoreCategories]);

  if (loadingCategories) return <Spinner />;
  if (!loadingCategories && categories.length === 0) return <Error />;

  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
            {categories.map((category) => (
                <CategoryCard 
                  key={category.categoryId} 
                  {...category}
                  {...categories} 
                />
            ))}
        </div>
    </div>
    </div>

  )
}

export default ViewCategories