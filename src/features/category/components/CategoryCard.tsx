import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { followCategory, unfollowCategory } from "../services/categoryService";

interface CategoryCardProps {
  categoryId: number;
  nameCategory: string;
  color: string;
  postsNumber: number;
  description: string;
  usersFollowersIds: number[];
}

const CategoryCard: React.FC<CategoryCardProps> = ({categoryId, nameCategory, color, postsNumber, description, usersFollowersIds}) => {

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const userIdAuth = useSelector((state: RootState) => state.auth.userId);

  const [isFollowing, setIsFollowing] = useState(
    userIdAuth !== null && usersFollowersIds.includes(userIdAuth)
  );

  useEffect(() => {
    if (userIdAuth && usersFollowersIds.includes(userIdAuth)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false); 
    }
  }, [userIdAuth, usersFollowersIds]);

  const handleFollowUnfollow = async () => {

    if (userIdAuth === null) {
      console.error("No se puede seguir o dejar de seguir sin un userId válido.");
      return;
    }
    
    if (isFollowing) {
      try {
        await unfollowCategory(categoryId, userIdAuth);
        setIsFollowing(false);
      } catch (error) {
        console.error("Error unfollowing category", error);
      }
    } else {
      try {
        await followCategory(categoryId, userIdAuth);
        setIsFollowing(true);
      } catch (error) {
        console.error("Error following category", error);
      }
    }
    
  };

  return (
    <div
    style={{
        borderBottom: `5px solid ${color}`,
      }}
    className={`w-full ${accessToken ? "flex flex-col justify-between" : ""} my-2 whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-4 font-sans font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none mx-auto`}
    >
        <div className="mb-2 flex justify-between items-center gap-3">
            <Link
                to={`/categoy-by-blog/${nameCategory}`}
                style={{
                    color: color, 
                }}
                className="block font-sans text-base font-medium leading-relaxed tracking-normal antialiased transition-colors"
                onMouseEnter={(e) => {
                    e.currentTarget.style.color = color;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#000"; 
                }}
            >
              @{nameCategory}
                
            </Link>
            <span className=" text-xs">{postsNumber} posts</span>
        </div>
        <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
            {description}
        </p>

        {
          accessToken &&
          <button 
            className="px-6 py-2 mt-5 w-28 bg-blue-500 text-white text-sm rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={handleFollowUnfollow}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        }
    </div>

  )
}

export default CategoryCard