import { useState } from "react"
import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"

export const GifsApp = () => {

    const [previousTerms, setpreviousTerms] = useState(['goku'])

    const handleTermsClicked = (term: string) => {
        console.log({ term })
    }

    const handleSearch = (query: string) => {
        console.log("view ", query)
    }

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
            <GifList gifs={mockGifs} />
        </>
    )
}