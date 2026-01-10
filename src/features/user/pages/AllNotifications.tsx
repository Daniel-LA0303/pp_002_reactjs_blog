import { useEffect, useState } from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import AsideDashboard from './dahsboard/components/AsideDashboard'
import { useParams } from 'react-router-dom';
import apiAuthClient from '../../../services/config-client/apiAuthClient';
import { Link } from 'react-router-dom';
import SpinnerSmall from '../../../components/Spinner/SpinnerSmall';

/**
 * icons
 */
import { NotificationReceivedI } from '../types/user';
import NotificationUserFullInfo from '../components/NotificationUserFullInfo';




const AllNotifications = () => {

  const { id } = useParams<{ id: string }>();

  const [notifications, setNotifications] = useState<NotificationReceivedI[]>([]);
  const [page, setPage] = useState(0);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // verify id from params
  const userIdNumber = id ? parseInt(id) : NaN;

  const fetchNotifications = async () => {

    if (loadingNotifications || !hasMore) return;
    setLoadingNotifications(true);

    try {
      const response = await apiAuthClient.get(
       `/notification/get-all-notifications/${userIdNumber}?page=${page}&size=15`
      );
      console.log(response);
      
      const { content, last } = response.data.data;
      setNotifications((prevNotifications) => [...prevNotifications, ...content]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(!last);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoadingNotifications(false);
    }
  };

  // function activate scroll
  const handleScroll = () => {
    if (
      !loadingNotifications &&
      hasMore &&
      window.innerHeight + document.documentElement.scrollTop + 50 >=
      document.documentElement.scrollHeight
    ) {
      fetchNotifications();
    }
  };

  // fecth get blogs
  useEffect(() => {
    fetchNotifications();
  }, []);

  // activate scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingNotifications, hasMore]);

  return (
    <div className="">
      <NavBar />

      <div className="flex flex-col lg:flex-row mx-auto w-full">

        <div className='w-full lg:w-3/12'>
          <AsideDashboard />
        </div>

        {/* blogs by user */}
        <div className='flex flex-col items-center w-full lg:w-5/12 px-4 mx-auto'>
          <div className='my-20 w-full'>
            {notifications.length !== 0 ? (
              notifications.map((n, index) => (
                <NotificationUserFullInfo
                  key={n.notificationId ?? index}
                  {...n}
                />
              ))
            ) : !loadingNotifications ? (
              <div className="flex flex-col justify-center items-center">
                <p className="text-center text-2xl mt-10">
                  You do not have blogs yet
                </p>
                <p className="text-lg mt-5 mb-3">
                  You can create a blog here
                </p>
                <Link
                  to="/create-blog"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Create Blog
                </Link>
              </div>
            ) : null}

            {loadingNotifications && <SpinnerSmall />}

          </div>
        </div>

      </div>
    </div>
  )
}

export default AllNotifications
