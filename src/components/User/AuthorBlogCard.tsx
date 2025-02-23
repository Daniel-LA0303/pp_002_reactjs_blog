import React, { useEffect, useState } from "react"
import { UserInfoCard } from "../../types/user"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchDeleteUnfollowUser, fetchPostFollowUser } from "../../services/userService";
import CircularProgress from '@mui/material/CircularProgress';


const AuthorBlogCard: React.FC<UserInfoCard> = (props) => {

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
    <div className="relative w-full mx-auto md:max-w-2xl min-w-0 break-words bg-white mb-6 shadow-md rounded-xl mt-16">
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full flex justify-center">
            <div className="relative">
              <Link to={`/profile/${props.userId}`}>
                <img
                  src="https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true"
                  className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-10 lg:-ml-10 max-w-[100px]"
                />
              </Link>
            </div>
          </div>
          <div className="w-full text-center mt-5 md:mt-10">
            <div className="flex justify-center lg:pt-4 pt-8 pb-0">
              <div className="p-2 text-center">
                <span className="text-lg font-bold block uppercase tracking-wide text-slate-700">
                  {props.blogsByUser}
                </span>
                <span className="text-sm text-slate-400">Blogs</span>
              </div>
              <div className="p-2 text-center">
                <span className="text-lg font-bold block uppercase tracking-wide text-slate-700">
                  {props.followers}
                </span>
                <span className="text-sm text-slate-400">Followers</span>
              </div>

              <div className="p-2 text-center">
                <span className="text-lg font-bold block uppercase tracking-wide text-slate-700">
                  {props.following}
                </span>
                <span className="text-sm text-slate-400">Following</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          <h3 className="text-base pb-5 text-slate-700 font-bold leading-normal">
            <Link 
                className=""
                to={`/profile/${props.userId}`}>{props.username}</Link>
          </h3>
          <div className="text-sm mt-0 mb-2 text-slate-400 font-bold uppercase">
            <p>{props.city}</p>
          </div>

          {accessToken && userIdAuth !== props.userId && (
            <button
              onClick={isFollowing ? handleUnfollow : handleFollow}
              className="px-6 py-2 mb-4 w-28 bg-blue-500 text-white text-sm rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              disabled={loading}
            >
              {loading
                ? <CircularProgress size={20} color="inherit" />
                : isFollowing
                ? "Unfollow"
                : "Follow"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthorBlogCard