import React from 'react';
import {  shallow } from 'enzyme';
import App from './App';
import SearchBar from "../components/SearchBar";
import TilesContainer from "../components/TilesContainer";
import * as UIStrings from "../utils/uiStrings";
import * as Routes from "../Routes";

const matchCommon = {
  params: {}
};

it('default rendering when no searchText', () => {
  const wrapper = shallow(<App match={matchCommon}/>);
  const searchBar = wrapper.find(SearchBar);
  const container = wrapper.find(TilesContainer);
  expect(searchBar.exists()).toBe(true);
  expect(container.exists()).toBe(true);
  expect(searchBar.props().searchParam).toBeUndefined();
  expect(container.props().searchText).toBeUndefined();
});

it('rendering when mounted with searchParam', () => {
  const expectedSearchParam = "someSearchParam";
  const match = {
    params: {
      [Routes.SEARCH_PARAM]: expectedSearchParam
    }
  };
  const wrapper = shallow(<App match={match}/>);
  const searchBar = wrapper.find(SearchBar);
  const container = wrapper.find(TilesContainer);
  expect(searchBar.exists()).toBe(true);
  expect(container.exists()).toBe(true);
  expect(searchBar.props().searchParam).toBe(expectedSearchParam);
  expect(container.props().searchText).toBe(expectedSearchParam);
});

