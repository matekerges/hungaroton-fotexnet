import React from "react";

import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Artist } from "@/page/home/types";
import ArtistDetailsModal from "../ArtistDetailsModal";

interface ArtistCardComponentProps {
    artist: Artist;
}

const ArtistCardComponent: React.FC<ArtistCardComponentProps> = ({ artist }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Card onClick={handleOpen} className="w-full md:w-[300px] lg:w-[200px] hover:opacity-80 cursor-pointer transition-opacity">
                {artist.portrait && (
                    <div className="aspect-square">
                        <CardMedia
                            component="img"
                            className="w-full h-full"
                            image={artist.portrait}
                            alt={artist.name}
                            loading="eager"
                        />
                    </div>
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
            <ArtistDetailsModal artist={artist} handleClose={handleClose} open={open} />
        </>
    );
};

export default ArtistCardComponent;
