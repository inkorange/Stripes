import React from 'react'
import { render } from 'react-dom'

import { Stripes } from 'zebra-stripes/Core/Stripes'
import {H1, H2, H3, Title, A} from 'zebra-stripes/Typography'
// elements
const MainContent =     require('./MainContent');

var hstyle = {
    topHeader: {
        background: 'transparent',
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        padding: "20px",
        zIndex: 10,
        boxShadow: '0 5px 10px rgba(0,0,0,0)'
    },
    topHeaderCondensed: {
        background: 'white',
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        padding: "10px",
        zIndex: 10,
        boxShadow: '0 5px 10px rgba(0,0,0,.25)'
    },
    image: {
        height: '85px',
        transition: 'all .5s'
    },
    imageCondensed: {
        height: '50px',
        transition: 'all .5s'
    },
    topMenu: {
        position: 'absolute',
        right: '0',
        top: '30px',
        zIndex: '1',
        transition: 'top .5s'
    },
    topMenuCondensed: {
        position: 'absolute',
        right: '0',
        top: '12px',
        zIndex: '1',
        transition: 'top .5s'
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
            condensed: false
        }
    },

    componentDidMount() {
        window.addEventListener('scroll', this._handleTopNav);
    },

    _handleTopNav(e) {
        this.setState({
            condensed: (window.scrollY > 50)
        });
    },

    render() {
        return (
            <MainContent>
                <header style={this.state.condensed ? hstyle.topHeaderCondensed : hstyle.topHeader}>
                    <img src="./images/zstripes.png" style={this.state.condensed ? hstyle.imageCondensed : hstyle.image} />
                    <ul style={this.state.condensed ? hstyle.topMenuCondensed : hstyle.topMenu}>
                        <li key="menu_2" style={hstyle.topMenuItem}><A href="/components">Components</A></li>
                        <li key="menu_1" style={hstyle.topMenuItem}><A href="/">Introduction</A></li>
                    </ul>
                </header>
                {React.cloneElement(this.props.children, { menuOpen: this.state.leftnavopen, condensed: this.state.condensed })}
                <footer className="zebra" style={{zIndex: 1000, display: 'none'}}>
                    <img src="./images/zebralogo.svg" />
                    <p>&copy;2017 ZIH Corp and/or its affiliates. All Rights Reserved. Zebra and the stylized Zebra head are trademarks of ZIH Corp, registered in many jurisdictions worldwide.</p>
                </footer>
            </MainContent>
        )
    }
 
});

module.exports = MainLayout;