import React, {useEffect, useState} from "react";
import StyledComponents from "styled-components";
import SearchBar from "../components/SearchBar";
import PropTypes from "prop-types";
import {ROUTES} from "../index";
import * as UIStrings from "../utils/uiStrings";
import TilesContainer from "../components/TilesContainer";

export const MyWrapperDiv = StyledComponents.div`
  background-color: red;
  height: 50px;
  width: 50px;
`;

const props = {
    match: PropTypes.object
};

const App = ({match}) => {

    const [searchTerm, setSearchTerm] = useState(match.params[ROUTES.SEARCH_PARAM]);

    useEffect(() => {
        const searchText = searchTerm && searchTerm.trim() !== "" ? searchTerm : null;
        // Update the document title using the browser API
        if (searchText) {
            document.title = UIStrings.DOCUMENT_TITLE_WITH_SEARCH(searchText);
        } else {
            document.title = UIStrings.DOCUMENT_TITLE_NO_SEARCH;
        }
    });

    useEffect(() => {
        setSearchTerm(match.params[ROUTES.SEARCH_PARAM]);
    }, [match]);

    const handleSearchClick = async (searchTerm) => {
        // TODO: Update route
        setSearchTerm(searchTerm);
    };

    // TODO: Show a no results to show
    return (
        <React.Fragment>
            <SearchBar
                searchParam={searchTerm}
                onSearchClick={handleSearchClick}
            />
            <TilesContainer searchText={searchTerm}/>
        </React.Fragment>
    );
};
App.props = props;
export default App;
