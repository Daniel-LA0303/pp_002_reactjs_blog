import React from "react";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

interface ActionsBlogProps{
  likesNumber: number | undefined;
  commentsNumber: number | undefined;
  savedNumber: number | undefined;
}

const ActionsBlog: React.FC<ActionsBlogProps> = ({likesNumber, commentsNumber, savedNumber}) => {
  return (
    <>
        <div className="my-3 text-2xl mx-10 sm:mx-0 flex flex-row sm:flex-col justify-center items-center">
            <button className="cursor-pointer">
              <FavoriteBorderIcon />
            </button>
            <p>{likesNumber ? likesNumber : '0'}</p>
        </div>
        <div className="my-3 text-2xl mx-10 sm:mx-0 flex flex-row sm:flex-col justify-center items-center">
            <p><ChatBubbleOutlineIcon /></p>
            <p>{commentsNumber ? commentsNumber : '0'}</p>
        </div>
        <div className="my-3 text-2xl mx-10 sm:mx-0 flex flex-row sm:flex-col justify-center items-center">
            <button className='cursor-pointer'>
              <BookmarkBorderIcon />
            </button>
            <p>{savedNumber ? savedNumber : '0'}</p>
        </div>
    </>
  )
}

export default ActionsBlog