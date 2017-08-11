import React from 'react';
import { shallow, mount, render } from 'enzyme';

import {Calendar} from './Calendar';

describe('Calendar Component', () => {
    const CalendarComponent = mount(<Calendar/>);

    it('renders a Calendar', () => {
        expect(CalendarComponent.length).toBe(1);
    });
});


