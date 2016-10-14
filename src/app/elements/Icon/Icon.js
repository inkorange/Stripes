import React from 'react'
import { render } from 'react-dom'

const Icon = React.createClass({

    contextTypes: {
        location: React.PropTypes.object
    },

    getDefaultProps: function () {
        return {
            enhancedClick: false,
            fnClick: () => { return false; }
        }
    },

    clickAction: function(e) {
        //alert('CLICKED ICON!!!!!!');
        if(this.props.fnClick) {
            this.props.fnClick(e);
        }
    },

    componentDidMount: function() {
    },

    render() {
        var useTag = '<use xlink:href="#' + this.props.iconid + '" />';
        var className = 'icon ' + (this.props.inactive ? 'inactive' : '') + ' ' + this.props.size + ' ' + this.props.className;
        var style = this.props.style ? this.props.style : {};
        var basestyle = this.props.basestyle; //this.mergeStyles(this.props.basestyle, {position: 'relative'});
        if(this.props.color) {
            Object.assign(style, {fill: this.props.color});
        }
        var svg = <svg data-id={this.props["data-id"]} style={style} viewBox="0 0 100 100" className={className} dangerouslySetInnerHTML={{__html: useTag }} />;
        var enhanced =  (<div style={{position: 'relative'}}>
                            {svg}
                            <div style={{position: 'absolute', cursor: 'pointer', top: 0, bottom: 0, right: 0, left: 0, backgroundColor:'rgba(0,0,0,.001)'}} className="icon-click-target" onClick={this.clickAction}></div>
                        </div>);
        return (
            <div className="Icon"
                 title={this.props.title}
                 style={basestyle}
                 data-event-click={this.props["data-event-click"]}
                 data-event-desc={this.props["data-event-desc"]}
                 data-highlight={this.props.highlight}
                 data-name={this.props.iconid}
                 onClick={this.props.enhancedClick ? null : this.clickAction}
                 >
                {this.props.enhancedClick ? enhanced : svg}
                {this.props.children}
            </div>
        )
    }

});

module.exports = Icon;