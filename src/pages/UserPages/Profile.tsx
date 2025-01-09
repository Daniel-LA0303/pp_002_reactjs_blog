
import { useDispatch } from 'react-redux';
import CardBlog from '../../components/BlogCard'
import { AppDispatch, RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { UserProfile } from '../../types/user';
import { fetchGetProfileBack } from '../../slices/userSlice';
import Spinner from '../../components/Spinner/Spinner';
import Error from '../../components/Error/Error';
import { formatDate } from '../../utils/dateUtils';
import { useParams } from 'react-router-dom';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtenemos el userId como string

  const dispatch = useDispatch<AppDispatch>(); // Tipamos correctamente el dispatch
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  const [user, setUser] = React.useState<UserProfile | null>(null);

  // Verificar si el userId está presente y es un número válido
  const userIdNumber = id ? parseInt(id) : NaN;

  useEffect(() => {
    if (isNaN(userIdNumber)) {
      console.error("El ID de usuario no es válido");
      return;
    }

    const fetchData = async () => {
      try {
        // Despachamos la acción para obtener el perfil del usuario
        const response = await dispatch(fetchGetProfileBack(userIdNumber)).unwrap();
        setUser(response); // Guardamos la información del perfil en el estado
        console.log("response", response);
      } catch (err) {
        // Manejo de errores
        console.error("Error al obtener el perfil", err);
      }
    };

    fetchData(); // Llamamos a la función para obtener los datos del usuario
  }, [userIdNumber, dispatch]);

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
                          {user?.bio}
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
                        <p className=' text-lg'>{user?.work}</p>       
                      </div>
                      <div className="my-3 text-left sm:text-center w-full sm:w-2/4">
                        <h2 className=' text-sm sm:text-xs font-bold'>Education: </h2>   
                        <p className='text-lg'>{user?.education}</p>
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
                    <h2 className=' text-sm sm:text-xs font-bold'>Skills:</h2>
                    <div className=" my-2 border-t border-0.5 text-center"></div>
                    <p>{user?.skills}</p>
                  </div>
                </div>

              <div>
                <div className=" flex flex-col min-w-0 break-word w-full mb-6 shadow-lg  rounded-lg text-center ">
                  <div className=" py-4 lg:pt-4 px-2">
                    <div className="flex items-center  text-center">
                      {/* <InsertDriveFileIcon /> */}
                      <span className="text-sm font-bold block uppercase tracking-wide text-blueGray-600 mr-1">
                        {user?.blogsNumber}
                      </span>
                      <span className="text-sm text-blueGray-400">           
                        Posts published
                      </span>
                    </div>

                    <div className="flex items-center pt-2 text-center">
                      {/* <FavoriteIcon /> */}
                      <span className="text-sm font-bold block uppercase tracking-wide text-blueGray-600 mr-1">
                        {user?.likesNumber}
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Likes on posts
                      </span>
                    </div>
                    <div className="flex items-center pt-2 text-center">
                      {/* <PersonIcon /> */}
                      <span className="text-sm font-bold block uppercase tracking-wide text-blueGray-600 mr-1">
                        {user?.followers}
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Followers
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full sm:w-9/12'>
                <div className='w-full flex flex-col items-center'>
                    <CardBlog />                    
                    <CardBlog />
                    <CardBlog />
                </div>
            </div>
        </div>
        
        <div className='flex flex-row mt-0 md:mt-10 mx-auto w-full md:w-10/12 lg:w-8/12'>
            
            {/* <CardBlog />
            <CardBlog /> */}
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