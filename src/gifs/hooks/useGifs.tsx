import { useRef, useState } from "react"
import type { Gif } from "../interfaces/gif.interface"
import { getGifsByQuery } from "../actions/get-gifs-by-query.action"

// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {

    const [gifs, setGifs] = useState<Gif[]>([])
    const [previousTerms, setpreviousTerms] = useState<string[]>([])

    const gifsCache = useRef<Record<string, Gif[]>>({});

    const handleTermsClicked = async (term: string) => {
        if (gifsCache.current[term]) {
            setGifs(gifsCache.current[term]);
            return;
        }
        const gifs = await getGifsByQuery(term);
        setGifs(gifs);
    }

    const handleSearch = async (query: string = '') => {
        query = query.trim().toLowerCase();
        if (query.length === 0) return;
        if (previousTerms.includes(query)) return;

        setpreviousTerms([query, ...previousTerms].splice(0, 7))

        if (gifsCache.current[query]) {
            setGifs(gifsCache.current[query]);
            return;
        }

        const listGifs = await getGifsByQuery(query);
        setGifs(listGifs);
        gifsCache.current[query] = listGifs;
        console.log(gifsCache.current)
    }

    return { gifs, previousTerms, handleTermsClicked, handleSearch }
}

