/**
 * react
 */
import React, { useContext, useEffect, useRef, useState } from 'react';

/**
 * utils and types
 */
import { UserProfile } from '../types/user';
import { formatDate } from '../../../utils/dateUtils';

/**
 * react route domm
 */
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

/**
 * redux
 */
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { fetchGetProfileBackToolkit, resetUserError } from '../store/userSlice';

/**
 * components
 */
import NavBar from '../../../components/NavBar/NavBar';
import BlogCard from '../../blog/components/BlogCard';
import Spinner from '../../../components/Spinner/Spinner';

/**
 * icons
 */
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined';
import TagIcon from '@mui/icons-material/Tag';
import { BlogCardI } from '../../blog/types/blog';
import { AppContext } from '../../../context/AppContext';
import ModalError from '../../../components/Modals/ModalError';
import { fetchBlogsByUser } from '../../blog/services/blogService';
import CardBlogSkeleton from '../../../components/Skeletons/Blog/CardBlogSkeleton';
import { fetchDeleteUnfollowUser, fetchPostFollowUser } from '../services/userService';
import { CircularProgress } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

const Profile: React.FC = () => {

  // context when there is an error
  const { showError, handleCloseModal, openErrorModal, errorModalMessage } = useContext(AppContext);

  // get id from params to get a user info
  const { id } = useParams<{ id: string }>();

  // redux
  const dispatch = useDispatch<AppDispatch>();

  const userId = useSelector((state: RootState) => state.auth.userId);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const loadingUser = useSelector((state: RootState) => state.user.loading);
  const errorUser = useSelector((state: RootState) => state.user.errorUser);
  const errorUserMessage = useSelector((state: RootState) => state.user.errorMessage);


  // page state
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [blogs, setBlogs] = useState<BlogCardI[]>([]);
  const [page, setPage] = useState(0);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [count, setCount] = useState(0);

  const [isFollowing, setIsFollowing] = useState(
    userId !== null && user?.usersFollowers.includes(userId)
  );
  const [loadingFollow, setLoadingFollow] = useState(false);

  const scrollTimeout = useRef<number | null>(null);

  // verify id from params
  const userIdNumber = id ? parseInt(id) : NaN;

  // functions section

  const handleFollow = async () => {
    if (!accessToken || userId === userIdNumber || userId === null) return;

    try {
      setLoadingFollow(true);
      await fetchPostFollowUser(userId, userIdNumber);
      setIsFollowing(true);
    } catch (error) {
      console.error("Error al seguir al usuario:", error);
    } finally {
      setLoadingFollow(false);
    }
  };

  const handleUnfollow = async () => {
    if (!accessToken || userId === userIdNumber || userId === null) return;

    try {
      setLoadingFollow(true);
      await fetchDeleteUnfollowUser(userId, userIdNumber);
      setIsFollowing(false);
    } catch (error) {
      console.error("Error al dejar de seguir al usuario:", error);
    } finally {
      setLoadingFollow(false);
    }
  };

  // function to get more blogs with infinite scroll
  const fetchBlogs = async () => {
    if (loadingBlogs || !hasMore) return;
    setLoadingBlogs(true);

    try {

      const response = await fetchBlogsByUser(userIdNumber, page, 5);
      const { content, last } = response.data;

      console.log("content", content);

      setCount(count + 1);
      console.log("count", count);

      setBlogs((prevBlogs) => [...prevBlogs, ...content]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(!last);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoadingBlogs(false);
    }
  };

  // function activate scroll
  const handleScroll = () => {
    if (
      !loadingBlogs &&
      hasMore &&
      window.innerHeight + document.documentElement.scrollTop + 50 >=
      document.documentElement.scrollHeight
    ) {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);  // Limpia cualquier timeout anterior
      }

      scrollTimeout.current = setTimeout(() => {
        fetchBlogs();
      }, 100);
    }
  };

  // useEffect section

  useEffect(() => {
    if (userId && user?.usersFollowers.includes(userId)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [userId, user?.usersFollowers]);

  // to get user info
  useEffect(() => {
    if (isNaN(userIdNumber)) {
      console.error("El ID de usuario no es válido");
      return;
    }

    const fetchData = async () => {
      try {

        const response = await dispatch(fetchGetProfileBackToolkit(userIdNumber)).unwrap();
        setUser(response);
        console.log("response", response);
      } catch (err) {
        console.error("Error al obtener el perfil", err);
      }
    };

    fetchData();
  }, [userIdNumber, dispatch]);


  // fecth get blogs
  useEffect(() => {
    let isMounted = true; // Para evitar actualizaciones si el componente se desmonta
    setLoadingBlogs(true);

    const delayFetchBlogs = setTimeout(async () => {
      try {
        const response = await fetchBlogsByUser(userIdNumber, 0, 5);
        if (isMounted) {
          setBlogs(response.data.content);
          setPage(1);
          setHasMore(!response.data.last);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        if (isMounted) {
          setLoadingBlogs(false);
        }
      }
    }, 10); // Reducimos el tiempo del timeout sin eliminarlo

    return () => {
      isMounted = false;
      clearTimeout(delayFetchBlogs);
    };
  }, [id]);

  // activate scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingBlogs, hasMore]);

  useEffect(() => {
    if (errorUser) {
      showError(errorUserMessage);
    }
  }, [errorUser]);

  // reset error state redux
  useEffect(() => {
    if (!openErrorModal) {
      dispatch(resetUserError());
    }
  }, [openErrorModal, dispatch]);


  // prevent errors
  if (loadingUser) return <Spinner />;


  return (
    <div className=''>
      <ModalError
        open={openErrorModal}
        message={errorModalMessage}
        onClose={handleCloseModal}
      />

      {/* navbar */}
      <NavBar />
      <section className="pt-8 sm:pt-8 mt-0">
        <div className="w-full max-w-screen-lg px-2 lg:mx-auto flex flex-wrap gap-4">
          <div className="flex flex-col w-full mb-6 shadow-lg rounded-lg mt-16 bg-white">
            <div className="flex flex-col gap-6 p-6 bg-white dark:bg-background-dark/50 rounded-xl shadow-sm  border-gray-200 dark:border-gray-800">

              <div className="flex flex-col">
                <div className="flex gap-6 flex-col sm:flex-row">

                  <div
                    className="bg-center bg-no-repeat bg-cover rounded-full w-32 h-32 shadow-md shrink-0"
                    style={{
                      backgroundImage: `url("${user?.profilePicture ? user.profilePicture : '/avatar.png'}")`
                    }}
                  />

                  <div className="flex flex-col justify-center w-full">

                    <div className='flex items-start sm:items-center justify-between w-full flex-col sm:flex-row gap-2'>

                      <p className="text-3xl font-semibold">
                        {user?.username}
                      </p>

                      {accessToken && userId !== userIdNumber && (
                        <div className="flex justify-end">
                          <button
                            className="px-6 py-2 w-28 bg-blue-500 text-white text-sm rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300"
                            onClick={isFollowing ? handleUnfollow : handleFollow}
                            disabled={loadingFollow}
                          >
                            {loadingFollow ? <CircularProgress size={20} color="inherit" /> : (isFollowing ? "Unfollow" : "Follow")}
                          </button>
                        </div>
                      )}

                      {accessToken && userId === userIdNumber && (
                        <div className="flex justify-end">
                          <Link
                            to={`/user-settings/${userIdNumber}`}
                            className="text-center py-2 w-32 bg-blue-500 text-white text-sm rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300"
                          >
                            Edit Profile
                          </Link>
                        </div>
                      )}

                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      {user?.city && (
                        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                          <h2 className='text-sm font-bold flex items-center'>
                            <LocationOnIcon fontSize='small' /> City
                          </h2>
                          <p className="text-sm">{user.city}</p>
                        </div>
                      )}

                      {user?.webSite && (
                        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                          <h2 className='text-sm font-bold flex items-center'>
                            <LanguageIcon fontSize='small' /> WebSite
                          </h2>
                          <p className="text-sm">{user.webSite}</p>
                        </div>
                      )}
                    </div>

                    {user?.bio && (
                      <p className="text-gray-600 dark:text-gray-400 text-base mt-3 break-words">
                        {user.bio}
                      </p>
                    )}

                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-start sm:items-center border-t border-gray-200 dark:border-gray-800 pt-5">
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <CakeIcon fontSize="small" />
                  <p className="text-sm">Joined in {user?.createdAt ? formatDate(user.createdAt) : 'Date not available'}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Content here */}
        <div className='block sm:flex w-full max-w-screen-lg px-2 lg:mx-auto '>
          <div className='w-full sm:w-3/12 mr-0 sm:mr-2'>

            {
              user?.skills &&
              <div className="flex flex-col min-w-0 break-word w-full mb-1 shadow-lg  rounded-lg  bg-white">
                <div className=" px-2 mb-2 mt-4 text-left block sm:text-center  sm:justify-center">
                  <h2 className=' text-sm sm:text-xs font-bold flex justify-center items-center'>
                    <TerminalOutlinedIcon fontSize='small' />
                    <span className='ml-1'>Skills</span>
                  </h2>
                  <div className=" my-2 border-t border-0.5 text-center"></div>
                  <p>{user?.skills ? user?.skills : 'No data'}</p>
                </div>
              </div>

            }

            {
              user?.work &&
              <div className="flex flex-col min-w-0 break-word w-full my-1 shadow-lg  rounded-lg mt-4 bg-white">
                <div className=" px-2 mb-2 mt-4 text-left block sm:text-center  sm:justify-center">
                  <h2 className=' text-sm sm:text-xs font-bold flex justify-center items-center'>
                    <WorkOutlineRoundedIcon fontSize='small' />
                    <span className='ml-1'>Work</span>
                  </h2>
                  <div className="my-2 border-t border-0.5 text-center"></div>
                  <p>{user?.work ? user?.work : 'No data'}</p>
                </div>
              </div>
            }

            {
              user?.education &&
              <div className="flex flex-col min-w-0 break-word w-full my-1 shadow-lg  rounded-lg mt-4 bg-white">
                <div className=" px-2 mb-2 mt-4 text-left block sm:text-center  sm:justify-center">
                  <h2 className='text-sm sm:text-xs font-bold flex justify-center items-center'>
                    <SchoolOutlinedIcon fontSize='small' />
                    <span className='ml-1'>Education</span>
                  </h2>
                  <div className=" my-2 border-t border-0.5 text-center"></div>
                  <p className=' text-sm'>{user?.education ? user?.education : 'No data'}</p>
                </div>
              </div>
            }

            {/* user engagement */}
            <div>
              <div className=" flex flex-col min-w-0 break-word w-full my-4 shadow-lg  rounded-lg text-center bg-white">
                <div className=" py-4 lg:pt-4 px-2">

                  <div className="flex items-center  text-center">
                    <ArticleOutlinedIcon fontSize='small' />
                    <span className="text-sm font-bold block uppercase tracking-wide text-blueGray-600 mx-1">
                      {user?.blogsNumber}
                    </span>
                    <span className="text-sm text-blueGray-400">
                      Posts published
                    </span>
                  </div>

                  <div className="flex items-center pt-2 text-center">
                    <FavoriteBorderIcon fontSize='small' />
                    <span className="text-sm font-bold block uppercase tracking-wide text-blueGray-600 mx-1">
                      {user?.likesNumber}
                    </span>
                    <span className="text-sm text-blueGray-400">
                      Likes on posts
                    </span>
                  </div>

                  <div className="flex items-center pt-2 text-center">
                    <PersonAddAltIcon fontSize='small' />
                    <span className="text-sm font-bold block uppercase tracking-wide text-blueGray-600 mx-1">
                      {user?.followers}
                    </span>
                    <span className="text-sm text-blueGray-400">
                      Followers
                    </span>
                  </div>

                  <div className="flex items-center pt-2 text-center">
                    <TagIcon fontSize='small' />
                    <span className="text-sm font-bold block uppercase tracking-wide text-blueGray-600 mx-1">
                      {user?.categoryFollows}
                    </span>
                    <span className="text-sm text-blueGray-400">
                      Tags followed
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* blogs by user */}
          <div className="w-full sm:w-9/12">
            <div className="w-full items-center">
              {loadingBlogs && blogs.length === 0 ? (
                <CardBlogSkeleton />
              ) : blogs.length > 0 ? (
                blogs.map((b, index) => (
                  <BlogCard key={index} {...b} />
                ))
              ) : (
                userId === userIdNumber ? (
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-center text-2xl mt-10">You do not have blogs yet</p>
                    <p className="text-lg mt-5 mb-3">You can create a blog here</p>
                    <Link
                      to={`/create-blog`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Create Blog
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-center text-2xl mt-10">This user does not have blogs yet</p>
                  </div>
                )
              )}
            </div>
          </div>


        </div>

      </section>
    </div>
  )
}

export default Profile