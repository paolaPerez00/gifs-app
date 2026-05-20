import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import * as gifActions from "../actions/get-gifs-by-query.action";

describe('useGifs', () => {
    test('should return default values and methods', () => {
        const { result } = renderHook(() => useGifs());
        expect(result.current.gifs.length).toBe(0);
        expect(result.current.previousTerms.length).toBe(0);
        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handleTermsClicked).toBeDefined();
    })

    test('should return a list of gifs', async () => {
        const { result } = renderHook(() => useGifs());
        await act(async () => {
            await result.current.handleSearch('goku');
        })
        result.current.handleSearch('goku');
        expect(result.current.gifs.length).toBe(10);
    })

    test('should return a list of gifs when handleTermClicked is called', async () => {
        const { result } = renderHook(() => useGifs());
        await act(async () => {
            await result.current.handleTermsClicked('goku');
        })
        expect(result.current.gifs.length).toBe(10);
    })

    test('should return a list of gifs from cache', async () => {
        const { result } = renderHook(() => useGifs());
        await act(async () => {
            await result.current.handleTermsClicked('goku');
        })
        vi.spyOn(gifActions, 'getGifsByQuery');
        expect(result.current.gifs.length).toBe(10);
        vi.spyOn(gifActions, 'getGifsByQuery').mockRejectedValue(
            new Error('This is my custom error')
        );
        await act(async () => {
            await result.current.handleTermsClicked('goku');
        })
        expect(result.current.gifs.length).toBe(10);
    })

    test('should return no more than 4 previous terms', async () => {
        const { result } = renderHook(() => useGifs());
        vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]);
        await act(async () => {
            await result.current.handleSearch('goku1');
        })
        await act(async () => {
            await result.current.handleSearch('goku2');
        })
        await act(async () => {
            await result.current.handleSearch('goku3');
        })
        await act(async () => {
            await result.current.handleSearch('goku4');
        })

        expect(result.current.previousTerms.length).toBe(4);
    })
})