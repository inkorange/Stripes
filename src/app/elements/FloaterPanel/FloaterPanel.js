import React from 'react'
import { render } from 'react-dom'

//style
const style = require('../../themes/GlobalStyles').FloaterPanel;

const FloaterPanel = React.createClass({

    contextTypes: {
        location: React.PropTypes.object,
        history: React.PropTypes.object
    },

    getInitialState: function() {
        return {
            presentationClass: ''
        };
    },

    _toggleShow: function(showing) {
        if(showing) {
            $(this.refs.FloaterBase).show();
        } else {
            $(this.refs.FloaterBase).hide();
        }
        //console.log(this.refs.FloaterBase);
    },

    componentWillUpdate: function(a,b) {
    },

    render() {
        var headerDOM = this.props.header ? (
            <header style={style.contentNORMAL.header}>{this.props.header}</header>
        ) : null;

        this._toggleShow(this.props.open);

        var baseStyle = this.mergeStyles(style.overlayNORMAL, this.props.baseStyle);
        baseStyle = this.mergeStyles(baseStyle, {display: this.props.open ? "block" : "none"});
        var contentStyle = (window.breakpoint.name  === 'small' || window.breakpoint.name  === 'xsmall') ? style.contentSMALL : style.contentNORMAL;
        contentStyle = this.mergeStyles(contentStyle, this.props.contentStyle);
        var bodyStyle = (window.breakpoint.name  === 'small' || window.breakpoint.name  === 'xsmall') ? style.contentSMALL.body : style.contentNORMAL.body;
        bodyStyle = this.mergeStyles(bodyStyle, this.props.bodyStyle);
        return (

                <div ref="FloaterBase" className={"FloaterBase " + (this.props.open ? 'show' : '')} style={baseStyle}>
                    <article style={contentStyle} ref="FloaterPanel" className={"FloaterPanel " + this.props.className + " " + (this.props.open ? 'show' : '')}>
                        {headerDOM}
                        <section className="floater_body" style={bodyStyle}>
                            {this.props.children}
                        </section>
                    </article>
                </div>

        )
    }
});

module.exports = FloaterPanel;
