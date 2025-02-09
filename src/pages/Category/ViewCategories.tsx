/**
 * react imports
 */
import React, { useEffect, useState } from "react";

/**
 * types 
 */
import { Category } from "../../types/category"; 

/**
 * components
 */
import NavBar from "../../components/NavBar";
import CategoryCard from "../../components/Category/CategoryCard";

/**
 * services
 */
import { fetchCategoriesPaginated } from "../../services/categoryService";

const ViewCategories: React.FC = () => {

  //state section
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(0);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [hasMoreCategories, setHasMoreCategories] = useState(true);

  // functions section
  // handle scroll
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

  // fetch categories
  const fetchCategories = async () => {
    if (loadingCategories || !hasMoreCategories) return;

    setLoadingCategories(true);
    try {
        const response = await fetchCategoriesPaginated(page, 10);

        console.log(response.data);

        const { content, last } = response.data;
        setCategories((prevCategories) => [...prevCategories, ...content]);
        setPage((prevPage) => prevPage + 1);
        setHasMoreCategories(!last);
    } catch (error) {
        console.error("Error fetching categories:", error);
    } finally {
        setLoadingCategories(false);
    }
  };

  // useEffect section
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingCategories, hasMoreCategories]);

  return (
    <div>
      <NavBar />
      <div className="container w-full max-w-screen-lg px-2 lg:px-0 lg:mx-auto flex flex-wrap gap-4 mt-5">
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