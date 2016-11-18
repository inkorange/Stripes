import React from 'react'
import { render } from 'react-dom'

// elements
const MainContent =     require('./MainContent');

const MainLayout = React.createClass({

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