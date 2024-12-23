import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../slices/categorySlice";
import { AppDispatch, RootState } from "../../redux/store";
import { Category } from "../../types/category"; // Tipo de categoría
import CategoryCard from "../../components/Category/CategoryCard";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";

const ViewCategories: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Tipar correctamente el dispatch
  const loading = useSelector((state: RootState) => state.categories.loading);
  const error = useSelector((state: RootState) => state.categories.error);

  const [categories, setCategories] = useState<Category[]>([]);

  // Invocar la función de fetchCategories cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchCategories()).unwrap(); // Usamos unwrap para obtener directamente el payload
        setCategories(response); // Setea las categorías si la llamada fue exitosa
      } catch (err) {
        // Manejo de errores
        console.error("Error al obtener categorías", err);
        //console.log("status", err.status);
        
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) return <Spinner />;
  if (error) return <Error />;

  return (
    <div className="container mx-auto px-4 sm:px-8 w-10/12">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
                <CategoryCard key={category.categoryId} category={category} />
            ))}
        </div>
    </div>

  )
}

export default ViewCategories