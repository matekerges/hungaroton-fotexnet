import React from "react";
import dynamic from "next/dynamic";

import ArtistCard from "@/page/home/components/ArtistCard";
import SkeletonLoading from "@/page/home/components/SkeletonLoading";
import { Typography } from "@mui/material";

import { Artist, FilterState, FilterType } from "@/page/home/types";

import noResult from "@/assets/lottie/no_result.json";
import serverError from "@/assets/lottie/server_error.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface ArtistListComponentProps {
    artists: Artist[];
    error: string | null;
    filters: FilterState;
    loading: boolean;
    totalArtists: number;
}

const ArtistListComponent: React.FC<ArtistListComponentProps> = ({ artists, error, filters, loading, totalArtists }) => {
    const type = filters.type === FilterType.COMPOSER ? "Composer" : filters.type === FilterType.PERFORMER ? "Performer" : filters.type === FilterType.PRIMARY ? "Primary" : "none"

    return (
        <>
            {loading ? (
                <div className="mt-20 flex justify-center">
                    <SkeletonLoading />
                </div>
            ) : error ? (
                <div className="mt-5 flex flex-col items-center">
                    <Lottie animationData={serverError} loop={true} className="w-40 h-40" />
                    <p className="text-xl">{error}</p>
                </div>
            ) : (
                artists.length ? (
                    <div className="mt-10">
                        <Typography variant="h4" className="text-center text-gray-600">
                            {type === "none" ? "All" : totalArtists > 1 ? type === "Primary" ? "Primaries" : type + "s" : type}
                        </Typography>
                        <Typography variant="body1" className="text-center lowercase text-gray-500">
                            {totalArtists} {totalArtists === 1 ? "item" : "items"} found
                        </Typography>
                        <div className="mt-5 flex flex-wrap gap-4 justify-center">
                            {artists.map((artist) => (
                                <ArtistCard key={artist.id} artist={artist} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="mt-5 flex flex-col items-center">
                        <Lottie animationData={noResult} loop={true} className="w-40 h-40 [&_path]:fill-[#007799]" />
                        <p className="text-xl">Ups, no results found!</p>
                    </div>
                )
            )}
        </>
    );
};

export default ArtistListComponent;
