import React, {useState} from "react";
import PropTypes from "prop-types";
import StyledComponents from 'styled-components';
import Button from "@material-ui/core/Button";
import ImageStats from "./ImageStats";
import useHover from "../hooks/useHover";
import * as UIStrings from "../utils/uiStrings";


export const MARGIN_PX = 10;

const TileContainer = StyledComponents.div`
    max-width: ${({width}) => width};
    width: ${({width}) => width};
    cursor: pointer;
    height: fit-content;
    margin: ${MARGIN_PX}px;
`;

export const ImageElement = StyledComponents.img`
    width: 100%;
`;

export const StatsContainer = StyledComponents.div`
    position: absolute;
    height: 100%;
    width: calc(100% - 40px);
    background-color: white;
    opacity: 0.9;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const HoverContainer = StyledComponents.div`
    position: absolute;
    height: 100%;
    width: calc(100% - 40px);
    background-color: white;
    opacity: 0.7;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const props = {
    widthPx: PropTypes.number,
    imageProps: PropTypes.shape({
        id: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        width: PropTypes.number,
        height: PropTypes.number,
        description: PropTypes.string,
        alt_description: PropTypes.string,
        urls: PropTypes.shape({
            raw: PropTypes.string,
            thumb: PropTypes.string.isRequired
        }).isRequired,
        likes: PropTypes.number,
        user: PropTypes.shape({
            id: PropTypes.string,
            username: PropTypes.string,
            name: PropTypes.string,
            location: PropTypes.string,
            links: PropTypes.shape({
                photos: PropTypes.string
            }),
            profile_image: PropTypes.shape({
                small: PropTypes.string
            })

        }),
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string
            }))
    }).isRequired

};

const defaultProps = {
    width: "100%"
};


const ImageTile = ({imageProps, width}) => {

    const [statsShown, setStatsShown] = useState(false);
    const [hoverRef, hovered] = useHover();

    const handleTileClick = () => {
        setStatsShown(!statsShown);
    };

    const {urls, id} = imageProps;
    return (
        <TileContainer
            ref={hoverRef}
            width={width}
            onClick={handleTileClick}
        >
            {
                statsShown &&
                <StatsContainer>
                    <ImageStats id={id}/>
                </StatsContainer>
            }
            {
                hovered && !statsShown &&
                <HoverContainer>
                    <Button
                        variant="outlined"
                        color="primary"
                    >
                        {UIStrings.CLICK_ON_IMAGE_TO_SEE_STATS}
                    </Button>
                </HoverContainer>
            }
            <ImageElement src={urls.regular}/>
        </TileContainer>
    );
};

ImageTile.props = props;
ImageTile.defaultProps = defaultProps;
export default ImageTile;