import { useState } from "react";
import useSearch from "../hooks/useSearch";
import { SearchGeneralProps } from "../types/search";
import CardBlogSkeleton from "../../../components/Skeletons/Blog/CardBlogSkeleton";
import BlogCard from "../../blog/components/BlogCard";
import { Pagination, Stack } from "@mui/material";

const SearchBlogs: React.FC<SearchGeneralProps> = ({ query }) => {
    const [page, setPage] = useState<number>(0); 
    const size = 5; 

    const { data, loading, error } = useSearch("blogs", query as string, page, size);
    const totalPages = data?.blogs?.totalPages || 0;

    if (error) return <div>Error: {error}</div>;

    return (
        <div>

            {data?.blogs?.content.length > 0 && (
                <Stack
                    spacing={2}
                    alignItems="center"
                    className="mt-6"
                >
                    <Pagination
                        count={totalPages}
                        page={page + 1}
                        onChange={(_, value) => {
                            setPage(value - 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        color="primary"
                        showFirstButton
                        showLastButton
                    />
                </Stack>
            )}

            <div className="space-y-4">
                {loading ? (
                    <CardBlogSkeleton />
                ) : data?.blogs?.content?.length === 0 ? (
                    <div>No se encontraron blogs.</div>
                ) : (
                    data?.blogs?.content?.map((blog: any) => (
                        <BlogCard key={blog.blogId} {...blog} />
                    ))
                )}
            </div>

            {data?.blogs?.content.length > 0 && (
                <Stack
                    spacing={2}
                    alignItems="center"
                    className="mt-6"
                >
                    <Pagination
                        count={totalPages}
                        page={page + 1}
                        onChange={(_, value) => {
                            setPage(value - 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        color="primary"
                        showFirstButton
                        showLastButton
                    />
                </Stack>
            )}
        </div>
    );
};

export default SearchBlogs;