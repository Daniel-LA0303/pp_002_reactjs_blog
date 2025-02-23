import React, { useEffect, useState } from "react";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { BlogEngagement } from "../../types/blog";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { likeBlog, unlikeBlog } from "../../services/blogService";

const ActionsBlog: React.FC<BlogEngagement> = ({
  likesNumber, 
  commentsNumber,
  savedNumber, 
  blogId,
  // usersLiked
  }) => {

  const userIdAuth = useSelector((state: RootState) => state.auth.userId);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(likesNumber);

  // useEffect(() => {
  //   if (userIdAuth && usersLiked) {
  //     if (usersLiked.includes(userIdAuth)) {
  //       setIsLiked(true);
  //     } else {
  //       setIsLiked(false);
  //     }
  //   }
  // }, [userIdAuth, usersLiked]);  // Dependencias de `userIdAuth` y `usersLiked`

  // Función para alternar like/unlike
  const handleLikeToggle = async () => {
    if (!userIdAuth) return;

    try {
      if (isLiked) {
        await unlikeBlog(userIdAuth, blogId);
        setLikeCount(likeCount - 1);
      } else {
        await likeBlog(userIdAuth, blogId);
        setLikeCount(likeCount + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  return (
    <div className="flex flex-row sm:flex-col">
      <div className="my-3 text-2xl mx-10 sm:mx-0 flex flex-row sm:flex-col justify-center items-center">
        <button className="cursor-pointer" onClick={handleLikeToggle}>
          {isLiked ? <FavoriteBorderIcon color="error" /> : <FavoriteBorderIcon />}
        </button>
        <p>{likeCount ? likeCount : '0'}</p>
      </div>
      <div className="my-3 text-2xl mx-10 sm:mx-0 flex flex-row sm:flex-col justify-center items-center">
        <p><ChatBubbleOutlineIcon /></p>
        <p>{commentsNumber ? commentsNumber : '0'}</p>
      </div>
      <div className="my-3 text-2xl mx-10 sm:mx-0 flex flex-row sm:flex-col justify-center items-center">
        <button className="cursor-pointer">
          <BookmarkBorderIcon />
        </button>
        <p>{savedNumber ? savedNumber : '0'}</p>
      </div>
    </div>
  )
}

export default ActionsBlog