import { useState } from "react";
import SearchUserCard from "../../user/components/SearchUserCard"
import useSearch from "../hooks/useSearch";
import { SearchGeneralProps } from "../types/search";
import CardBlogSkeleton from "../../../components/Skeletons/Blog/CardBlogSkeleton";
import { Pagination, Stack } from "@mui/material";


const SearchUsers: React.FC<SearchGeneralProps> = ({ query }) => {
  const [page, setPage] = useState(0);
  const size = 5;

  const { data, loading, error } = useSearch("users", query as string, page, size);

  const totalPages = data?.users?.totalPages || 0;

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data?.users?.content.length > 0 && (
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
        ) : data?.users?.content?.length === 0 ? (
          <div>No se encontraron usuarios.</div>
        ) : (
          data?.users?.content?.map((user: any) => (
            <SearchUserCard key={user.userId} {...user} />
          ))
        )}
      </div>

      {data?.users?.content.length > 0 && (
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
}

export default SearchUsers