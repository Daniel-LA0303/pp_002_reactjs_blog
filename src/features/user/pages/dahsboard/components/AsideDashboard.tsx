
/**
 * hooks
 */

/**
 * icons
 */
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'; // save
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined'; // followers
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'; //following
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'; // like
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'; // tag
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined'; // blogs
import { NavLink } from 'react-router-dom';
import { RootState } from '../../../../../redux/store';
import { useSelector } from 'react-redux';


const AsideDashboard = () => {

    const userIdAuth = useSelector((state: RootState) => state.auth.userId);
    const email = useSelector((state: RootState) => state.auth.email);
    const username = useSelector((state: RootState) => state.auth.userName);

    /**
     * hooks
     */
    // const { userAuth } = userUserAuthContext();
    // const { globalData } = useGlobalDataContext();


    return (
        <aside
            className={`
                w-full h-16 
                fixed bottom-0 left-0 right-0 z-40 
                lg:h-[calc(100vh-4rem)] 
                flex lg:flex-col items-center lg:items-start gap-2 p-2 lg:p-6
                bg-white text-black 
                lg:sticky lg:top-16
                border-r-0 lg:border-r-2 border-slate-200
                border-t-2 lg:border-t-0
                mt-16
            `}
        >

            {/* USER INFO solo desktop */}
            <div className="hidden lg:flex flex-col items-start gap-2 mb-4">
                <h1 className="text-lg font-semibold">{username}</h1>
                <p className="text-sm text-gray-500">{email}</p>
            </div>

            {/* NAVIGATION */}
            <nav className="flex lg:flex-col flex-row w-full  justify-around items-center lg:items-start gap-2">
                {[
                    { to: `/blogs-published/${userIdAuth}`, icon: <FeedOutlinedIcon />, label: "Post by User" },
                    { to: `/blogs-by-save/${userIdAuth}`, icon: <BookmarkBorderOutlinedIcon />, label: "Posts saved" },
                    { to: `/blogs-by-likes/${userIdAuth}`, icon: <FavoriteBorderOutlinedIcon />, label: "Posts liked" },
                    { to: `/users-followers/${userIdAuth}`, icon: <GroupAddOutlinedIcon />, label: "Followers" },
                    { to: `/users-following/${userIdAuth}`, icon: <GroupOutlinedIcon />, label: "Following" },
                    { to: `/categories-following/${userIdAuth}`, icon: <LocalOfferOutlinedIcon />, label: "Following tags" },
                ].map((nav) => (
                    <NavLink
                        key={nav.to}
                        to={nav.to}
                        className={({ isActive }) =>
                            `flex items-center justify-center lg:justify-start gap-2 rounded-md px-2 py-2 w-full ${isActive
                                ? "bg-blue-500 text-white"
                                : "text-gray-700 hover:bg-gray-300"
                            }`
                        }
                    >
                        {nav.icon}
                        <span className="hidden lg:inline text-sm font-medium">{nav.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>


    )
}

export default AsideDashboard
