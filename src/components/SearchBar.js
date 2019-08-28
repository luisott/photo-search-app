import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from  "@material-ui/core/InputAdornment";
import StyledComponents from 'styled-components';
import PropTypes from "prop-types";

import * as UIStrings from "../utils/uiStrings";

const SearchFieldContainer = StyledComponents.div`
    display: flex;
    justify-content: center;
    padding: 20px 10px;
`;

export const SearchField = StyledComponents(TextField)`
    width: 100%;
    max-width: 600px;
`;

const props = {
    searchParam: PropTypes.text,
    onSearchClick: PropTypes.func
};


const SearchBar = ({searchParam, onSearchClick}) => {

    const [searchText, setSearchText] = useState(searchParam);

    const handleChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearchClick = () => {
        onSearchClick && onSearchClick(searchText);
    };

    return (
        <SearchFieldContainer>
            <SearchField
                type="text"
                variant="outlined"
                label={UIStrings.SEARCH_LABEL}
                value={searchText}
                onChange={handleChange}
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                        ev.preventDefault();
                        handleSearchClick()
                    }
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSearchClick}
                            >
                               {UIStrings.SEARCH_BUTTON_LABEL}
                            </Button>
                        </InputAdornment>
                    )
                }}
            >
            </SearchField>
        </SearchFieldContainer>
    );
};

SearchBar.props = props;
export default SearchBar;
