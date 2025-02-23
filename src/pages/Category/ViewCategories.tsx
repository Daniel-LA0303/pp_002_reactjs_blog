/**
 * react imports
 */
import React, { useEffect, useRef, useState } from "react";

/**
 * components
 */
import NavBar from "../../components/NavBar";
import CategoryCard from "../../components/Category/CategoryCard";

/**
 * services
 */
import { fetchCategoriesPaginated } from "../../services/categoryService";
import CardCategorySkeleton from "../../components/Skeletons/Category/CardCategorySkeleton";

const ViewCategories: React.FC = () => {

  //state section
  const [categories, setCategories] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [hasMoreCategories, setHasMoreCategories] = useState(true);

  const scrollTimeout = useRef<number | null>(null);

  // Fetch categories function
  const fetchCategories = async () => {
    if (loadingCategories || !hasMoreCategories) return;
    setLoadingCategories(true);

    try {
      const response = await fetchCategoriesPaginated(page, 10);      
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

  // Scroll handler
  const handleScroll = () => {
    if (
      !loadingCategories &&
      hasMoreCategories &&
      window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.scrollHeight
    ) {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = window.setTimeout(() => {
        fetchCategories();
      }, 100);
    }
  };

  // Initial fetch
  useEffect(() => {
    let isMounted = true;
    setLoadingCategories(true);

    const delayFetchCategories = setTimeout(async () => {
      try {
        const response = await fetchCategoriesPaginated(0, 18);
        if (isMounted) {
          setCategories(response.data.content);
          setPage(1);
          setHasMoreCategories(!response.data.last);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        if (isMounted) {
          setLoadingCategories(false);
        }
      }
    }, 10); // Evita la doble petición inicial

    return () => {
      isMounted = false;
      clearTimeout(delayFetchCategories);
    };
  }, []);

  // Scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingCategories, hasMoreCategories]);


  return (
<div>
  <NavBar />
  <div className="container w-full max-w-screen-lg px-2 lg:px-0 lg:mx-auto flex flex-wrap gap-4 mt-5">
  
    {loadingCategories && categories.length === 0 && (
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
        <CardCategorySkeleton />
      </div>
    )}

    {categories.length > 0 && (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
        {categories.map((category) => (
          <CategoryCard
            key={category?.categoryFullInfoDTO?.categoryId} // Usando categoryId como key
            categoryId={category.categoryFullInfoDTO.categoryId ?? null}
            nameCategory={category.categoryFullInfoDTO.name ?? ''}
            color={category.categoryFullInfoDTO.color ?? ''}
            postsNumber={category.categoryFullInfoDTO.postsNumber ?? 0}
            description={category.categoryFullInfoDTO.description ?? ''}
            usersFollowersIds={category.usersFollowersIds || []}
          />
        ))}

      </div>
    )}
  </div>
</div>




  )
}

export default ViewCategories