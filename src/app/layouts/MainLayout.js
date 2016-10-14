import React from 'react'
import { render } from 'react-dom'

// material themes
import GlobalStyles from '../themes/GlobalStyles';

// elements
const MainContent =     require('./MainContent');

const MainLayout = React.createClass({

    getDefaultProps: function () {
        return {
            GlobalStyles: GlobalStyles
        };
    },

    getInitialState: function() {
        return {
        }
    },

    render() {
        return (
            <MainContent>
                {React.cloneElement(this.props.children, { menuOpen: this.state.leftnavopen })}
            </MainContent>
        )
    }
 
});

module.exports = MainLayout;