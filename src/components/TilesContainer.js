import React, {useEffect, useState} from "react";
import StyledComponents from "styled-components";
import PropTypes from "prop-types";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTransition, animated } from 'react-spring';
import InfiniteScroll from 'react-infinite-scroller';
import {getImages} from "../utils/queries";
import ImageTile, {MARGIN_PX} from "../components/ImageTile";
import useMedia from "../hooks/useMedia";
import * as UIStrings from "../utils/uiStrings";


const TILES_WIDTH_NON_MOBILE_PX = 400;
const TILE_HORIZONTAL_SPACE = MARGIN_PX + TILES_WIDTH_NON_MOBILE_PX;
const MIN_LARGE_SIZE_PX = 1400; // Less than this will be 3 columns or less
const MIN_MEDIUM_SIZE_PX = 850; // Less than this will be 2 columns or less
const MIN_SMALL_SIZE_PX = 550; // // Less than this will be 1 column
const IMAGES_PER_PAGE = 20;
const LAZY_LOADER_HEIGHT_PX = 200;

const COLUMNS_FOR_LARGE_SIZE = Math.floor(MIN_LARGE_SIZE_PX / TILE_HORIZONTAL_SPACE);
const COLUMNS_FOR_MEDIUM_SIZE = Math.floor(MIN_MEDIUM_SIZE_PX / TILE_HORIZONTAL_SPACE);
const COLUMNS_FOR_SMALL_SIZE = Math.floor(MIN_SMALL_SIZE_PX / TILE_HORIZONTAL_SPACE);

const getSearchTerm = (searchText) => {
    return searchText && searchText.trim() !== "" ? searchText : null;
};

export const TilesContainerWrapper = StyledComponents.div`
    display: flex;
    flex-direction: column;
    height: ${({height}) => height};
    flex-wrap: wrap;
    width: 100%;
    align-content: center;
}
`;

const ColumnsContainer = StyledComponents.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const ScrollArea = StyledComponents.div`
    overflow: auto;
`;

export const CenteredLoading = StyledComponents.div`
    align-items: center;
    display: flex;
    justify-content: center;
    height: ${({height}) => height ? height + "px" : "100%"};
`;

const NoResultsFoundWrapper = StyledComponents.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const props = {
    searchText: PropTypes.string
};

const TilesContainer = ({searchText}) => {

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalImages, setTotalImages] = useState(0);
    const numberColumns = useMedia(
        [`(min-width: ${MIN_LARGE_SIZE_PX}px)`, `(min-width: ${MIN_MEDIUM_SIZE_PX}px)`, `(min-width: ${MIN_SMALL_SIZE_PX}px)`],
        [COLUMNS_FOR_LARGE_SIZE, COLUMNS_FOR_MEDIUM_SIZE, COLUMNS_FOR_SMALL_SIZE], 1);

    const transitions = useTransition(Object.values(images), item => item.id, {
        from: { opacity: 0, transform: 'scale(0)' },
        enter: { opacity: 1, transform: 'scale(1)' },
        leave: { visibility: "hidden" }
    });

    useEffect(() => {
        fetchDataAndUpdateImages(searchText);
    }, [searchText]);

    const fetchDataAndUpdateImages = async (searchTerm, page = 1) => {
        const search = getSearchTerm(searchTerm);

        if (search) {
            try {
                const {results, total} = await getImages(search, IMAGES_PER_PAGE, page);
                if (page > 1) {
                    setImages([...images, ...results]);
                } else {
                    setImages(results);
                }
                setLoading(false);
                setTotalImages(total);
            } catch (e) {
                // TODO: Handle error
                console.log(`Error: ${e}`);
            }
        }
    };

    const getColumnHeightToFitMostTilesForXColumns = (listOfImages) => {
        const tilesHeightForWidth = listOfImages.map((image) => TILES_WIDTH_NON_MOBILE_PX * image.item.height / image.item.width);
        const totalHeight = tilesHeightForWidth.reduce((accumulator, value) => accumulator + value + MARGIN_PX * 2, 0);
        // This 400 magic number seems to work good to distribute tiles evenlyish
        return `${totalHeight / (numberColumns) + 300}px`;
    };

    const renderPageOfTiles = (page) => {
        const imagesToShowInPage = transitions.slice(page * IMAGES_PER_PAGE, page * IMAGES_PER_PAGE + IMAGES_PER_PAGE);
        return (
            <TilesContainerWrapper
                key={page}
                height={numberColumns > 1 ? getColumnHeightToFitMostTilesForXColumns(imagesToShowInPage) : "100%"}
            >
                {
                    imagesToShowInPage
                        .map(({ item, props, key }) =>
                            <animated.div key={key} style={props}>
                                <ImageTile
                                    width={numberColumns > 1 ? `${TILES_WIDTH_NON_MOBILE_PX}px` : null}
                                    key={item.key}
                                    imageProps={item}
                                />
                            </animated.div>
                        )
                }
            </TilesContainerWrapper>
        );
    };

    const renderLoader = (height) => {
        return (
            <CenteredLoading height={height}>
                <CircularProgress/>
            </CenteredLoading>
        )
    };

    const currentPagesShown =  Math.ceil(images.length / IMAGES_PER_PAGE);
    const pagesToIterateTrough = [...Array(currentPagesShown)];
    const pageOfTiles = pagesToIterateTrough.map((element, index) => renderPageOfTiles(index));

    if (loading) {
        return renderLoader();
    }
    if (getSearchTerm(searchText) && images.length === 0) {
        return (
            <NoResultsFoundWrapper>{UIStrings.NO_RESULT_FOUND(searchText)}</NoResultsFoundWrapper>
        );
    }
    return (
        <ScrollArea>
            <InfiniteScroll
                useWindow={false}
                initialLoad={true}
                pageStart={0}
                loadMore={() => fetchDataAndUpdateImages(searchText, currentPagesShown + 1)}
                hasMore={images.length < totalImages}
                loader={renderLoader(LAZY_LOADER_HEIGHT_PX)}
            >
                <ColumnsContainer>
                    {pageOfTiles}
                </ColumnsContainer>
            </InfiniteScroll>
        </ScrollArea>
    );
};
TilesContainer.props = props;
export default TilesContainer;
