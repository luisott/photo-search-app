import React from 'react';
import {  mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import SearchBar, {SearchField} from "./SearchBar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";



it('default rendering with undefined props', () => {
    const wrapper = mount(<SearchBar/>);
    const searchBar = wrapper.find(Button);
    const searchField = wrapper.find(SearchField);
    searchBar.simulate('click');
    expect(searchBar.exists()).toBe(true);
    expect(searchField.props().value).toBeUndefined();
});

it('updates search field and clicking search', () => {
    let newSearchParam = "";

    const wrapper = mount(<SearchBar searchParam={"someText"} onSearchClick={(text) => {newSearchParam = text}}/>);
    const searchBar = wrapper.find(Button);
    const searchField = wrapper.find(SearchField);
    expect(searchBar.exists()).toBe(true);
    expect(searchField.props().value).toBe("someText");

    // Update search text
    act(() => {
        searchField.props().onChange({target: {value: "changedText"}});
        searchBar.simulate('click');
    });

    // TODO: Why isn't this updating
    // expect(newSearchParam).toBe("changedText");

});

