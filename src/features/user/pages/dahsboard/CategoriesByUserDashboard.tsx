import { useEffect, useState } from "react";
import NavBar from "../../../../components/NavBar/NavBar"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AsideDashboard from "./components/AsideDashboard";
import apiAuthClient from "../../../../services/config-client/apiAuthClient";
import CategoryCard from "../../../category/components/CategoryCard";
import SpinnerSmall from "../../../../components/Spinner/SpinnerSmall";

const CategoriesByUserDashboard = () => {

  const { id } = useParams<{ id: string }>();

  const [categories, setCategories] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // verify id from params
  const userIdNumber = id ? parseInt(id) : NaN;

  const fetchCategories = async () => {

    if (loadingCategories || !hasMore) return;
    setLoadingCategories(true);

    try {
      const response = await apiAuthClient.get(
        `/blog/dashboard?userId=${userIdNumber}&type=CATEGORIES_FOLLOWED&page=${page}&size=15`
      );

      const { content, last } = response.data.data;
      setCategories((prevCategories) => [...prevCategories, ...content]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(!last);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  // function activate scroll
  const handleScroll = () => {
    if (
      !loadingCategories &&
      hasMore &&
      window.innerHeight + document.documentElement.scrollTop + 50 >=
      document.documentElement.scrollHeight
    ) {
      fetchCategories();
    }
  };

  // fecth get categories
  useEffect(() => {
    fetchCategories();
  }, []);

  // activate scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingCategories, hasMore]);

  return (
    <div className="">
      <NavBar />

      <div className="flex flex-col lg:flex-row mx-auto w-full">

        <div className='w-full lg:w-3/12'>
          <AsideDashboard />
        </div>

        {/* categories following by user */}
        <div className='flex flex-col items-center w-full lg:w-5/12 px-4 mx-auto'>
          <div className='my-20 w-full'>
            {categories.length !== 0 ? (
              categories.map(c => (
                <CategoryCard
                  key={c?.categoryFullInfoDTO?.categoryId}
                  categoryId={c?.categoryFullInfoDTO?.categoryId ?? null}
                  nameCategory={c?.categoryFullInfoDTO?.name ?? ''}
                  color={c?.categoryFullInfoDTO?.color ?? ''}
                  postsNumber={c?.categoryFullInfoDTO?.postsNumber ?? 0}
                  description={c?.categoryFullInfoDTO?.description ?? ''}
                  usersFollowersIds={c?.usersFollowersIds ?? []}
                />
              ))
            ) : !loadingCategories ? (
              <div className="flex flex-col justify-center items-center">
                <p className="text-center text-2xl mt-10">You do not follow any category</p>

                <p className="text-lg mt-5 mb-3">You can follow here</p>

                <Link
                  to="/create-blog"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Categories
                </Link>
              </div>
            ) : null}

            {loadingCategories && <SpinnerSmall />}

          </div>
        </div>

      </div>
    </div>
  )
}

export default CategoriesByUserDashboard