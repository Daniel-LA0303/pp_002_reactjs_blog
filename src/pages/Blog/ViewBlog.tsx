
import CommentBlog from '../../components/Blog/CommentBlog'
import ActionsBlog from '../../components/Blog/ActionsBlog'
import AuthorBlogCard from '../../components/User/AuthorBlogCard'
import RecommendBlog from '../../components/Blog/RecommendBlog'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { BlogPageResponse } from '../../types/blog'
import { fecthGetOneBlogPage } from '../../slices/blogSlice'
import { formatDate } from '../../utils/dateUtils'
import { UserInfoCard } from '../../types/user'
import 'react-quill/dist/quill.snow.css'; 
import 'react-quill/dist/quill.bubble.css'; 
import Spinner from '../../components/Spinner/Spinner'
import Error from '../../components/Error/Error'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import NavBar from '../../components/NavBar'


const ViewBlog = () => {

    const { id } = useParams<{ id: string }>();

    const dispatch = useDispatch<AppDispatch>(); 
    const loading = useSelector((state: RootState) => state.blog.loading);
    const error = useSelector((state: RootState) => state.blog.error);

    const [blog, setBlog] = useState<BlogPageResponse>();

    const userIdNumber = id ? parseInt(id) : NaN;

    useEffect(() => {

        if (isNaN(userIdNumber)) {
            console.error("El ID de usuario no es válido");
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

    if (loading) return <Spinner />;
    if (error) return <Error />;

  return (
    <>
    <NavBar />
    <div className="max-w-screen-xl mx-auto flex flex-col justify-center sm:flex-row mt-16">
        <div className="flex-col hidden sm:block sticky top-0 h-[90%] px-4 py-2">
 
            <ActionsBlog
                blogId={blog?.blogEngagement.blogId ?? 0}      
                likesNumber={blog?.blogEngagement.likesNumber ?? 0}
                commentsNumber={blog?.blogEngagement.commentsNumber ?? 0}
                savedNumber={blog?.blogEngagement.savedNumber ?? 0}
            />

        </div>
        <main className="w-full md:w-4/6 lg:w-7/12">
            <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative" style={{height: '20em'}}>
                <div className="absolute left-0 bottom-0 w-full h-full z-10"
                style={{backgroundImage: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7));'}}></div>
                <img src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" className="absolute left-0 top-0 w-full h-full z-0 object-cover" />

            </div>

            <div className="px-4 lg:px-0 mt-4 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
                <div 
                    // className="p-4 absolute bottom-0 left-0 z-20"
                >
                    
                    <div className="flex mt-3">
                        <Link to={`/profile/${blog?.userInfo.userId}`}>
                            <img src="https://randomuser.me/api/portraits/men/97.jpg"
                            className="h-10 w-10 rounded-full mr-2 object-cover" />
                        </Link>
                        <div>
                            <Link to={`/profile/${blog?.userInfo.userId}`} className="font-semibold  text-sm">{blog?.userInfo.username}</Link>
                            <p className="font-semibold text-gray-400 text-xs">Posted on {blog?.createdAt ? formatDate(blog?.createdAt) : 'Date not available'}</p>
                        </div>
                    </div>
                </div>
                {blog?.categories.map((category) => (
                    <a
                        key={category.categroyId}
                        href="#"
                        className=" text-sm py-1 mx-1 text-black inline-flex items-center justify-center mb-2 rounded"
                        title={category.description} 
                        >
                        <span
                            style={{ color: category.color }} 
                        >
                            #
                        </span>
                        {category.name} 
                    </a>
                    ))}
                <h2 className="text-4xl font-semibold text-black leading-tight mb-5">
                    {blog?.title}
                </h2>
                <h2 className="text-xl font-semibold text-black leading-tight mb-5">
                    {blog?.description}
                </h2>
                <div
                    className="ql-editor post bg-content p-0"
                    dangerouslySetInnerHTML={{ __html: blog?.content || "Something is wrong"}}
                />
                

            </div>

            {/* comments section */}
            {/* <section> */}
                <div className="flex mx-auto items-center justify-center shadow-lg   mb-4 w-full max-w-screen-md ">
                    <form className="w-full max-w-screen-md  bg-white rounded-lg px-4 pt-2">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
                            <div className="w-full md:w-full px-3 mb-2 mt-2">
                                <textarea className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Type Your Comment' required></textarea>
                            </div>
                            <div className="w-full md:w-full flex items-start px-3">
                                <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                                    <svg fill="none" className="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <p className="text-xs md:text-sm pt-px">Some HTML is okay.</p>
                                </div>
                                <div className="-mr-1">
                                    <input type='submit' className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Post Comment'/> 
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            {/* </section> */}

            {/* comments and replies */}
            <h1>Comments</h1>
            <div className="flex mx-auto items-center justify-start shadow-lg my-6 w-full max-w-screen-md ">
                <CommentBlog />
            </div>
      
        </main>

        <aside className="w-full md:w-2/6 lg:w-3/12 mx-1 my-2">
            <AuthorBlogCard 
                {...blog?.userInfo as UserInfoCard}
            />
            <RecommendBlog />
            <RecommendBlog />
            <RecommendBlog />
        </aside>

        <div className="fixed z-1 bottom-0 w-full p-1 block sm:hidden bg-slate-500">
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