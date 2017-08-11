import React from 'react';
import { shallow, mount, render } from 'enzyme';

import {FlatButton} from './Buttons'

describe('Button Components', () => {
    const FlatButtonComponent = mount(<FlatButton>Hello</FlatButton>);

    it('renders a FlatButton', () => {
        expect(FlatButtonComponent.length).toBe(1);
        expect(FlatButtonComponent.text()).toBe("Hello");
    });
});


