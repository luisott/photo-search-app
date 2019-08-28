import React from 'react';
import {  shallow } from 'enzyme';
import ImageTile, {StatsContainer, ImageElement} from "./ImageTile";

const IMAGE_PROPS = {
    id: "someID",
    created_at: "adasdasd",
    urls: {
        thumb: "someImage.jpg"
    }
};

it('default rendering', () => {
    const wrapper = shallow(<ImageTile imageProps={IMAGE_PROPS}/>);
    const imageElement = wrapper.find(ImageElement);
    const statsContainer = wrapper.find(StatsContainer);
    expect(imageElement.exists()).toBe(true);
    expect(statsContainer.exists()).toBe(false);
});

