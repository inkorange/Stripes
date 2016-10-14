import React from "react";

//style
const style = require('../../themes/GlobalStyles');

var Alert = React.createClass({

    getInitialState: function() {
        return {
            alive: true
        };
    },

    getDefaultProps: function() {
        return {
            onClick: function(e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };
    },

    componentDidMount: function() {
        var $Alert = $(this.refs.Alert);
        $Alert.on("transitionend", () => {
            if($Alert.css("opacity") == 0) {
                $Alert.hide();
            }
        });
    },

    render() {
        var $Alert = $(this.refs.Alert);
        var $parent = $Alert.parent();
        if(this.props.show) {
            $Alert.show();
        }
        var styleWithPos = this.mergeStyles(style.Alert, {right: ($parent.outerWidth() + 10) + 'px', top: 'calc(50% - ' + $Alert.outerHeight()/2 + 'px)'});

        return (
            <div ref="Alert" onClick={this.props.onClick} className={"Alert " + (this.props.show ? "visibilty-transition" : "")} style={styleWithPos}>
                {this.props.children}
            </div>
        )
    }
});

module.exports = Alert;
