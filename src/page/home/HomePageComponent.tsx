import ArtistList from "./components/ArtistList/components";
import Filter from "./components/Filter";
import Pagination from "@/page/home/components/Pagination";

import Theme from "@/styles/theme";

const HomePageComponent = () => {
    return (
        <Theme>
            <Filter />
            <ArtistList />
            <Pagination />
        </Theme>
    );
};

export default HomePageComponent;
