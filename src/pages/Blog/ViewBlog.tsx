/**
 * react
 */
import { useContext, useEffect, useState } from 'react'

/**
 * redux
 */
import { fecthGetOneBlogPage, resetError } from '../../slices/blogSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { useSelector } from 'react-redux'

/**
 * react router dom
 */
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

/**
 * utils, types and css
 */
import { formatDate } from '../../utils/dateUtils'
import { UserInfoCard } from '../../types/user'
import { BlogPageResponse } from '../../types/blog'
import 'react-quill/dist/quill.snow.css'; 
import 'react-quill/dist/quill.bubble.css'; 

/**
 * icons
 */
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

/**
 * components
 */
import CommentBlog from '../../components/Blog/CommentBlog'
import AuthorBlogCard from '../../components/User/AuthorBlogCard'
import RecommendBlog from '../../components/Blog/RecommendBlog'
import Spinner from '../../components/Spinner/Spinner'
import NavBar from '../../components/NavBar'
import { AppContext } from '../../context/AppContext'
import ModalError from '../../components/Tools/ModalError/ModalError'
import { likeBlog, savedBlog, unlikeBlog, unsavedBlog } from '../../services/blogService'

import { motion } from "framer-motion";


const ViewBlog: React.FC = () => {

    // context when there is an error
    const { showError, handleCloseModal, openErrorModal, errorModalMessage} = useContext(AppContext);

    const userIdAuth = useSelector((state: RootState) => state.auth.userId);
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

    // get id from params to get blog info
    const { id } = useParams<{ id: string }>();

    // redux
    const dispatch = useDispatch<AppDispatch>(); 
    const loading = useSelector((state: RootState) => state.blog.loading);
    const errorBlog = useSelector((state: RootState) => state.blog.errorBlog);
    const errorMessageBlog = useSelector((state: RootState) => state.blog.errorMessage);

    // state
    const [blog, setBlog] = useState<BlogPageResponse>();

    // like
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(0);

    // read
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [savedCount, setSavedCount] = useState<number>(0);

    // convert 
    const userIdNumber = id ? parseInt(id) : NaN;

    // useEffect stection

    // useEffect to get one blog info
    useEffect(() => {
        if (isNaN(userIdNumber)) {
          console.error("The id is not a number");
          return;
        }
    
        const fetchData = async () => {
          try {
            const response = await dispatch(fecthGetOneBlogPage(userIdNumber)).unwrap();
            console.log(response);

            // if (userIdAuth && response.data.usersLiked) {
                if (response.data.usersLiked.includes(userIdAuth ?? 0)) {
                    console.log('is liked');
                    
                  setIsLiked(true);
                } else {
                  setIsLiked(false);
                }

                if(response.data.usersReaded.includes(userIdAuth ?? 0)){
                    console.log('is readed');
                    setIsSaved(true);
                }else{
                    setIsSaved(false);
                }
            //   }
            setLikeCount(response.data.blogEngagement.likesNumber);
            setSavedCount(response.data.blogEngagement.savedNumber);
            console.log(response.data.blogEngagement.likesNumber);
            console.log(response.data.blogEngagement.savedNumber);
            
            
            setBlog(response.data);
          } catch (error) {
            console.error(error);
          } finally {
            // setLoading(false);
          }
        };
    
        fetchData();
      }, [dispatch, userIdNumber]);

    // useEffect to show error when there is an error backend
    useEffect(() => {
        if (errorBlog) {
            showError(errorMessageBlog);
        }
    }, [errorBlog]);

    // reset error state redux
    useEffect(() => {
        if (!openErrorModal) {
            dispatch(resetError());
        }
    }, [openErrorModal, dispatch]);


    const handleLikeToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!userIdAuth) return;
      
        const button = e.target as HTMLButtonElement;
        button.disabled = true;
      
        try {
          if (isLiked) {
            await unlikeBlog(userIdAuth, blog?.blogId ?? 0);
            setLikeCount(likeCount - 1);
          } else {
            await likeBlog(userIdAuth, blog?.blogId ?? 0);
            setLikeCount(likeCount + 1);
          }
          setIsLiked(!isLiked);
          if (blog) {
            setBlog({
              ...blog,
              blogEngagement: {
                ...blog.blogEngagement,
                likesNumber: likeCount,
                commentsNumber: blog?.blogEngagement?.commentsNumber ?? 0, // Default a 0 si es undefined
                savedNumber: blog?.blogEngagement?.savedNumber ?? 0, // Default a 0 si es undefined
                blogId: blog?.blogId ?? 0, // Default a 0 si es undefined
              },
            });
          }
          
          
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
    
        const button = e.target as HTMLButtonElement;
        button.disabled = true;
    
        try {
            if (isSaved) {
                // Desmarcar el blog como leído
                await unsavedBlog(userIdAuth, blog?.blogId ?? 0);
                setSavedCount(savedCount - 1);
            } else {
                // Marcar el blog como leído
                await savedBlog(userIdAuth, blog?.blogId ?? 0);
                setSavedCount(savedCount + 1);
            }
            setIsSaved(!isSaved); // Cambiar el estado de "leído"
    
            // Verificar si blog no es undefined
            if (blog) {
                setBlog({
                    ...blog,
                    blogEngagement: {
                        ...blog.blogEngagement,
                        savedNumber: savedCount, // Actualizar el número de lecturas
                    },
                });
            }
        } catch (error) {
            console.error("Error updating saved status:", error);
        } finally {
            // Volver a habilitar el botón después de un retraso
            setTimeout(() => {
                button.disabled = false;
            }, 3000);
        }
    };
    

    // loading data
    if (loading) return <Spinner />;

  return (
    <>
        <ModalError
            open={openErrorModal}
            message={errorModalMessage} 
            onClose={handleCloseModal}
        />
        <NavBar />
        <div className="flex flex-col justify-between md:flex-row mt-16 max-w-screen-lg px-0 md:px-2 lg:mx-auto gap-4 ">
            
            <div className="flex w-full lg:w-9/12 mx-0 sm:mx-1 ">
                <div className="flex-col hidden sm:block sticky top-12 h-[90%] px-4 py-2">
                    <div className="flex flex-row sm:flex-col">
                        <div className="my-3 text-2xl mx-10 sm:mx-0 flex flex-row sm:flex-col justify-center items-center">
                            <motion.button 
                                className="cursor-pointer" 
                                onClick={handleLikeToggle}
                                disabled={!accessToken}
                                initial={{ scale: 1 }} // Escala inicial
                                animate={{ scale: isLiked ? 1.2 : 1 }} // Aumentar la escala cuando se le da like
                                transition={{ type: "spring", stiffness: 300 }} // Transición suave
                            >
                                {isLiked ? <FavoriteBorderIcon color="error" /> : <FavoriteBorderIcon />}
                            </motion.button>

                            <motion.p 
                                className={`${isLiked ? 'text-red-500' : 'text-black'}`} 
                                initial={{ opacity: 0 }} // Inicializa con opacidad 0
                                animate={{ opacity: 1 }} // Aumenta opacidad al mostrarse
                                transition={{ duration: 0.3 }} // Transición suave
                            >
                                {likeCount}
                            </motion.p>
                        </div>

                        <div className="my-3 text-2xl mx-10 sm:mx-0 flex flex-row sm:flex-col justify-center items-center">
                            <p><ChatBubbleOutlineIcon /></p>
                            <p>{blog?.blogEngagement.commentsNumber ? blog?.blogEngagement.commentsNumber : '0'}</p>
                        </div>
                        <div className="my-3 text-2xl mx-10 sm:mx-0 flex flex-row sm:flex-col justify-center items-center">
                            <motion.button 
                                className="cursor-pointer" 
                                onClick={handleSavedToggle}
                                disabled={!accessToken}
                                initial={{ scale: 1 }} // Escala inicial
                                animate={{ scale: isSaved ? 1.2 : 1 }} // Aumentar la escala cuando se guarda
                                transition={{ type: "spring", stiffness: 300 }} // Transición suave
                            >
                                {isSaved ? <BookmarkBorderIcon color="primary" /> : <BookmarkBorderIcon />}
                            </motion.button>

                            <motion.p 
                                className={`${isSaved ? 'text-blue-500' : 'text-black'}`} 
                                initial={{ opacity: 0 }} // Inicializa con opacidad 0
                                animate={{ opacity: 1 }} // Aumenta opacidad al mostrarse
                                transition={{ duration: 0.3 }} // Transición suave
                            >
                                {savedCount ? savedCount : '0'}
                            </motion.p>
                        </div>


                    </div>
                </div>
                <main className="w-full">

                    <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative" style={{height: '20em'}}>
                        <div className="absolute left-0 bottom-0 w-full h-full z-10"
                            // style={{backgroundImage: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7));'}}
                        >
                        </div>
                        <img 
                            src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" 
                            className="absolute left-0 top-0 w-full h-full z-0 object-cover" 
                        />
                    </div>

                    <div className="px-2 lg:px-0 mt-4 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
                        <div>
                            <div className="flex mt-3">
                                <Link to={`/profile/${blog?.userInfo.userId}`}>
                                    <img 
                                        src="https://randomuser.me/api/portraits/men/97.jpg"
                                        className="h-10 w-10 rounded-full mr-2 object-cover" 
                                    />
                                </Link>
                            <div>
                                <Link to={`/profile/${blog?.userInfo.userId}`} className="font-semibold  text-sm">{blog?.userInfo.username}</Link>
                                <p className="font-semibold text-gray-400 text-xs">Posted on {blog?.createdAt ? formatDate(blog?.createdAt) : 'Date not available'}</p>
                            </div>
                        </div>
                    </div>

                    {blog?.categories.map((category) => (
                        <Link
                            key={category.categroyId}
                            to={`/categoy-by-blog/${category.name}`}
                            className=" text-sm py-1 mx-1 text-black inline-flex items-center justify-center mb-2 rounded"
                            title={category.description} 
                        >
                            <span
                                style={{ color: category.color }} 
                            >
                                #
                            </span>
                            {category.name} 
                        </Link>
                    ))}

                    <h2 className="text-4xl font-semibold text-black leading-tight mb-5">
                        {blog?.title}
                    </h2>

                    <h2 className="text-xl font-semibold text-black leading-tight mb-5">
                        {blog?.description}
                    </h2>

                    {/* principal content blog */}
                    <div
                        className="ql-editor post bg-content p-0"
                        dangerouslySetInnerHTML={{ __html: blog?.content || "Something is wrong"}}
                    />
                    </div>

                    {/* comments section */}
                    {/* <section> */}

                    {/* </section> */}

                    {/* comments and replies */}
                    <div className="flex flex-col mx-auto items-center justify-start my-6 w-full max-w-screen-md ">
                        <h2 className="text-lg mb-5 text-left font-bold text-gray-800">Comments</h2>
                        <CommentBlog 
                            blogId={blog?.blogId || 0}
                        />
                    </div>
        
                </main>
            </div>

            <aside className="w-full md:w-4/12 lg:w-3/12 mb-20">
                <AuthorBlogCard 
                    {...blog?.userInfo as UserInfoCard}
                />
                <RecommendBlog />
                <RecommendBlog />
                <RecommendBlog />
            </aside>

            <div className="fixed z-1 bottom-0 w-full  block sm:hidden bg-white shadow-[0_-10px_15px_rgba(0,0,0,0.1)]">
                <div className='flex justify-center'>
                    <div className="flex flex-row sm:flex-col">
                        <div className="my-3 text-2xl mx-10 sm:mx-0 flex flex-row sm:flex-col justify-center items-center">
                            <motion.button 
                                className="cursor-pointer" 
                                onClick={handleLikeToggle}
                                disabled={!accessToken}
                                initial={{ scale: 1 }} // Escala inicial
                                animate={{ scale: isLiked ? 1.2 : 1 }} // Aumentar la escala cuando se le da like
                                transition={{ type: "spring", stiffness: 300 }} // Transición suave
                            >
                                {isLiked ? <FavoriteBorderIcon color="error" /> : <FavoriteBorderIcon />}
                            </motion.button>

                            <motion.p 
                                className={`${isLiked ? 'text-red-500' : 'text-black'} mt-1`} 
                                initial={{ opacity: 0 }} // Inicializa con opacidad 0
                                animate={{ opacity: 1 }} // Aumenta opacidad al mostrarse
                                transition={{ duration: 0.3 }} // Transición suave
                            >
                                {likeCount}
                            </motion.p>
                        </div>

                        <div className="my-3 text-2xl mx-10 sm:mx-0 flex flex-row sm:flex-col justify-center items-center">
                            <p><ChatBubbleOutlineIcon /></p>
                            <p>{blog?.blogEngagement.commentsNumber ? blog?.blogEngagement.commentsNumber : '0'}</p>
                        </div>
                        <div className="my-3 text-2xl mx-10 sm:mx-0 flex flex-row sm:flex-col justify-center items-center">
                            <motion.button 
                                className="cursor-pointer" 
                                onClick={handleSavedToggle}
                                disabled={!accessToken}
                                initial={{ scale: 1 }} // Escala inicial
                                animate={{ scale: isSaved ? 1.2 : 1 }} // Aumentar la escala cuando se guarda
                                transition={{ type: "spring", stiffness: 300 }} // Transición suave
                            >
                                {isSaved ? <BookmarkBorderIcon color="primary" /> : <BookmarkBorderIcon />}
                            </motion.button>

                            <motion.p 
                                className={`${isSaved ? 'text-blue-500' : 'text-black'} mt-1`} 
                                initial={{ opacity: 0 }} // Inicializa con opacidad 0
                                animate={{ opacity: 1 }} // Aumenta opacidad al mostrarse
                                transition={{ duration: 0.3 }} // Transición suave
                            >
                                {savedCount ? savedCount : '0'}
                            </motion.p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ViewBlog