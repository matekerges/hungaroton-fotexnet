import { CardMedia, Modal, Typography } from "@mui/material";
import { Artist } from "../../types";

interface ArtistDetailsModalComponentProps {
    artist: Artist;
    open: boolean;
    handleClose: () => void;
}

const ArtistDetailsModalComponent = ({ artist, open, handleClose }: ArtistDetailsModalComponentProps) => {
    return (
        <Modal
            closeAfterTransition
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-3 md:p-0"
            open={open}
            onClose={handleClose}
            aria-labelledby="artist-details"
            aria-describedby="artist-details-modal-description"
        >
            <div className="p-2 bg-white md:w-[600px] focus:outline-none flex flex-col md:flex-row">
                {artist.portrait && (
                    <CardMedia
                        component="img"
                        className="w-full md:max-w-[300px] md:h-[300px]"
                        image={artist.portrait}
                        alt={artist.name}
                    />
                )}
                <div className="p-4 w-full">
                    <Typography variant="h5" component="div">
                        {artist.name}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {artist.albumCount} album
                    </Typography>
                </div>
            </div>
        </Modal>)
};

export default ArtistDetailsModalComponent;
