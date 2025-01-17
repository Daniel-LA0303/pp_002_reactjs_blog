import axios from "axios";
import { useEffect, useState } from "react";
import { UserFullEngagementDTO } from "../../../types/user";

/**
 * icons
 */
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NavBar from "../../../components/NavBar";



const PrincipalDashBoard = () => {

    const [userEngagement, setUserEngagement] = useState<UserFullEngagementDTO>({
        blogCount: 0,
        likesCount: 0,
        readBlogsCount: 0,
        commentCount: 0,
        followingUserCount: 0,
        followersUserCount: 0,
        followingCategoryCount: 0,
    });
    
  useEffect(() => {
    // if (isNaN(userIdNumber)) {
    //   console.error("El ID de usuario no es válido");
    //   return;
    // }

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8080/api/user/get-user-engagement/1`);
        setUserEngagement(response.data.data);
        console.log(response);
        
      } catch (error) {
        console.log(error);
        
      }
    }

    fetchData();

  }, []);

  return (
        <div className="mx-auto w-full bg-gray-100">
            <NavBar />
            <div className="flex flex-col justify-center items-center h-[100vh] pt-4">
                <div className="mt-20 mb-10 md:mt-0 w-full md:w-8/12 xl:w-10/12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">

                    <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] ">
                        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                            <div className="rounded-full bg-gray-600 p-3 text-gray-100">
                                <PostAddOutlinedIcon />
                            </div>
                        </div>
                        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                            <p className="font-dm text-sm font-medium text-gray-600">Blogs Published</p>
                            <h4 className="text-xl font-bold text-navy-700 ">{userEngagement.blogCount}</h4>
                        </div>
                    </div>

                    <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] ">
                        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                            <div className="rounded-full bg-gray-600 p-3 text-gray-100">
                                <RecommendOutlinedIcon />
                            </div>
                        </div>
                        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                            <p className="font-dm text-sm font-medium text-gray-600">Likes on Blogs</p>
                            <h4 className="text-xl font-bold text-navy-700 ">{userEngagement.likesCount}</h4>
                        </div>
                    </div>

                    <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] ">
                        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                            <div className="rounded-full bg-gray-600 p-3 text-gray-100">
                                <ChatBubbleOutlineOutlinedIcon /> 
                            </div>
                        </div>
                        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                            <p className="font-dm text-sm font-medium text-gray-600">Comments on Blogs</p>
                            <h4 className="text-xl font-bold text-navy-700 ">{userEngagement.commentCount}</h4>
                        </div>
                    </div>

                    <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] ">
                        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                            <div className="rounded-full bg-gray-600 p-3 text-gray-100">
                                <BookmarkBorderOutlinedIcon />
                            </div>
                        </div>
                        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                            <p className="font-dm text-sm font-medium text-gray-600">Blogs Saved</p>
                            <h4 className="text-xl font-bold text-navy-700 ">{userEngagement.readBlogsCount}</h4>
                        </div>
                    </div>

                    <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] ">
                        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                            <div className="rounded-full bg-gray-600 p-3 text-gray-100">
                                <PersonAddAlt1OutlinedIcon />
                            </div>
                        </div>
                        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                            <p className="font-dm text-sm font-medium text-gray-600">Followers</p>
                            <h4 className="text-xl font-bold text-navy-700 ">{userEngagement.followersUserCount}</h4>
                        </div>
                    </div>

                    <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] ">
                        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                            <div className="rounded-full bg-gray-600 p-3 text-gray-100">
                                <HowToRegOutlinedIcon />
                            </div>
                        </div>
                        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                            <p className="font-dm text-sm font-medium text-gray-600">Following</p>
                            <h4 className="text-xl font-bold text-navy-700 ">{userEngagement.followingUserCount}</h4>
                        </div>
                    </div>

                    <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] ">
                        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                            <div className="rounded-full bg-gray-600 p-3 text-gray-100">
                                <LocalOfferOutlinedIcon />
                            </div>
                        </div>
                        <div className="h-50 ml-4 flex w-auto flex-col justify-center mb-10">
                            <p className="font-dm text-sm font-medium text-gray-600">Categories Followed</p>
                            <h4 className="text-xl font-bold text-navy-700 ">{userEngagement.followingCategoryCount}</h4>
                        </div>
                    </div>

                    {/* <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] mb-10">
                        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                            <div className="rounded-full bg-gray-600 p-3 text-gray-100">
                                <SettingsOutlinedIcon />
                            </div>
                        </div>
                        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                            <p className="font-dm text-sm font-medium text-gray-600">Settings</p>
                            <h4 className="text-xl font-bold text-navy-700 "></h4>
                        </div>
                    </div> */}

                </div>            
            </div>
        </div>
  )
}

export default PrincipalDashBoard