import React, {useEffect, useState} from "react";
import StyledComponents from "styled-components";
import PropTypes from "prop-types";
import { useTransition, animated } from 'react-spring'
import {getImages} from "../utils/queries";
import ImageTile, {MARGIN_PX} from "../components/ImageTile";
import useMedia from "../hooks/useMedia";

const TILES_WIDTH_NON_MOBILE_PX = 400;
const TILE_HORIZONTAL_SPACE = MARGIN_PX * 2 + TILES_WIDTH_NON_MOBILE_PX;

const getSearchTerm = (searchText) => {
    return searchText && searchText.trim() !== "" ? searchText : null;
};

const TilesContainerWrapper = StyledComponents.div`
    display: flex;
    flex-direction: column;
    height: ${({height}) => height};
    flex-wrap: wrap;
    width: 100%;
    align-content: center;
`;

const ColumnsContainer = StyledComponents.div`
    display: flex;    
`;

const props = {
    searchText: PropTypes.string
};

const TilesContainer = ({searchText}) => {

    const [images, setImages] = useState([]);

    const numberColumns = useMedia(
        [`(min-width: 1500px)`, '(min-width: 850px)', '(min-width: 600px)'],
        [
            Math.round(1500 / TILE_HORIZONTAL_SPACE),
            Math.round(850 / TILE_HORIZONTAL_SPACE),
            Math.round(600 / TILE_HORIZONTAL_SPACE)
        ], 1);

    const transitions = useTransition(images, item => item.id, {
        from: { opacity: 0, transform: 'scale(0)' },
        enter: { opacity: 1, transform: 'scale(1)' },
        leave: { visibility: "hidden" }
    });

    useEffect(() => {
        fetchDataAndUpdateImages(searchText);
    }, [searchText]);

    const fetchDataAndUpdateImages = async (searchTerm) => {
        const search = getSearchTerm(searchTerm);
        if (search) {
            try {
                // TODO: Use total, totalPages
                const {results} = await getImages(search);
                setImages(results);
            } catch (e) {
                // TODO: Handle error
                console.log(`Error: ${e}`);
            }
        }
    };

    const getColumnHeightToFitMostTilesForXColumns = () => {
        const tilesHeightForWidth = images.map((image) => TILES_WIDTH_NON_MOBILE_PX * image.height / image.width);
        const totalHeight = tilesHeightForWidth.reduce((accumulator, value) => accumulator + value, 0);
        // This 400 magic number seems to work good to distribute tiles evenlyish
        return `${totalHeight / (numberColumns) + 400}px`;
    };

    // TODO: Show a no results to show
    return (
        <ColumnsContainer>
            <TilesContainerWrapper height={numberColumns > 1 ? getColumnHeightToFitMostTilesForXColumns() : "100%"}>
                {
                    transitions.map(({ item, props, key }) =>
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
        </ColumnsContainer>
    );
};
TilesContainer.props = props;
export default TilesContainer;
