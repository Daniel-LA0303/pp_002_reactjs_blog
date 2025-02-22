import { useSelector } from "react-redux";
import ReplyComment from "./ReplyComment";
import { AppDispatch, RootState } from "../../redux/store";
import { useState } from "react";
import { fetchCreateComment } from "../../slices/commentSlice";
import { useDispatch } from "react-redux";

interface CommentBlogProps {
  blogId: number; 
}

const CommentBlog: React.FC<CommentBlogProps> = ({blogId}) => {

  const dispatch = useDispatch<AppDispatch>();
  const userIdAuth = useSelector((state: RootState) => state.auth.userId);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);


  const [newComment, setNewComment] = useState<string>('');

  // Función para manejar el cambio en el input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {



    setNewComment(event.target.value); // Actualiza el estado con el valor del input
  };

  // Función para guardar el valor
  const handleSave = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCommentRequest = {
      blogId: blogId,
      userId: userIdAuth,
      content: newComment
    }

    console.log(newCommentRequest);
    
    
    try {
      const res = await dispatch(fetchCreateComment(newCommentRequest)).unwrap();
      console.log('Response:', res);
      
    } catch (error: any) {
      console.log('Error:', error);
      
    }

    console.log('Valor guardado:', newComment); // Aquí puedes hacer algo con el valor, como enviarlo a una API
    setNewComment(''); 
    
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
    
          <div className="flex items-center space-x-2">
            <div className="flex flex-shrink-0 self-start cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1551122089-4e3e72477432?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cnVieXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt=""
                className="h-8 w-8 object-fill rounded-full"
              />
            </div>

            <div className="flex items-center justify-center space-x-2">
              <div className="block">
                <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2">
                  <div className="font-medium">
                    <a href="#" className="hover:underline text-sm">
                      <small>Nirmala</small>
                    </a>
                  </div>
                  <div className="text-xs">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Expedita, maiores!
                  </div>
                </div>
                <div className="flex justify-start items-center text-xs w-full">
                  <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                    <a href="#" className="hover:underline">
                      <small>Like</small>
                    </a>
                    <small className="self-center">.</small>
                    <a href="#" className="hover:underline">
                      <small>Reply</small>
                    </a>
                    <small className="self-center">.</small>
                    <a href="#" className="hover:underline">
                      <small>15 hour</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex flex-shrink-0 self-start cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1609349744982-0de6526d978b?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDU5fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt=""
                className="h-8 w-8 object-cover rounded-full"
              />
            </div>

            <div className="flex items-center justify-center space-x-2">
              <div className="block">
                <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2">
                  <div className="font-medium">
                    <a href="#" className="hover:underline text-sm">
                      <small>Arkadewi</small>
                    </a>
                  </div>
                  <div className="text-xs">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Expedita, maiores!
                  </div>
                </div>
                <div className="flex justify-start items-center text-xs w-full">
                  <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                    <a href="#" className="hover:underline">
                      <small>Like</small>
                    </a>
                    <small className="self-center">.</small>
                    <a href="#" className="hover:underline">
                      <small>Reply</small>
                    </a>
                    <small className="self-center">.</small>
                    <a href="#" className="hover:underline">
                      <small>15 hour</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* reply */}
          <ReplyComment />

        </div>
      </div>
    </div>
    
    </div>

  );
};

export default CommentBlog;
