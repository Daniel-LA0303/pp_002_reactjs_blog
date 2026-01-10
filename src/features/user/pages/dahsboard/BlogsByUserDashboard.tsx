import { useEffect, useState } from "react";
import NavBar from "../../../../components/NavBar/NavBar"
import { BlogCardI } from "../../../blog/types/blog";
import { useParams } from "react-router-dom";
import BlogCard from "../../../blog/components/BlogCard";
import { Link } from "react-router-dom";
import AsideDashboard from "./components/AsideDashboard";
import apiAuthClient from "../../../../services/config-client/apiAuthClient";
import SpinnerSmall from "../../../../components/Spinner/SpinnerSmall";

const BlogsByUserDashboard = () => {

  const { id } = useParams<{ id: string }>();

  const [blogs, setBlogs] = useState<BlogCardI[]>([]);
  const [page, setPage] = useState(0);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // verify id from params
  const userIdNumber = id ? parseInt(id) : NaN;

  const fetchBlogs = async () => {

    if (loadingBlogs || !hasMore) return;
    setLoadingBlogs(true);

    try {
      const response = await apiAuthClient.get(
        `/blog/dashboard?userId=${userIdNumber}&type=BLOGS_PUBLISHED&page=${page}&size=10`
      );

      const { content, last } = response.data.data;
      setBlogs((prevBlogs) => [...prevBlogs, ...content]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(!last);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoadingBlogs(false);
    }
  };

  // function activate scroll
  const handleScroll = () => {
    if (
      !loadingBlogs &&
      hasMore &&
      window.innerHeight + document.documentElement.scrollTop + 50 >=
      document.documentElement.scrollHeight
    ) {
      fetchBlogs();
    }
  };

  // fecth get blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  // activate scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingBlogs, hasMore]);

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
            {blogs.length !== 0 ? (
              blogs.map((b, index) => (
                <BlogCard
                  key={b.blogId ?? index}
                  {...b}
                />
              ))
            ) : !loadingBlogs ? (
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

            {loadingBlogs && <SpinnerSmall />}

          </div>
        </div>

      </div>
    </div>
  )
}

export default BlogsByUserDashboard