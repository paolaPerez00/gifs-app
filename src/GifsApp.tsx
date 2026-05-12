import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { useGifs } from "./gifs/hooks/useGifs"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"

export const GifsApp = () => {

    const { gifs, previousTerms, handleSearch, handleTermsClicked } = useGifs();

    return (
        <>
            <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el gif perfecto" />
            <SearchBar
                placeholder="Buscar gifs"
                onQuery={handleSearch}
            />
            <PreviousSearches
                searches={previousTerms}
                onLabelClicked={handleTermsClicked}
            />
            <GifList gifs={gifs} />
        </>
    )
}