import { UserCardI } from "../types/user"

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material"; // Ajusta la importación según tu proyecto
import { fetchDeleteUnfollowUser, fetchPostFollowUser } from "../services/userService";
import { RootState } from "../../../redux/store";
import LocationOnIcon from '@mui/icons-material/LocationOn';


const UserCard: React.FC<UserCardI> = (props) => {

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
        <div className="mx-auto w-full overflow-hidden rounded-lg mb-5">
            <div className="w-full rounded-xl bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                <div className="flex items-center gap-4">
                    <Link to={`/profile/${props.userId}`}>
                        <img
                            className="rounded-full object-cover shadow
                                w-12 h-12        
                                sm:w-14 sm:h-14  
                                md:w-16 md:h-16  
                                lg:w-20 lg:h-20"
                            src={props?.profilePicture ? props.profilePicture : '/avatar.png'}
                            alt="avatar"
                        />
                    </Link>

                    <div className="flex-grow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-base lg:text-lg font-bold leading-tight">{props.username}</p>
                                {
                                    props?.city && (
                                        <p className='font-semibold flex items-center text-xs'>
                                            <LocationOnIcon fontSize='small' /> {props.city}
                                        </p>
                                    )
                                }
                            </div>
                        </div>
                        <div className="mt-2 flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex items-center text-xs md:text-base gap-1">
                                <span className="font-semibold text-slate-700">{props.followers}</span>
                                <span>Followers</span>
                            </div>
                            <div className="flex items-center text-xs md:text-base gap-1">
                                <span className="font-semibold text-slate-700">{props.following}</span>
                                <span>Following</span>
                            </div>
                        </div>
                    </div>
                    {/* follow or unfollowe */}
                    {accessToken && userIdAuth !== props.userId && (
                        <button
                            onClick={isFollowing ? handleUnfollow : handleFollow}
                            className="px-4 py-2 text-xs md:text-sm bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
        </div>

    )
}

export default UserCard
