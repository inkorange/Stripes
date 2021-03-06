import React from 'react'
import { browserHistory} from 'react-router';
import { Route, Switch } from 'react-router-dom'

const StripesDemo = require('../controllers/StripesDemo');
const Intro = require('../controllers/Intro');
import { Stripes } from 'zebra-stripes/Core/Stripes'
import {H1, H2, H3, Title, A} from 'zebra-stripes/Typography'
// elements
import {MainContent} from './MainContent'

var hstyle = {
    topHeader: {
        background: 'white',
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        padding: "20px 20px 15px 20px",
        zIndex: 10,
        boxShadow: '0 5px 10px rgba(0,0,0,0)',
        transition: 'all .5s'
    },
    topHeaderCondensed: {
        background: 'white',
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        padding: "10px 25px 5px 25px",
        zIndex: 10,
        boxShadow: '0 5px 10px rgba(0,0,0,.25)',
        transition: 'all .5s'
    },
    image: {
        height: '80px',
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
        top: '10px',
        zIndex: '1',
        transition: 'top .5s'
    },
    topMenuItem: {
        display: 'inline-block',
        float: 'right',
        padding: '0 20px'
    }
};

export class MainLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            condensed: false
        }
        this._checkChillTime = new Date().getTime();
        this._chillTimeout = null;
        this._handleTopNav = this._handleTopNav.bind(this);
    }

    chill(timer, callback) {
        if (new Date().getTime() > (this._checkChillTime + timer)) {
            clearTimeout(this._chillTimeout);
            this._chillTimeout = setTimeout(() => {
                callback();
            }, timer);
        } else {
            clearTimeout(this._chillTimeout);
            this._checkChillTime = new Date().getTime();
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            this.chill(200, this._handleTopNav);
        });
    }

    _handleTopNav() {
        this.setState({
            condensed: (window.scrollY > 60)
        });
    }

    render() {
        return (
            <MainContent>
                <header style={this.state.condensed ? hstyle.topHeaderCondensed : hstyle.topHeader}>
                    <img src="./images/zstripes.png" style={this.state.condensed ? hstyle.imageCondensed : hstyle.image} />
                    <ul style={this.state.condensed ? hstyle.topMenuCondensed : hstyle.topMenu}>
                        <li key="menu_2" style={hstyle.topMenuItem}><A href="/components">Components</A></li>
                        <li key="menu_1" style={hstyle.topMenuItem}><A href="/home">Introduction</A></li>
                    </ul>
                </header>
                <Switch>
                    <Route exact path="/home" component={Intro} />
                    <Route exact path="/components" component={StripesDemo} />
                </Switch>
                <footer className="zebra" style={{zIndex: 1000, display: 'none'}}>
                    <img src="./images/zebralogo.svg" />
                    <p>&copy;2017 ZIH Corp and/or its affiliates. All Rights Reserved. Zebra and the stylized Zebra head are trademarks of ZIH Corp, registered in many jurisdictions worldwide.</p>
                </footer>
            </MainContent>
        )
    }
 
}