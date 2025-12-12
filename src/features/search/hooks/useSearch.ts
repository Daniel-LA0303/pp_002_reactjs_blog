import { useState, useEffect } from "react";

const useSearch = (module: string, query: string, page: number, size: number) => {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `http://192.168.100.3:8080/api/search?query=${query}&modules=${module}&page=${page}&size=${size}`
                );

                console.log(response);
                
                if (!response.ok) {
                    throw new Error("Error en la solicitud");
                }
                const result = await response.json();
                console.log(result.data);
                
                setData(result.data);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchData();
        }
    }, [module, query, page, size]);

    return { data, loading, error };
};

export default useSearch;