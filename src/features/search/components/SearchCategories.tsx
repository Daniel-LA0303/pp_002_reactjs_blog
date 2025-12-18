import { useState } from "react";
import CategoryCard from "../../category/components/CategoryCard"
import useSearch from "../hooks/useSearch";
import { SearchGeneralProps } from "../types/search";
import CardCategorySkeleton from "../../../components/Skeletons/Category/CardCategorySkeleton";
import { Pagination, Stack } from "@mui/material";

const SearchCategories: React.FC<SearchGeneralProps> = ({ query }) => {
    const [page, setPage] = useState(0);
    const size = 5; 

    const { data, loading, error } = useSearch("categories", query as string, page, size);

    const totalPages = data?.categories?.totalPages || 0;

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {data?.categories?.content.length > 0 && (
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
                    <CardCategorySkeleton />
                ) : data?.categories?.content?.length === 0 ? (
                    <div>No se encontraron categorias.</div>
                ) : (
                    data?.categories?.content?.map((category: any) => (
                        <CategoryCard
                            {...category}
                            key={category?.categoryFullInfoDTO?.categoryId}
                            categoryId={category.categoryFullInfoDTO.categoryId ?? null}
                            nameCategory={category.categoryFullInfoDTO.name ?? ''}
                            color={category.categoryFullInfoDTO.color ?? ''}
                            postsNumber={category.categoryFullInfoDTO.postsNumber ?? 0}
                            description={category.categoryFullInfoDTO.description ?? ''}
                            usersFollowersIds={category.usersFollowersIds || []}
                        />
                    ))
                )}
            </div>

            {data?.categories?.content.length > 0 && (
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

export default SearchCategories
