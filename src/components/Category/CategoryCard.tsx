import { Link } from "react-router-dom";
import { Category } from "../../types/category";

  
  interface CategoryCardProps {
    category: Category;
  }

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div
    style={{
        borderBottom: `5px solid ${category.color}`,
      }}
    className=" w-full my-2 whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-4 font-sans font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none mx-auto"
    >
        <div className="mb-2 flex justify-between items-center gap-3">
            <Link
                to={`/categoy-by-blog/${category.name}`}
                style={{
                    color: category.color, // Color inicial
                }}
                className="block font-sans text-base font-medium leading-relaxed tracking-normal antialiased transition-colors"
                onMouseEnter={(e) => {
                    e.currentTarget.style.color = category.color; // Color dinámico en hover
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#000"; // Restaura al estilo original
                }}
            >
              @{category.name}
                
            </Link>
            <span className=" text-xs">{category.postsNumber} posts</span>
        </div>
        <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
            {category.description}
        </p>
    </div>

  )
}

export default CategoryCard