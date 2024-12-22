import ReplyComment from "./ReplyComment";


const CommentBlog = () => {
  return (
    <div className="mx-5 md:ml-10">
      <div className=" bg-gray-100 flex justify-start ">
        <div className="bg-white w-full  ">
    
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
  );
};

export default CommentBlog;
