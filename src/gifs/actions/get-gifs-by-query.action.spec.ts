import { beforeEach, describe, expect, test, vi } from "vitest";
import AxiosMockAdapter from 'axios-mock-adapter';
import { getGifsByQuery } from "./get-gifs-by-query.action";
import { giphyApi } from "../api/giphy.api";

describe('getGifsByQuery', () => {

    let mock = new AxiosMockAdapter(giphyApi);

    beforeEach(() => {
        mock = new AxiosMockAdapter(giphyApi)
    })

    // test('should return a list of gifs', async () => {
    //     const gifs = await getGifsByQuery('princess');
    //     console.log(gifs)
    //     const [gif1] = gifs;

    //     expect(gif1).toEqual({
    //         id: expect.any(String),
    //         height: expect.any(Number),
    //         width: expect.any(Number),
    //         title: expect.any(String),
    //         url: expect.any(String)
    //     })
    // })

    test('should return an empty list of gifs if query is empty', async () => {
        const gifs = await getGifsByQuery('');
        expect(gifs.length).toBe(0);
    })

    test('should handle error when the API returns an error', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
        mock.onGet('/search').reply(400, {
            data: {
                message: 'Bad Request'
            }
        })

        const gifs = await getGifsByQuery('goku');
        expect(gifs.length).toBe(0);
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
    })
}) 