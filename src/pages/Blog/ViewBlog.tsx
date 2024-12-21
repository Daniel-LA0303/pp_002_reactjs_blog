import React from 'react'
import CommentBlog from '../../components/Blog/CommentBlog'
import ActionsBlog from '../../components/Blog/ActionsBlog'

const ViewBlog = () => {
  return (
    <div className="max-w-screen-xl mx-auto flex justify-center">
        <div className="flex-col hidden sm:block sticky top-0 h-[90%] p-4">
            <ActionsBlog />
        </div>
        <main className="">

            <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative" style={{height: '24em'}}>
                <div className="absolute left-0 bottom-0 w-full h-full z-10"
                style={{backgroundImage: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7));'}}></div>
                <img src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" className="absolute left-0 top-0 w-full h-full z-0 object-cover" />
                <div className="p-4 absolute bottom-0 left-0 z-20">
                <a href="#"
                    className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">Nutrition</a>
                <div className="flex mt-3">
                    <img src="https://randomuser.me/api/portraits/men/97.jpg"
                    className="h-10 w-10 rounded-full mr-2 object-cover" />
                    <div>
                    <p className="font-semibold text-gray-200 text-sm"> Mike Sullivan </p>
                    <p className="font-semibold text-gray-400 text-xs"> 14 Aug </p>
                    </div>
                </div>
                </div>
            </div>

            <div className="px-4 lg:px-0 mt-4 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
                <h2 className="text-4xl font-semibold text-black leading-tight mb-5">
                    Pellentesque a consectetur velit, ac molestie ipsum. Donec sodales, massa et auctor.
                </h2>

                <p className="pb-6">Advantage old had otherwise sincerity dependent additions. It in adapted natural hastily is
                justice. Six draw
                you him full not mean evil. Prepare garrets it expense windows shewing do an. She projection advantages
                resolution son indulgence. Part sure on no long life am at ever. In songs above he as drawn to. Gay was
                outlived peculiar rendered led six.</p>

                <p className="pb-6">Difficulty on insensible reasonable in. From as went he they. Preference themselves me as
                thoroughly
                partiality considered on in estimating. Middletons acceptance discovered projecting so is so or. In or
                attachment inquietude remarkably comparison at an. Is surrounded prosperous stimulated am me discretion
                expression. But truth being state can she china widow. Occasional preference fat remarkably now projecting
                uncommonly dissimilar. Sentiments projection particular companions interested do at my delightful. Listening
                newspaper in advantage frankness to concluded unwilling.</p>

                <p className="pb-6">Adieus except say barton put feebly favour him. Entreaties unpleasant sufficient few pianoforte
                discovered
                uncommonly ask. Morning cousins amongst in mr weather do neither. Warmth object matter course active law
                spring six. Pursuit showing tedious unknown winding see had man add. And park eyes too more him. Simple excuse
                active had son wholly coming number add. Though all excuse ladies rather regard assure yet. If feelings so
                prospect no as raptures quitting.</p>

                <div className="border-l-4 border-gray-500 pl-4 mb-6 italic rounded">
                Sportsman do offending supported extremity breakfast by listening. Decisively advantages nor
                expression
                unpleasing she led met. Estate was tended ten boy nearer seemed. As so seeing latter he should thirty whence.
                Steepest speaking up attended it as. Made neat an on be gave show snug tore.
                </div>

                <p className="pb-6">Exquisite cordially mr happiness of neglected distrusts. Boisterous impossible unaffected he me
                everything.
                Is fine loud deal an rent open give. Find upon and sent spot song son eyes. Do endeavor he differed carriage
                is learning my graceful. Feel plan know is he like on pure. See burst found sir met think hopes are marry
                among. Delightful remarkably new assistance saw literature mrs favourable.</p>

                <h2 className="text-2xl text-gray-800 font-semibold mb-4 mt-4">Uneasy barton seeing remark happen his has</h2>

                <p className="pb-6">Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown
                oh he common
                future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested
                simplicity at do projecting increasing terminated. As edward settle limits at in.</p>

                <p className="pb-6">Dashwood contempt on mr unlocked resolved provided of of. Stanhill wondered it it welcomed oh.
                Hundred no
                prudent he however smiling at an offence. If earnestly extremity he he propriety something admitting convinced
                ye. Pleasant in to although as if differed horrible. Mirth his quick its set front enjoy hoped had there. Who
                connection imprudence middletons too but increasing celebrated principles joy. Herself too improve gay winding
                ask expense are compact. New all paid few hard pure she.</p>

                <p className="pb-6">Breakfast agreeable incommode departure it an. By ignorant at on wondered relation. Enough at
                tastes really
                so cousin am of. Extensive therefore supported by extremity of contented. Is pursuit compact demesne invited
                elderly be. View him she roof tell her case has sigh. Moreover is possible he admitted sociable concerns. By
                in cold no less been sent hard hill.</p>

                <p className="pb-6">Detract yet delight written farther his general. If in so bred at dare rose lose good. Feel and
                make two real
                miss use easy. Celebrated delightful an especially increasing instrument am. Indulgence contrasted sufficient
                to unpleasant in in insensible favourable. Latter remark hunted enough vulgar say man. Sitting hearted on it
                without me.</p>

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

        <div className="fixed z-1 bottom-0 w-full p-1 block sm:hidden bg-slate-500">
            <div className='flex justify-center'>
                <ActionsBlog />
            </div>
        </div>
    </div>
  )
}

export default ViewBlog