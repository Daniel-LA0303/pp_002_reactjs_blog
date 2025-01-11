import React from 'react'
import { BlogCardI } from '../types/blog'
import { formatDate } from '../utils/dateUtils'
import { Link } from 'react-router-dom'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

const BlogCard: React.FC<BlogCardI>  = (props) => {
  return (
    <div>
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
                    {props.categories.map((category: { name: string; color: string }, index: number) => (
                        <span
                            key={index}
                            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold"
                            style={{ backgroundColor: `${category.color}20`, color: category.color }}
                        >
                            {category.name}
                        </span>
                    ))}
                </div>
            </div>
            <div className='mt-5 flex justify-between mx-5 mb-3'>
                <div className='flex items-center'>
                    <p className='mr-4'>
                        <FavoriteBorderIcon fontSize='small'/>
                        <span>{props.blogEngagement.likesNumber}</span>
                    </p>
                    <p>
                        <ChatBubbleOutlineOutlinedIcon fontSize='small'/>
                        <span>{props.blogEngagement.commentsNumber}</span>
                    </p>
                </div>
                <p className='flex items-center'>
                    <BookmarkBorderOutlinedIcon fontSize='small'/>
                    <span>{props.blogEngagement.savedNumber}</span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default BlogCard