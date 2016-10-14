
export default function (config) {
        var _params = {
            breakpoints: [],
            interval: 500,
            appendDOM: false,
            onChange: null
        };

        var $html = $('html');
        var $window = $(window);

        var currentName = "";

        var _resolveName = function(width, height) {
            var name = "";
            _params.breakpoints.map(function(val,key) {
                var k = Object.keys(val)[0];
                if(width <= k*1) {
                    name = val[k];
                }
            });
            return name;
        };

        var _handleCommunication = function(e, h) {
            var width = typeof e === "object" ? e.currentTarget.innerWidth : e;
            var height = typeof e === "object" ? e.currentTarget.innerHeight : h;
            var name = _resolveName(width);
            window.breakpoint = {
                width: width,
                height: height,
                name: name
            };
            $window.trigger('size-change', width);
            if(currentName !== name) {
                $window.trigger('breakpoint-change', name);
                if(_params.onChange) {
                    _params.onChange(name);
                }
                if(_params.appendDOM) {
                    $html.attr('data-breakpoint', name);
                }
                currentName = name;
            }
        };

        var _init = function () {
            $.extend(_params, config);
            $( document ).ready(() => {
                _handleCommunication($window.width(), $window.height());
            });
            _bind();
        };

        var _bind = function () {
            $window.resize($.throttle( _params.interval, _handleCommunication ));
        };

        _init();

};
