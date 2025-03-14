import React from "react";

import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Artist } from "@/page/home/types";

interface ArtistCardComponentProps {
    artist: Artist;
}

const ArtistCardComponent: React.FC<ArtistCardComponentProps> = ({ artist }) => {
    return (
        <Card className="md:w-[200px] hover:opacity-80 cursor-pointer transition-opacity">
            {artist.portrait && (
                <CardMedia
                    component="img"
                    className="w-full md:w-[200px] md:h-[200px]"
                    image={artist.portrait}
                    alt={artist.name}
                    loading="eager"
                />
            )}
            <CardContent>
                <Typography variant="subtitle2" component="div">
                    {artist.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {artist.albumCount} album
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ArtistCardComponent;
