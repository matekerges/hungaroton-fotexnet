import { useEffect, useState, useRef } from "react";

import ArtistListComponent from "./ArtistListComponent";

import { Artist } from "@/page/home/types";
import { getArtists } from "../services/artistService";
import { useFilterContext, useErrorContext, usePaginationContext } from "@/page/home/contexts";

const ArtistListContainer = () => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true);

    const { currentPage, perPage, setTotalItems, setTotalPages, totalItems } = usePaginationContext();
    const { filters } = useFilterContext();
    const { setError, error } = useErrorContext();

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        async function fetchArtists() {
            try {
                setLoading(true);
                const response = await getArtists(currentPage, perPage, filters, setError);
                if (response) {
                    setArtists(response.data);
                    setTotalPages(response.pagination.total_pages);
                    setTotalItems(response.pagination.total_items);
                }
            } catch (error) {
                setError("Error with server communication, please refresh the page!");
                setArtists([]);
            } finally {
                setLoading(false);
            }
        }

        fetchArtists();
    }, [currentPage, filters, perPage, setError, setTotalItems, setTotalPages]);

    return <ArtistListComponent artists={artists} error={error} filters={filters} loading={loading} totalArtists={totalItems} />;
};

export default ArtistListContainer;
