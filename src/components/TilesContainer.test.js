import React from 'react';
import {  shallow, mount } from 'enzyme';
import TilesContainer, {CenteredLoading, TilesContainerWrapper} from "./TilesContainer";
import ImageTile from "../components/ImageTile";
import InfiniteScroll from 'react-infinite-scroller';


window.matchMedia = jest.fn().mockImplementation(query => {
    return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
    };
});

it('default rendering', () => {
    const wrapper = shallow(<TilesContainer searchText="searchText"/>);
    const infiniteScroll = wrapper.find(InfiniteScroll);
    const loading = wrapper.find(CenteredLoading);
    expect(infiniteScroll.exists()).toBe(false);
    expect(loading.exists()).toBe(true);
});

describe("when images to show and no more pages", () => {

    const mockSuccessResponse = {
        photos: {
            results: [
                {
                    id: "1",
                    created_at: "date 1",
                    urls: {
                        thumb: "img1.jpg"
                    }
                },
                {
                    id: "2",
                    created_at: "date 2",
                    urls: {
                        thumb: "img2.jpg"
                    }
                },
                {
                    id: "3",
                    created_at: "date 3",
                    urls: {
                        thumb: "img3.jpg"
                    }
                }
            ],
            total: 3
        }
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });

    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    });

    afterEach(() => {
        global.fetch.mockClear();
    });

    // TODO: Re-enable when props in children are updated
    xit('renders right amount of tiles', (done) => {
        const wrapper = mount(<TilesContainer searchText="searchText"/>);
        const mainContent = wrapper.find(InfiniteScroll);
        wrapper.update();
        process.nextTick(() => {
            // expect(mainContent.exists()).toBe(true);
            // expect(mainContent.props().hasMore).toBe(false);
            // const tilesContainer = wrapper.find(TilesContainerWrapper);
            // expect(tilesContainer.length).toBe(1);
            // const imageTiles = wrapper.find(ImageTile);
            // expect(imageTiles.length).toBe(3);
            done();
        });
    });

    // TODO: Test height is set right (getColumnHeightToFitMostTilesForXColumns)
    // TODO: Test more pages available
    // TODO: Test showing second page of elements
    // TODO: Test no results found
});


