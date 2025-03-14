import { ArtistsListResponse, Artist } from "@/page/home/types";

const BASE_URL = "https://exam.api.fotex.net/api";

interface ArtistFilters {
    include_image?: boolean;
    letter?: string;
    search?: string;
    type?: string;
}

export const getArtists = async (
    currentPage: number,
    perPage: number,
    filters: ArtistFilters,
    setError: (error: string | null) => void
): Promise<ArtistsListResponse<Artist> | null> => {
    try {
        setError(null);
        const params = new URLSearchParams({
            page: currentPage.toString(),
            per_page: perPage.toString(),
        });

        if (filters.include_image === true) {
            params.append("include_image", "true");
        }

        if (filters.letter) {
            params.append("letter", filters.letter.toString());
        }

        if (filters.search) {
            params.append("search", filters.search);
        }

        if (filters.type) {
            params.append("type", filters.type);
        }

        const response = await fetch(`${BASE_URL}/artists?${params.toString()}`);

        if (!response.ok) {
            throw new Error("Hiba a szerverrel való kommunikációban, kérlek frissítsd az oldalt!");
        }

        return response.json();
    } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
        } else {
            setError("Ismeretlen hiba történt!");
        }
        return null;
    }
};
