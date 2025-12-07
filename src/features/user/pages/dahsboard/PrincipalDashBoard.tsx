import { useEffect, useState } from "react";
import { UserFullEngagementDTO } from "../../types/user";

/**
 * icons
 */
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import NavBar from "../../../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import Spinner from "../../../../components/Spinner/Spinner";
import apiAuthClient from "../../../../services/config-client/apiAuthClient";

const PrincipalDashBoard = () => {

    // redux auth
    const userIdAuth = useSelector((state: RootState) => state.auth.userId);
    const email = useSelector((state: RootState) => state.auth.email);
    const profileImage = useSelector((state: RootState) => state.auth.profileImage);
    const username = useSelector((state: RootState) => state.auth.userName);

    const [userEngagement, setUserEngagement] = useState<UserFullEngagementDTO>({
        blogCount: 0,
        likesCount: 0,
        readBlogsCount: 0,
        commentCount: 0,
        followingUserCount: 0,
        followersUserCount: 0,
        followingCategoryCount: 0,
    });
    const [loadingInfo, setLoadingInfo] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingInfo(true);
                const response = await apiAuthClient(`/user/get-user-engagement/${userIdAuth}`);
                setUserEngagement(response.data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingInfo(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="mx-auto w-full bg-gray-100">
            <NavBar />
            {
                loadingInfo ? <Spinner /> :
                    <div className="flex flex-row md:flex-col justify-center items-center h-[100vh] pt-4 w-full max-w-screen-lg px-2 lg:mx-auto flex-wrap gap-4">

                        <div className="mt-20 md:mt-0 flex flex-col w-full items-center gap-6 p-8 rounded-[10px] border border-gray-200 bg-white shadow-md shadow-[#F3F3F3] text-gray-600 transition-all text-center">
                            <div className="flex flex-col items-center text-center">
                                <Link to={`/profile/${userIdAuth}`}>
                                    <img
                                        alt="User Avatar"
                                        className="mb-4 h-32 w-32 rounded-full object-cover ring-4 ring-white"
                                        src={profileImage ? profileImage : '/avatar.png'}
                                    />
                                </Link>

                                <Link
                                    to={`/profile/${userIdAuth}`}
                                    className="text-2xl font-bold"
                                >
                                    {username}
                                </Link>
                                <p className="my-1">{email}</p>
                            </div>
                        </div>


                        <div className="mt-10 mb-10 md:mt-0 w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                            <Link
                                to={`/blogs-published/${userIdAuth}`}
                                className="relative flex flex-grow !flex-row items-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] text-gray-600 hover:bg-gray-600 hover:text-white transition-all">
                                <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                                    <div className="rounded-full bg-gray-600 p-3 text-gray-100">
                                        <PostAddOutlinedIcon />
                                    </div>
                                </div>
                                <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                                    <p className="font-dm text-sm font-medium ">Blogs Published</p>
                                    <h4 className="text-xl font-bold ">{userEngagement.blogCount}</h4>
                                </div>
                            </Link>

                            <Link
                                to={`/blogs-by-likes/${userIdAuth}`}
                                className="relative flex flex-grow !flex-row items-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] text-gray-600 hover:bg-gray-600 hover:text-white transition-all">
                                <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                                    <div className="rounded-full bg-gray-600 p-3 text-gray-100">
                                        <RecommendOutlinedIcon />
                                    </div>
                                </div>
                                <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                                    <p className="font-dm text-sm font-medium">Likes on Blogs</p>
                                    <h4 className="text-xl font-bold ">{userEngagement.likesCount}</h4>
                                </div>
                            </Link>

                            <Link
                                to={`/blogs-by-save/${userIdAuth}`}
                                className="relative flex flex-grow !flex-row items-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] text-gray-600 hover:bg-gray-600 hover:text-white transition-all">
                                <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                                    <div className="rounded-full bg-gray-600 p-3 text-gray-100">
                                        <BookmarkBorderOutlinedIcon />
                                    </div>
                                </div>
                                <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                                    <p className="font-dm text-sm font-medium">Blogs Saved</p>
                                    <h4 className="text-xl font-bold">{userEngagement.readBlogsCount}</h4>
                                </div>
                            </Link>

                            <Link
                                to={`/users-followers/${userIdAuth}`}
                                className="relative flex flex-grow !flex-row items-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] text-gray-600 hover:bg-gray-600 hover:text-white transition-all">
                                <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                                    <div className="rounded-full bg-gray-600 p-3 text-gray-100">
                                        <PersonAddAlt1OutlinedIcon />
                                    </div>
                                </div>
                                <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                                    <p className="font-dm text-sm font-medium">Followers</p>
                                    <h4 className="text-xl font-bold">{userEngagement.followersUserCount}</h4>
                                </div>
                            </Link>

                            <Link
                                to={`/users-following/${userIdAuth}`}
                                className="relative flex flex-grow !flex-row items-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] text-gray-600 hover:bg-gray-600 hover:text-white transition-all">
                                <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                                    <div className="rounded-full bg-gray-600 p-3 text-gray-100">
                                        <HowToRegOutlinedIcon />
                                    </div>
                                </div>
                                <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                                    <p className="font-dm text-sm font-medium">Following</p>
                                    <h4 className="text-xl font-bold">{userEngagement.followingUserCount}</h4>
                                </div>
                            </Link>

                            <Link
                                to={`/users-following/${userIdAuth}`}
                                className="relative flex flex-grow !flex-row items-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] text-gray-600 hover:bg-gray-600 hover:text-white transition-all">
                                <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                                    <div className="rounded-full bg-gray-600 p-3 text-gray-100">
                                        <HowToRegOutlinedIcon />
                                    </div>
                                </div>
                                <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                                    <p className="font-dm text-sm font-medium">Categories Followed</p>
                                    <h4 className="text-xl font-bold text-navy-700 ">{userEngagement.followingCategoryCount}</h4>
                                </div>
                            </Link>

                            <div
                                className="relative mb-10 flex flex-grow !flex-row items-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] text-gray-600 transition-all select-none"
                            >
                                <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-semibold text-black px-2 py-1 rounded-full shadow">
                                    SOON
                                </span>

                                <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                                    <div className="rounded-full bg-gray-600 p-3 text-gray-100">
                                        <ChatBubbleOutlineOutlinedIcon />
                                    </div>
                                </div>

                                <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                                    <p className="font-dm text-sm font-medium">Comments on Blogs</p>
                                    <h4 className="text-xl font-bold">{userEngagement.commentCount}</h4>
                                </div>
                            </div>

                        </div>
                    </div>
            }
        </div>
    )
}

export default PrincipalDashBoard