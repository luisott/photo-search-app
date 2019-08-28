import React from 'react';
import {  shallow } from 'enzyme';
import { Line } from 'react-chartjs-2';
import ImageStats, {CenteredLoading} from "./ImageStats";

it('default rendering', () => {
    const wrapper = shallow(<ImageStats id="someId"/>);
    const centeredLoading = wrapper.find(CenteredLoading);
    const lineChart = wrapper.find(Line);
    expect(centeredLoading.exists()).toBe(true);
    expect(lineChart.exists()).toBe(false);
});

