import React, { useEffect, useState } from 'react'
import { BlogCardI } from '../types/blog'
import { formatDate } from '../../../utils/dateUtils'
import { Link } from 'react-router-dom'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { likeBlog, savedBlog, unlikeBlog, unsavedBlog } from '../services/blogService';

import { motion } from "framer-motion";

const BlogCard: React.FC<BlogCardI>  = (props) => {

    const userIdAuth = useSelector((state: RootState) => state.auth.userId);
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

    // Like
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(props.blogEngagement.likesNumber || 0);

    // Saved
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [savedCount, setSavedCount] = useState<number>(props.blogEngagement.savedNumber || 0);

    useEffect(() => {
        if (userIdAuth) {
            setIsLiked(props.usersLiked.includes(userIdAuth));
            setIsSaved(props.usersReaded.includes(userIdAuth));
        }
    }, [props.usersLiked, props.usersReaded, userIdAuth]);

    const handleLikeToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!userIdAuth) return;
        
        const button = e.currentTarget;
        button.disabled = true;

        try {
            if (isLiked) {
                await unlikeBlog(userIdAuth, props.blogId);
                setLikeCount((prev) => prev - 1);
            } else {
                await likeBlog(userIdAuth, props.blogId);
                setLikeCount((prev) => prev + 1);
            }
            setIsLiked((prev) => !prev);
        } catch (error) {
            console.error("Error updating like:", error);
        } finally {
            setTimeout(() => {
                button.disabled = false;
            }, 3000);
        }
    };

    const handleSavedToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!userIdAuth) return;
        
        const button = e.currentTarget;
        button.disabled = true;

        try {
            if (isSaved) {
                await unsavedBlog(userIdAuth, props.blogId);
                setSavedCount((prev) => prev - 1);
            } else {
                await savedBlog(userIdAuth, props.blogId);
                setSavedCount((prev) => prev + 1);
            }
            setIsSaved((prev) => !prev);
        } catch (error) {
            console.error("Error updating saved status:", error);
        } finally {
            setTimeout(() => {
                button.disabled = false;
            }, 3000);
        }
    };



  return (
    <div className="mx-auto w-full overflow-hidden rounded-lg bg-white shadow mb-7">
            <img
                src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                className="aspect-video w-full h-28 object-cover"
                alt=""
            />
            <div className="p-4">
                <p className="mb-1 text-sm text-primary-500">
                    <Link to={`/profile/${props.userId}`}>{props.username}</Link> • 
                    <time> {props.createdAt ? formatDate(props.createdAt) : 'Date not available'}</time>
                </p>
                <h3 className="text-xl font-medium text-gray-900">
                    <Link to={`/view-blog/${props.blogId}`}>{props.title}</Link>
                </h3>
                <p className="mt-1 text-gray-500">{props.description}</p>
                <div className="mt-4 flex gap-2">
                    {props.categories.map((category, index) => (
                        <Link
                            to={`/categoy-by-blog/${category.name}`}
                            key={index}
                            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold"
                            style={{ backgroundColor: `${category.color}20`, color: category.color }}
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Sección de interacción */}
            <div className="mt-5 flex justify-between mx-5 mb-3">
                <div className="flex items-center">
                    <motion.button 
                        onClick={handleLikeToggle} 
                        className="cursor-pointer" 
                        disabled={!accessToken}  
                        initial={{ scale: 1 }} // Escala inicial
                        animate={{ scale: isLiked ? 1.0 : 1.1 }} // Escala aumentada cuando se da like
                        transition={{ type: "spring", stiffness: 300 }} // Transición con efecto 'spring'
                    >
                        {isLiked ? <FavoriteBorderIcon color="error" fontSize="small"/> : <FavoriteBorderIcon fontSize="small" />}
                    </motion.button>
                    <span className="ml-1 text-sm">{likeCount}</span>

                    <p className="ml-4 ">
                        <ChatBubbleOutlineIcon sx={{ fontSize: 20 }} />
                        <span className="ml-1 text-sm">{props.blogEngagement.commentsNumber || 0}</span>
                    </p>
                </div>

                <div className='flex items-center'>
                    <motion.button 
                        onClick={handleSavedToggle} 
                        className="cursor-pointer" 
                        disabled={!accessToken} 
                        initial={{ scale: 1 }} // Escala inicial
                        animate={{ scale: isSaved ? 1.0 : 1.1 }} // Aumentar la escala cuando se guarda
                        transition={{ type: "spring", stiffness: 300 }} // Transición suave
                    >
                        {isSaved ? <BookmarkBorderOutlinedIcon color="primary" fontSize="small" /> : <BookmarkBorderOutlinedIcon fontSize="small" />}
                    </motion.button>

                    <span className='text-sm'>{savedCount}</span>
                </div>
            </div>
        </div>
  )
}

export default BlogCard