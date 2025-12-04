import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material"; // Ajusta la importación según tu proyecto
import { fetchDeleteUnfollowUser, fetchPostFollowUser } from "../services/userService";
import { RootState } from "../../../redux/store";

interface SearchUserCardProps {
  userId: number;
  username: string;
  city?: string;
  followers: number;
  following: number;
  usersFollowers?: number[];
  joinedDate: string; // Nueva propiedad para la fecha de unión
  profileImage?: string; // Nueva propiedad para la imagen de perfil
}

const SearchUserCard: React.FC<SearchUserCardProps> = (props) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const userIdAuth = useSelector((state: RootState) => state.auth.userId);

  const [isFollowing, setIsFollowing] = useState(
    userIdAuth !== null && props?.usersFollowers?.includes(userIdAuth)
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userIdAuth && props?.usersFollowers?.includes(userIdAuth)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [userIdAuth, props.usersFollowers]);

  const handleFollow = async () => {
    if (!accessToken || userIdAuth === props.userId || userIdAuth === null) {
      return;
    }

    try {
      setLoading(true);
      await fetchPostFollowUser(userIdAuth, props.userId);
      setIsFollowing(true);
    } catch (error) {
      console.error("Error al seguir al usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async () => {
    if (!accessToken || userIdAuth === props.userId || userIdAuth === null) {
      return;
    }

    try {
      setLoading(true);
      await fetchDeleteUnfollowUser(userIdAuth, props.userId);
      setIsFollowing(false);
    } catch (error) {
      console.error("Error al dejar de seguir al usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-white shadow-lg rounded-lg mx-auto my-2 md:w-full">
      <div className="flex items-start px-4 py-6 w-full">
        {/* Imagen de perfil */}
        <Link to={`/profile/${props.userId}`}>
          <img
            className="w-12 h-12 rounded-full object-cover mr-4 shadow"
            src={props?.profileImage || "https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true"} // Imagen por defecto
            alt="avatar"
          />
        </Link>

        {/* Información del usuario */}
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 -mt-1">
              <Link to={`/profile/${props.userId}`}>{props.username}</Link>
            </h2>
          </div>

          {/* Estadísticas (Followers y Following) */}
          <div className="flex mt-2">
            <div className="mr-4">
              <span className="text-sm font-bold text-gray-700">
                {props.followers}
              </span>
              <span className="text-sm text-gray-500 ml-1">Followers</span>
            </div>
            <div>
              <span className="text-sm font-bold text-gray-700">
                {props.following}
              </span>
              <span className="text-sm text-gray-500 ml-1">Following</span>
            </div>
          </div>
        </div>

        {/* Botón de Follow/Unfollow */}
        {accessToken && userIdAuth !== props.userId && (
          <button
            onClick={isFollowing ? handleUnfollow : handleFollow}
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : isFollowing ? (
              "Unfollow"
            ) : (
              "Follow"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchUserCard;