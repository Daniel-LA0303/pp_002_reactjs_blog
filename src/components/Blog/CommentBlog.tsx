import { useSelector } from "react-redux";
import ReplyComment from "./ReplyComment";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { fetchCreateComment, fetchDeleteComment } from "../../slices/commentSlice";
import { useDispatch } from "react-redux";
import { fecthGetCommentsByBlogId } from "../../services/commentService";
import { commentResponseI } from "../../types/comment";
import { formatDateTime } from "../../utils/dateUtils";
import { motion } from "framer-motion";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";


interface CommentBlogProps {
  blogId: number; 
}

const CommentBlog: React.FC<CommentBlogProps> = ({blogId}) => {

  const dispatch = useDispatch<AppDispatch>();
  const userIdAuth = useSelector((state: RootState) => state.auth.userId);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);


  const [newComment, setNewComment] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({});

  const [removingCommentId, setRemovingCommentId] = useState<number | null>(null);


  const [comments, setComments] = useState<commentResponseI[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 5;

  const fetchComments = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await fecthGetCommentsByBlogId(blogId, page, pageSize);
      console.log('Response:', response);
      const { content, last } = response.data;
      setComments((prevComments) => [...prevComments, ...content]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(!last);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (blogId && blogId !== 0) {
      fetchComments();
    }
  }, [blogId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value); 
  };

  const handleSave = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!newComment.trim()) return; 
  
    const newCommentRequest = {
      blogId,
      userId: userIdAuth,
      content: newComment
    };
  
    try {
      const res = await dispatch(fetchCreateComment(newCommentRequest)).unwrap();
  
      if (res) {
        setComments((prevComments) => [{ ...res, isNew: true }, ...prevComments]);
      }
  
    } catch (error: any) {
      console.error('Error al agregar el comentario:', error);
    }
  
    setNewComment(''); 
  };

  const handleDeleteComment = async (commentId: number, userId: number, blogId: number) => {
    console.log('Delete comment:', commentId);
    setRemovingCommentId(commentId);
  
    try {
      await dispatch(fetchDeleteComment({ commentId, userId, blogId })).unwrap();
  
      setComments((prevComments) =>
        prevComments.filter((c) => c.commentId !== commentId)
      );
    } catch (error) {
      console.error('Error deleting comment:', error);
    } finally {
      setRemovingCommentId(null);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, commentId: number) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [commentId]: event.currentTarget, 
    }));
  };

  const handleClose = (commentId: number) => {
    setAnchorEl((prevState: any) => ({
      ...prevState,
      [commentId]: null, 
    }));
  };

  return (
    <div className="flex flex-col w-full">

        {
          accessToken && (
            <div className="flex mx-auto items-center justify-center shadow-lg rounded-md mb-4 w-full ">
              <form 
                onSubmit={handleSave}
                className="w-full max-w-screen-md  bg-white rounded-lg px-4 pt-2"
              >
                  <div className="flex flex-wrap -mx-3 mb-3">
                      {/* <h2 className="px-4 pt-3 pb-4 text-gray-800 text-lg">Top comments <span className='font-bold'>{blog?.blogEngagement.commentsNumber}</span></h2> */}
                      <div className="w-full md:w-full px-3 mb-2 mt-2 flex">
                          <div className="flex flex-shrink-0 self-start cursor-pointer mr-2">
                              <img
                                  src="https://images.unsplash.com/photo-1551122089-4e3e72477432?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cnVieXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                                  alt=""
                                  className="h-8 w-8 object-fill rounded-full"
                              />
                          </div>
                            <input
                                type="text"
                                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" 
                                value={newComment}
                                onChange={handleInputChange}
                                placeholder="Escribe algo..."
                              />
                      </div>
                      <div className="w-full md:w-full flex justify-end items-start px-3">
                          <div className="-mr-1">
                            <button
                              type="submit"
                              disabled={!newComment.trim()}
                              className={`
                                bg-blue-500 text-white font-bold py-2 px-4 rounded
                                ${!newComment.trim()
                                  ? 'opacity-50 cursor-not-allowed' 
                                  : 'hover:bg-blue-700' 
                                }
                              `}
                            >
                              Comment
                            </button>
                          </div>
                      </div>
                  </div>
              </form>
            </div>
          )
        }
        

    <div className="px-4 py-5 shadow-lg rounded-md bg-white ">
      <div className=" flex justify-start ">
        <div className="w-full  ">
    
          {comments.map((comment, index) => (
            <motion.div
              key={comment.commentId} // we use the commentId as the key to not open all the comments when a new comment is added
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: removingCommentId === comment.commentId ? 0 : 1,
                y: removingCommentId === comment.commentId ? -10 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center space-x-2"
              onAnimationComplete={() => {
                // to remove the comment from the UI after the animation
                if (removingCommentId === comment.commentId) {
                  setComments((prevComments) =>
                    prevComments.filter((c) => c.commentId !== comment.commentId)
                  );
                  setRemovingCommentId(null); 
                }
              }}
            >
              <div className="flex flex-shrink-0 self-start cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1551122089-4e3e72477432?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cnVieXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt=""
                  className="h-8 w-8 object-fill rounded-full"
                />
              </div>

              <div className="flex items-center justify-center space-x-2 w-full">
                <div className="w-full">
                  <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2">
                    <div className="flex justify-between">

                      <div>
                        <Link 
                          to={`/profile/${comment.userId}`}
                          className="hover:underline text-lg font-medium">
                          <small>{comment.username}</small>
                        </Link>
                      </div>

                      <div>
                        {
                          accessToken ? (
                            userIdAuth === comment.userId && (
                              <div key={comment.commentId} className="flex">
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ duration: 0.3 }}
                                  className="mx-1"
                                >

                                  <IconButton 
                                    size="small"
                                    color="primary"
                                    onClick={(e) => handleClick(e, comment.commentId)} 
                                  >
                                    <MoreVertIcon fontSize="small" />
                                  </IconButton>
                                  <Menu
                                    anchorEl={anchorEl[comment.commentId] || null} 
                                    open={Boolean(anchorEl[comment.commentId])} 
                                    onClose={() => handleClose(comment.commentId)} 
                                    disableScrollLock
                                  >
                                    <MenuItem onClick={() => handleClose(comment.commentId)}>
                                      <Button variant="text" size="small" startIcon={<EditIcon fontSize="small" />}>
                                        Editar
                                      </Button>
                                    </MenuItem>

                                    <MenuItem onClick={() => handleClose(comment.commentId)}>
                                      <Button
                                        variant="text"
                                        size="small"
                                        startIcon={<DeleteIcon fontSize="small" />}
                                        onClick={() => handleDeleteComment(comment.commentId, userIdAuth, blogId)} 
                                      >
                                        Eliminar
                                      </Button>
                                    </MenuItem>
                                  </Menu>
                                </motion.div>
                              </div>
                            )
                          ) : null
                        }
                      </div>
                    </div>
                    <div className="text-xs w-full">
                      {comment.content}
                    </div>
                  </div>
                  <div className="flex justify-start items-center text-xs w-full">
                    <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                      <a href="#" className="hover:underline">
                        <small>Reply</small>
                      </a>
                      <small className="self-center">.</small>
                      <a href="#" className="hover:underline">
                        <small>{formatDateTime(comment?.updatedAt)}</small>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {hasMore && (
            <button
              onClick={fetchComments}
              disabled={loading}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? "Cargando..." : "Cargar más comentarios"}
            </button>
          )}

            {/* reply */}
          <ReplyComment />

        </div>
      </div>
    </div>
    
    </div>

  );
};

export default CommentBlog;
