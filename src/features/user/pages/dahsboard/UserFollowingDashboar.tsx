import { useEffect, useState } from "react";
import NavBar from "../../../../components/NavBar/NavBar"
import { useParams } from "react-router-dom";
import AsideDashboard from "./components/AsideDashboard";
import apiAuthClient from "../../../../services/config-client/apiAuthClient";
import { UserCardI } from "../../types/user";
import UserCard from "../../components/UserCard";
import SpinnerSmall from "../../../../components/Spinner/SpinnerSmall";

const UserFollowingDashboar = () => {
  const { id } = useParams<{ id: string }>();

  const [users, setUser] = useState<UserCardI[]>([]);
  const [page, setPage] = useState(0);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // verify id from params
  const userIdNumber = id ? parseInt(id) : NaN;

  const fetchUsers = async () => {

    if (loadingUsers || !hasMore) return;
    setLoadingUsers(true);

    try {
      const response = await apiAuthClient.get(
        `/blog/dashboard?userId=${userIdNumber}&type=FOLLOWING&page=${page}&size=15`
      );

      const { content, last } = response.data.data;
      setUser((prevUsers) => [...prevUsers, ...content]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(!last);
    } catch (error) {
      console.error("Error fetching Users:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  // function activate scroll
  const handleScroll = () => {
    if (
      !loadingUsers &&
      hasMore &&
      window.innerHeight + document.documentElement.scrollTop + 50 >=
      document.documentElement.scrollHeight
    ) {
      fetchUsers();
    }
  };

  // fecth get blogs
  useEffect(() => {
    fetchUsers();
  }, []);

  // activate scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingUsers, hasMore]);


  return (
    <div className="">
      <NavBar />

      <div className="flex flex-col lg:flex-row mx-auto w-full">

        <div className='w-full lg:w-3/12'>
          <AsideDashboard />
        </div>

        {/* users followind by user */}
        <div className='flex flex-col items-center w-full lg:w-5/12 px-4 mx-auto'>
          <div className='my-20 w-full'>
            {users.length !== 0 ? (
              users.map((u, index) => (
                <UserCard
                  key={u.userId ?? index}
                  {...u}
                />
              ))
            ) : !loadingUsers ? (
              <div className="flex flex-col justify-center items-center">
                <p className="text-center text-2xl mt-10">
                  You do not have any user following yet
                </p>
              </div>
            ) : null}

            {loadingUsers && <SpinnerSmall />}

          </div>
        </div>
      </div>
    </div>
  )
}


export default UserFollowingDashboar