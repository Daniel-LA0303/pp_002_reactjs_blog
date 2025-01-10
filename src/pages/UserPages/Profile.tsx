
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { UserProfile } from '../../types/user';
import { fetchGetProfileBack } from '../../slices/userSlice';
import Spinner from '../../components/Spinner/Spinner';
import Error from '../../components/Error/Error';
import { formatDate } from '../../utils/dateUtils';
import { useParams } from 'react-router-dom';
import BlogCard from '../../components/BlogCard';
import axios from 'axios';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined';
import TagIcon from '@mui/icons-material/Tag';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 

  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  const [user, setUser] = React.useState<UserProfile | null>(null);


      const [blogs, setBlogs] = useState([]);
      const [page, setPage] = useState(0);
      const [loadingBlogs, setLoadingBlogs] = useState(false);
      const [hasMore, setHasMore] = useState(true); 
    


  const userIdNumber = id ? parseInt(id) : NaN;

  useEffect(() => {
    if (isNaN(userIdNumber)) {
      console.error("El ID de usuario no es válido");
      return;
    }

    const fetchData = async () => {
      try {
        
        const response = await dispatch(fetchGetProfileBack(userIdNumber)).unwrap();
        setUser(response); 
        console.log("response", response);
      } catch (err) {
        console.error("Error al obtener el perfil", err);
      }
    };

    fetchData(); 
  }, [userIdNumber, dispatch]);



  const fetchBlogs = async () => {
  if (loadingBlogs || !hasMore) return;

  setLoadingBlogs(true);
  try {

    const response = await axios.get(
      `http://127.0.0.1:8080/api/blog/pagination-by-user?userId=${userIdNumber}&page=${page}&size=5`
    );

    const { content, last } = response.data.data;
    setBlogs((prevBlogs) => [...prevBlogs, ...content]);
    setPage((prevPage) => prevPage + 1);
    setHasMore(!last);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  } finally {
    setLoadingBlogs(false);
  }
};


  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleScroll = () => {
    if (
      !loadingBlogs &&
      hasMore &&
      window.innerHeight + document.documentElement.scrollTop + 50 >=
      document.documentElement.scrollHeight
    ) {
      fetchBlogs();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); 
  }, [loadingBlogs, hasMore]);

  if (loading) return <Spinner />;
  if (error) return <Error />;

  return (
    <div className=''>
        <section className="pt-8 sm:pt-8 ">
        <div className="w-full md:w-10/12 lg:w-8/12 mx-auto">
          <div className={`flex flex-col min-w-0 break-word w-full mb-6 shadow-lg rounded-lg mt-16`}>
            <div className="px-2 sm:px-6 ">
              <div className="flex flex-wrap justify-center">
                <div className="w-full ml-10 md:ml-0 px-4 flex justify-start sm:justify-center">
                  <img alt="..." 
                    src={'/avatar.png'} 
                    className=" shadow-xl image_profile  h-auto align-middle border-none  -m-16  lg:-ml-16 max-w-150-px" />  
                </div>
                <div className='w-full flex justify-end'>
                 
                </div>            
              </div>
              <div className=" ">
                <h3 className={`text-left md:text-center text-xl mt-10 md:mt-10 font-bold leading-normal mb-2`}>
                  {user?.username}
                </h3>
                
                  <>

                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12">
                        <p className=" text-left md:text-center text-sm mb-4 leading-relaxed text-blueGray-700">
                          {user?.bio ? user?.bio : 'No data'}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12">
                        <p className=" text-left md:text-center text-sm mb-4 leading-relaxed text-blueGray-700">
                        Join in {user?.createdAt ? formatDate(user.createdAt) : 'Date not available'}

                        </p>
                      </div>
                    </div>
                    <div className=" my-2 border-t border-0.5 text-center"></div>
                    <div className=' block sm:flex'>
                      <div className="my-3 text-left sm:text-center  w-full sm:w-2/4">
                        <h2 className=' text-sm sm:text-xs font-bold'>Work: </h2>   
                        <p className=' text-lg'>{user?.work ? user?.work : 'No data'}</p>       
                      </div>
                      <div className="my-3 text-left sm:text-center w-full sm:w-2/4">
                        <h2 className=' text-sm sm:text-xs font-bold'>Education: </h2>   
                        <p className='text-lg'>{user?.education ? user?.education : 'No data'}</p>
                      </div>
                    </div>
                  </>
           

              </div>
            </div>
          </div>
        </div>
        {/* Content here */}
        <div className='block sm:flex mx-auto w-full md:w-10/12 lg:w-8/12'> 
            <div className='w-full sm:w-3/12 mr-0 sm:mr-2'>

                <div className= "flex flex-col min-w-0 break-word w-full my-1 shadow-lg  rounded-lg mt-4">
                  <div className=" px-2 mb-2 mt-4 text-left block sm:text-center  sm:justify-center">
                    <h2 className=' text-sm sm:text-xs font-bold flex justify-center items-center'>
                      <TerminalOutlinedIcon fontSize='small'/>
                      Skills/Lnaguages:
                    </h2>
                    <div className=" my-2 border-t border-0.5 text-center"></div>
                    <p>{user?.skills ? user?.skills : 'No data'}</p>
                  </div>
                </div>

                <div className= "flex flex-col min-w-0 break-word w-full my-1 shadow-lg  rounded-lg mt-4">
                  <div className=" px-2 mb-2 mt-4 text-left block sm:text-center  sm:justify-center">
                    <h2 className=' text-sm sm:text-xs font-bold flex justify-center items-center'>
                      <LocationOnIcon fontSize='small'/>
                      City
                    </h2>
                    <div className=" my-2 border-t border-0.5 text-center"></div>
                    <p>{user?.city ? user?.city : 'No data'}</p>
                  </div>
                </div>

                <div className= "flex flex-col min-w-0 break-word w-full my-1 shadow-lg  rounded-lg mt-4">
                  <div className=" px-2 mb-2 mt-4 text-left block sm:text-center  sm:justify-center">
                    <h2 className=' text-sm sm:text-xs font-bold flex justify-center items-center'>
                      <LanguageIcon fontSize='small'/>
                      WebSite
                    </h2>
                    <div className=" my-2 border-t border-0.5 text-center"></div>
                    <p className=' text-sm'>{user?.webSite ? user?.webSite : 'No data'}</p>
                  </div>
                </div>

              <div>
                <div className=" flex flex-col min-w-0 break-word w-full mb-6 shadow-lg  rounded-lg text-center ">
                  <div className=" py-4 lg:pt-4 px-2">
                    <div className="flex items-center  text-center">
                        <ArticleOutlinedIcon fontSize='small'/>
                      <span className="text-sm font-bold block uppercase tracking-wide text-blueGray-600 mx-1">
                        {user?.blogsNumber}
                      </span>
                      <span className="text-sm text-blueGray-400">           
                        Posts published
                      </span>
                    </div>

                    <div className="flex items-center pt-2 text-center">
                      <FavoriteBorderIcon fontSize='small'/>
                      <span className="text-sm font-bold block uppercase tracking-wide text-blueGray-600 mx-1">
                        
                        {user?.likesNumber}
                      </span>
                      <span className="text-sm text-blueGray-400">
                        
                        Likes on posts
                      </span>
                    </div>
                    <div className="flex items-center pt-2 text-center">
                      <PersonAddAltIcon fontSize='small'/>
                      <span className="text-sm font-bold block uppercase tracking-wide text-blueGray-600 mx-1">
                        {user?.followers}
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Followers
                      </span>
                    </div>
                    <div className="flex items-center pt-2 text-center">
                      <TagIcon fontSize='small'/>
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
            <div className='w-full sm:w-9/12'>
                <div className='w-full items-center'>
                  {blogs.length !== 0 ? blogs.map((b, index) => (
                    <BlogCard 
                          key={index} {...b} 
                          {...blogs}

                      />
                  )) : 
                    <div className='flex flex-col justify-center items-center '>
                      <p className='text-center text-2xl mt-10'>You do not have blogs yet</p>
                      <p className='text-lg mt-5 mb-3'>You can create a blog here</p>
                      <Link to={`/create-blog`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Create Blog
                      </Link>
                    </div>
                  }


                  {loadingBlogs && <p>Cargando más blogs...</p>}
                </div>
            </div>
        </div>
        
        <div className='flex flex-row mt-0 md:mt-10 mx-auto w-full md:w-10/12 lg:w-8/12'>
            
        </div>
        
        <footer className="relative  pt-8 pb-6 mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                  Made with MERN Stack by Daniel.
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
      

    </div>
  )
}

export default Profile