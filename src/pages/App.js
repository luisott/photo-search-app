import React, {useEffect, useState} from "react";
import StyledComponents from "styled-components";
import SearchBar from "../components/SearchBar";
import PropTypes from "prop-types";
import * as Routes from "../Routes";
import * as UIStrings from "../utils/uiStrings";
import TilesContainer from "../components/TilesContainer";

export const AppWrapper = StyledComponents.div`
    height: 100%;
    flex-direction: column;
    display: flex;
`;

const props = {
    match: PropTypes.object.isRequired
};

const App = ({match}) => {

    const [searchTerm, setSearchTerm] = useState(match.params[Routes.SEARCH_PARAM]);

    useEffect(() => {
        const searchText = searchTerm && searchTerm.trim() !== "" ? searchTerm : null;
        if (searchText) {
            document.title = UIStrings.DOCUMENT_TITLE_WITH_SEARCH(searchText);
        } else {
            document.title = UIStrings.DOCUMENT_TITLE_NO_SEARCH;
        }
    });

    const handleSearchClick = async (searchTerm) => {
        // TODO: Update route
        setSearchTerm(searchTerm);
    };

    return (
        <AppWrapper>
            <SearchBar
                searchParam={searchTerm}
                onSearchClick={handleSearchClick}
            />
            <TilesContainer searchText={searchTerm}/>
        </AppWrapper>
    );
};
App.props = props;
export default App;
