import React from 'react'
import { render } from 'react-dom'

import { Stripes } from 'zebra-stripes/Core/Stripes'
import {H1, H2, H3, Title, A} from 'zebra-stripes/Typography'
// elements
const MainContent =     require('./MainContent');

var hstyle = {
    topHeader: {
        background: 'white',
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        padding: "10px 20px 0 20px",
        zIndex: 10,
        boxShadow: '0 5px 10px rgba(0,0,0,.25)'
    },
    topMenu: {
        display: 'inline-block',
        float: 'right'
    },
    topMenuItem: {
        display: 'inline-block',
        float: 'right',
        padding: '0 20px'
    }
};

const MainLayout = React.createClass({

    getInitialState: function() {
        return {
        }
    },

    render() {
        return (
            <MainContent>
                <header style={hstyle.topHeader}>
                    <img src="./images/zstripes.png" style={{height: '75px'}} />
                    <ul style={hstyle.topMenu}>
                        <li key="menu_2" style={hstyle.topMenuItem}><A href="/components">Components</A></li>
                        <li key="menu_1" style={hstyle.topMenuItem}><A href="/">Introduction</A></li>
                    </ul>
                </header>
                {React.cloneElement(this.props.children, { menuOpen: this.state.leftnavopen })}
                <footer className="zebra" style={{zIndex: 1000}}>
                    <img src="./images/zebralogo.svg" />
                    <p>&copy;2017 ZIH Corp and/or its affiliates. All Rights Reserved. Zebra and the stylized Zebra head are trademarks of ZIH Corp, registered in many jurisdictions worldwide.</p>
                </footer>
            </MainContent>
        )
    }
 
});

module.exports = MainLayout;