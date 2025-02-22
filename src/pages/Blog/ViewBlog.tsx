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
 * components
 */
import CommentBlog from '../../components/Blog/CommentBlog'
import ActionsBlog from '../../components/Blog/ActionsBlog'
import AuthorBlogCard from '../../components/User/AuthorBlogCard'
import RecommendBlog from '../../components/Blog/RecommendBlog'
import Spinner from '../../components/Spinner/Spinner'
import NavBar from '../../components/NavBar'
import { AppContext } from '../../context/AppContext'
import ModalError from '../../components/Tools/ModalError/ModalError'


const ViewBlog: React.FC = () => {

    // context when there is an error
    const { showError, handleCloseModal, openErrorModal, errorModalMessage} = useContext(AppContext);

    // get id from params to get blog info
    const { id } = useParams<{ id: string }>();

    // redux
    const dispatch = useDispatch<AppDispatch>(); 
    const loading = useSelector((state: RootState) => state.blog.loading);
    const errorBlog = useSelector((state: RootState) => state.blog.errorBlog);
    const errorMessageBlog = useSelector((state: RootState) => state.blog.errorMessage);

    // state
    const [blog, setBlog] = useState<BlogPageResponse>();

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
                
                setBlog(response.data);
            } catch (error) {
                console.log(error);
            }
        } 
        fetchData();
    }, [dispatch]);

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
        <div className="flex flex-col justify-between md:flex-row mt-16 max-w-screen-lg px-0 md:px-2 lg:mx-auto gap-4">
            
            <div className="flex w-full lg:w-9/12 mx-0 sm:mx-1 ">
                <div className="flex-col hidden sm:block sticky top-12 h-[90%] px-4 py-2">
                    <ActionsBlog
                        blogId={blog?.blogEngagement.blogId ?? 0}      
                        likesNumber={blog?.blogEngagement.likesNumber ?? 0}
                        commentsNumber={blog?.blogEngagement.commentsNumber ?? 0}
                        savedNumber={blog?.blogEngagement.savedNumber ?? 0}
                    />
                    
                </div>
                <main className="w-full">

                    <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative" style={{height: '20em'}}>
                        <div className="absolute left-0 bottom-0 w-full h-full z-10"
                            style={{backgroundImage: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7));'}}>
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
                    <div className="flex mx-auto items-center justify-start my-6 w-full max-w-screen-md ">
                        <CommentBlog />
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

            <div className="fixed z-1 bottom-0 w-full  block sm:hidden bg-slate-500">
                <div className='flex justify-center'>
                    <ActionsBlog
                        blogId={blog?.blogEngagement.blogId ?? 0}      
                        likesNumber={blog?.blogEngagement.likesNumber ?? 0}
                        commentsNumber={blog?.blogEngagement.commentsNumber ?? 0}
                        savedNumber={blog?.blogEngagement.savedNumber ?? 0}
                    />
                </div>
            </div>
        </div>
    </>
  )
}

export default ViewBlog