import { useState } from "react";
import useSearch from "../../hooks/utils/useSearch";
import { SearchGeneralProps } from "../../types/search";
import CardBlogSkeleton from "../Skeletons/Blog/CardBlogSkeleton";
import BlogCard from "../BlogCard";

const SearchBlogs: React.FC<SearchGeneralProps> = ({ query }) => {
  const [page, setPage] = useState<number>(0); // Estado para la página actual
  const size = 10; // Tamaño de la página

  const { data, loading, error } = useSearch("blogs", query as string, page, size);

  // Calcular el número total de páginas
  const totalPages = data?.blogs?.totalPages || 0;

  const getVisiblePageNumbers = () => {
    const totalPages = data?.blogs?.totalPages || 1; 
    const currentPage = page + 1; // Página actual (ajustada porque `page` empieza en 0)
    const visiblePages = 5; // Número de páginas visibles alrededor de la actual
  
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);
  
    // Ajustar el rango si estamos cerca del inicio o del final
    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }
  
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
 
        {data?.blogs.content.length > 0 && (
            <div className="flex justify-center items-center mb-6 space-x-2">
            <button
                onClick={() => {
                setPage(0); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
                }}
                disabled={page === 0} 
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
                Primera
            </button>

            <button
                onClick={() => {
                setPage(page - 1); 
                window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={page === 0}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
                Anterior
            </button>

            {getVisiblePageNumbers().map((pageNumber) => (
                <button
                key={pageNumber}
                onClick={() => {
                    setPage(pageNumber - 1); 
                    window.scrollTo({ top: 0, behavior: 'smooth' }); 
                }}
                className={`px-4 py-2 rounded ${
                    page === pageNumber - 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300" 
                }`}
                >
                {pageNumber}
                </button>
            ))}

            <button
                onClick={() => {
                setPage(page + 1); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
                }}
                disabled={page === totalPages - 1} 
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
                Siguiente
            </button>

            <button
                onClick={() => {
                setPage(totalPages - 1); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
                }}
                disabled={page === totalPages - 1} 
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
                Última
            </button>
            </div>
        )}



        <div className="space-y-4">
            {loading ? (
                <CardBlogSkeleton />
            ) : data?.blogs?.content?.length === 0 ? (
                <div>No se encontraron blogs.</div>
            ) : (
                data?.blogs?.content?.map((blog: any) => (
                <BlogCard key={blog.blogId} {...blog} />
                ))
            )}
        </div>

        {data?.blogs?.content.length > 0 && (
            <div className="flex justify-center items-center mt-6 space-x-2">

            <button
                onClick={() => {
                setPage(0); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
                }}
                disabled={page === 0} 
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
                Primera
            </button>

            <button
                onClick={() => {
                setPage(page - 1); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
                }}
                disabled={page === 0} 
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
                Anterior
            </button>

            {getVisiblePageNumbers().map((pageNumber) => (
                <button
                key={pageNumber}
                onClick={() => {
                    setPage(pageNumber - 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-4 py-2 rounded ${
                    page === pageNumber - 1
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300" 
                }`}
                >
                {pageNumber}
                </button>
            ))}

            <button
                onClick={() => {
                setPage(page + 1); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
                }}
                disabled={page === totalPages - 1} 
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
                Siguiente
            </button>

            <button
                onClick={() => {
                setPage(totalPages - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
                }}
                disabled={page === totalPages - 1} 
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
                Última
            </button>
            </div>
        )}
    </div>
  );
};

export default SearchBlogs;