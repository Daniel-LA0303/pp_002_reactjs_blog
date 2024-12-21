
import CardBlog from '../../components/Card'

const Profile = () => {
  return (
    <div className=''>
        <section className="pt-8 sm:pt-8 ">
        <div className="w-full md:w-10/12 lg:w-8/12 mx-auto">
          <div className={`flex flex-col min-w-0 break-word w-full mb-6 shadow-2xl rounded-lg mt-16`}>
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
                  User
                </h3>
                
                  <>

                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12">
                        <p className=" text-left md:text-center text-sm mb-4 leading-relaxed text-blueGray-700">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, maxime iure! Autem officia numquam magnam ea obcaecati. Sunt velit quaerat accusamus sequi quae repellendus, tempora fugit cum blanditiis quidem iste!
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12">
                        <p className=" text-left md:text-center text-sm mb-4 leading-relaxed text-blueGray-700">
                            Join in
                        </p>
                      </div>
                    </div>
                    <div className=" my-2 border-t border-0.5 text-center"></div>
                    <div className=' block sm:flex'>
                      <div className="my-3 text-left sm:text-center  w-full sm:w-2/4">
                        <h2 className=' text-sm sm:text-xs font-bold'>Work: </h2>   
                        <p className=' text-lg'>IDA</p>       
                      </div>
                      <div className="my-3 text-left sm:text-center w-full sm:w-2/4">
                        <h2 className=' text-sm sm:text-xs font-bold'>Education: </h2>   
                        <p className='text-lg'>BUAP</p>
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

                <div className= "flex flex-col min-w-0 break-word w-full my-1 shadow-2xl rounded-lg mt-4">
                  <div className=" px-2 mb-2 mt-4 text-left block sm:text-center  sm:justify-center">
                    <h2 className=' text-sm sm:text-xs font-bold'>Skills:</h2>
                    <div className=" my-2 border-t border-0.5 text-center"></div>
                    <p>Skills</p>
                  </div>
                </div>

              <div>
                <div className=" flex flex-col min-w-0 break-word w-full mb-6 shadow-2xl rounded-lg text-center ">
                  <div className=" py-4 lg:pt-4 px-2">
                    <div className="flex items-center  text-center">
                      {/* <InsertDriveFileIcon /> */}
                      <span className="text-sm font-bold block uppercase tracking-wide text-blueGray-600 mr-1">
                        30
                      </span>
                      <span className="text-sm text-blueGray-400">           
                        Posts published
                      </span>
                    </div>

                    <div className="flex items-center pt-2 text-center">
                      {/* <FavoriteIcon /> */}
                      <span className="text-sm font-bold block uppercase tracking-wide text-blueGray-600 mr-1">
                        100
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Likes on posts
                      </span>
                    </div>
                    <div className="flex items-center pt-2 text-center">
                      {/* <PersonIcon /> */}
                      <span className="text-sm font-bold block uppercase tracking-wide text-blueGray-600 mr-1">
                        1000
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