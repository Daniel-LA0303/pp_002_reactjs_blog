import React from "react"
import { UserInfoCard } from "../../types/user"

const AuthorBlogCard: React.FC<UserInfoCard> = (props) => {
  return (
    <div className="relative w-full mx-auto md:max-w-2xl  min-w-0 break-words bg-white mb-6 shadow-md rounded-xl mt-16">
        <div className="px-6">
            <div className="flex flex-wrap justify-center">
                <div className=" w-full flex justify-center">
                    <div className="relative">
                        <img src="https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true" className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-10 lg:-ml-10 max-w-[100px]"/>
                    </div>
                </div>
                <div className="w-full text-center mt-5 md:mt-10">
                    <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                        <div className="p-2 text-center">
                            <span className="text-lg font-bold block uppercase tracking-wide text-slate-700">{props.blogsByUser}</span>
                            <span className="text-sm text-slate-400">Blogs</span>
                        </div>
                        <div className="p-2 text-center">
                            <span className="text-lg font-bold block uppercase tracking-wide text-slate-700">{props.followers}</span>
                            <span className="text-sm text-slate-400">Followers</span>
                        </div>

                        <div className="p-2 text-center">
                            <span className="text-lg font-bold block uppercase tracking-wide text-slate-700">{props.following}</span>
                            <span className="text-sm text-slate-400">Following</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-2">
                <h3 className=" text-base text-slate-700 font-bold leading-normal mb-1">{props.username}</h3>
                <div className="text-sm mt-0 mb-2 text-slate-400 font-bold uppercase">
                    <p>{props.city}</p>
                </div>
                <button className="bg-blue-500 text-sm mb-5 w-full text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200">
                Follow
                </button>
            </div>
           
        </div>
    </div>
  )
}

export default AuthorBlogCard