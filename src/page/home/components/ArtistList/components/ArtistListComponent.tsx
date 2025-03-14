import React from "react";
import dynamic from "next/dynamic";

import ArtistCard from "@/page/home/components/ArtistCard";
import SkeletonLoading from "@/page/home/components/SkeletonLoading";
import { Typography } from "@mui/material";

import { Artist } from "@/page/home/types";

import noResult from "@/assets/lottie/no_result.json";
import serverError from "@/assets/lottie/server_error.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface ArtistListComponentProps {
    artists: Artist[];
    error: string | null;
    loading: boolean;
    totalArtists: number;
}

const ArtistListComponent: React.FC<ArtistListComponentProps> = ({ artists, error, loading, totalArtists }) => {
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
                            Előadók
                        </Typography>
                        <Typography variant="body1" className="text-center text-gray-500">
                            ({totalArtists} előadó található)
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
                        <p className="text-xl">Hoppá, nincs találat!</p>
                    </div>
                )
            )}
        </>
    );
};

export default ArtistListComponent;
