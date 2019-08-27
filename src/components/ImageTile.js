import React from "react";
import PropTypes from "prop-types";
import StyledComponents from 'styled-components';

export const MARGIN_PX = 10;

const TileContainer = StyledComponents.div`
    max-width: ${({width}) => width};
    width: ${({width}) => width};
    cursor: pointer;
    height: fit-content;
    margin: ${MARGIN_PX}px;
`;

const ImageElement = StyledComponents.img`
    width: 100%;
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
        }),
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
    const {urls} = imageProps;
    return (
        <TileContainer width={width}>
           <ImageElement src={urls.regular}/>
        </TileContainer>
    );
};

ImageTile.props = props;
ImageTile.defaultProps = defaultProps;
export default ImageTile;


// "id":"Z_6WbbEPwqw",
//     "created_at":"2019-01-09T15:57:50-05:00",
//     "updated_at":"2019-05-28T01:05:40-04:00",
//     "width":3024,
//     "height":3780,
//     "color":"#29211C",
//     "description":"DETAILS",
//     "alt_description":"low angle photography of building",
//     "urls":{
//     "raw":"https://images.unsplash.com/photo-1547067387-5b96393f56d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
//         "full":"https://images.unsplash.com/photo-1547067387-5b96393f56d5?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyMDd9",
//         "regular":"https://images.unsplash.com/photo-1547067387-5b96393f56d5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9",
//         "small":"https://images.unsplash.com/photo-1547067387-5b96393f56d5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9",
//         "thumb":"https://images.unsplash.com/photo-1547067387-5b96393f56d5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9"
// },
// "links":{
//     "self":"https://api.unsplash.com/photos/Z_6WbbEPwqw",
//         "html":"https://unsplash.com/photos/Z_6WbbEPwqw",
//         "download":"https://unsplash.com/photos/Z_6WbbEPwqw/download",
//         "download_location":"https://api.unsplash.com/photos/Z_6WbbEPwqw/download"
// },
// "categories":[
//
// ],
//     "likes":8,
//     "liked_by_user":false,
//     "current_user_collections":[
//
// ],
//     "user":{
//     "id":"dnyv3_Cpysk",
//         "updated_at":"2019-08-24T23:17:45-04:00",
//         "username":"francescoghilardiphoto",
//         "name":"francesco ghilardi",
//         "first_name":"francesco",
//         "last_name":"ghilardi",
//         "twitter_username":null,
//         "portfolio_url":null,
//         "bio":null,
//         "location":"milan",
//         "links":{
//         "self":"https://api.unsplash.com/users/francescoghilardiphoto",
//             "html":"https://unsplash.com/@francescoghilardiphoto",
//             "photos":"https://api.unsplash.com/users/francescoghilardiphoto/photos",
//             "likes":"https://api.unsplash.com/users/francescoghilardiphoto/likes",
//             "portfolio":"https://api.unsplash.com/users/francescoghilardiphoto/portfolio",
//             "following":"https://api.unsplash.com/users/francescoghilardiphoto/following",
//             "followers":"https://api.unsplash.com/users/francescoghilardiphoto/followers"
//     },
//     "profile_image":{
//         "small":"https://images.unsplash.com/profile-1547068333336-464e28d8ec9c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
//             "medium":"https://images.unsplash.com/profile-1547068333336-464e28d8ec9c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
//             "large":"https://images.unsplash.com/profile-1547068333336-464e28d8ec9c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
//     },
//     "instagram_username":"francescoghilardii",
//         "total_collections":0,
//         "total_likes":0,
//         "total_photos":5,
//         "accepted_tos":true
// },
// "tags":[
//     {
//         "title":"portugal"
//     },
//     {
//         "title":"porto"
//     },
//     {
//         "title":"outdoors"
//     },
//     {
//         "title":"azure sky"
//     },
//     {
//         "title":"sky"
//     },
//     {
//         "title":"nature"
//     },
//     {
//         "title":"building"
//     },
//     {
//         "title":"rotunda da boavista / pra\u00e7a mouzinho de albuquerque"
//     },
//     {
//         "title":"architecture"
//     },
//     {
//         "title":"office building"
//     },
//     {
//         "title":"casa"
//     },
//     {
//         "title":"musica"
//     },
//     {
//         "title":"particular"
//     },
//     {
//         "title":"detail"
//     },
//     {
//         "title":"clouds"
//     },
//     {
//         "title":"infrastructure"
//     },
//     {
//         "title":"air"
//     },
//     {
//         "title":"day"
//     },
//     {
//         "title":"pic"
//     },
//     {
//         "title":"trip"
//     }
// ]
// },