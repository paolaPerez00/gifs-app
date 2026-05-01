import GifList from "./gifs/components/GifList"
import PreviousSearches from "./gifs/components/PreviousSearches"
import { mockGifs } from "./mock-data/gifs.mock"
import CustomHeader from "./shared/components/CustomHeader"
import SearchBar from "./shared/components/SearchBar"

const GifsApp = () => {
    return (
        <>
            <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el gif perfecto" />
            <SearchBar placeholder="Buscar gifs" />
            <PreviousSearches searches={[]} />
            <GifList gifs={mockGifs} />
        </>
    )
}

export default GifsApp
