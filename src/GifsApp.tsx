import { useState } from "react"
import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action"
import type { Gif } from './gifs/interfaces/gif.interface';

export const GifsApp = () => {

    const [gifs, setGifs] = useState<Gif[]>([])
    const [previousTerms, setpreviousTerms] = useState<string[]>([])

    const handleTermsClicked = (term: string) => {
        console.log({ term })
    }

    const handleSearch = async (query: string) => {
        query = query.trim().toLowerCase();
        if (query.length === 0) return;
        if (previousTerms.includes(query)) return;

        setpreviousTerms([query, ...previousTerms].splice(0, 7))

        const listGifs = await getGifsByQuery(query);
        setGifs(listGifs);
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
            <GifList gifs={gifs} />
        </>
    )
}