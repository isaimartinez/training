!function(t){
    var e={};
    function n(i){
        if(e[i])return e[i].exports;
        var s=e[i]={i:i,l:!1,exports:{}};
        return t[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports
    }
    n.m=t,n.c=e,n.d=function(t,e,i){
        n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})
    },
    n.r=function(t){
        "undefined" != typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})
    },
    n.t=function(t,e){
        if(1&e&&(t=n(t)),8&e)return t;
        if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;
        var i=Object.create(null);
        if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)
            for(var s in t)n.d(i,s,function(e){return t[e]}.bind(null,s));
            return i
    },
    n.n=function(t){
        var e=t&&t.__esModule?function(){return t.default}:function(){return t};
        return n.d(e,"a",e),e
    },
    n.o=function(t,e){
        return Object.prototype.hasOwnProperty.call(t,e)
    },
    n.p="",
    n(n.s=0)
}
([
    function(t,e,n){n(2),t.exports=n(1)},
    function(t,e,n){},
    function(t,e,n){
        "use strict";
        n.r(e);
        var i=new function t(){
            !function(t,e){
                if(!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
            }
            (this,t),
            this.app_name="RC Controller",
            this.controls_id="controls",
            this.statusIndicatorId="status-indicator",
            this.lc_id="left-cross",
            this.rc_id="right-cross",
            this.switch_arming_id="switch-arming",
            this.switch_on_value=1e3,
            this.switch_off_value=0,
            this.axis_size=240,
            this.axis_style="lightgray",
            this.control_point_style="black",
            this.control_point_size=10,
            this.control_range=130,
            this.control_range_offset=25,
            this.keepAliveInterval=500,
            this.scale=1e3
        };
        var s=function t(){
            !function(t,e){
                if(!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
            }
            (this,t),
            this.x=0,
            this.y=0
        };
        function a(t,e){
            for(var n=0;n<e.length;n++){
                var i=e[n];
                i.enumerable=i.enumerable||!1,i.configurable=!0,
                "value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)
            }
        }
        var r=function(){
            function t(e){
                if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.document=e,!(this.document.body instanceof HTMLBodyElement))
                throw "body is not HTMLBodyElement";
                this.body=this.document.body,this.print()
            }
            var e,n,s;
            return e=t,
            (n=[{key:"print",value:function(){this.append_controls_to_page(),this.rightCanvas.width=i.axis_size,this.rightCanvas.height=i.axis_size,this.leftCanvas.width=i.axis_size,this.leftCanvas.height=i.axis_size
            }},
            {key:"get_control_point_size",value:function(){return i.control_point_size}},
            {key:"get_right_canvas",value:function(){return this.rightCanvas}},
            {key:"get_left_canvas",value:function(){return this.leftCanvas}},
            {key:"get_switch_arming_object",
                value:function(){
                    var t=this.document.getElementById(i.switch_arming_id);
                    if(!(t instanceof HTMLInputElement))throw"Cannot find arming_switch";return t
            }},
            {key:"append_controls_to_page",
                value:function(){
                    var t=this.document.createElement("div");
                    t.id=i.controls_id,
                    this.create_canvas_objects(this.document),
                    t.appendChild(this.leftCanvas),
                    t.appendChild(this.rightCanvas),
                    this.body.appendChild(t)
            }},
            {key:"create_canvas_objects",
                value:function(t){
                    this.rightCanvas=t.createElement("canvas"),
                    this.leftCanvas=t.createElement("canvas"),
                    this.leftCanvas.id=i.lc_id,
                    this.rightCanvas.id=i.rc_id
            }},
            {key:"draw_control_point",
                value:function(t,e){
                    var n=e.getContext("2d");
                    this.clear_canvas(e),
                    n.fillStyle=i.control_point_style,
                    n.fillRect(t.x-this.get_control_point_size()/2,t.y-this.get_control_point_size()/2,this.get_control_point_size(),this.get_control_point_size())
            }},
            {key:"clear_canvas",
                value:function(t){
                    var e=t.getContext("2d");
                    e.clearRect(0,0,t.width,t.height),
                    e.fillStyle=i.axis_style,
                    e.fillRect(i.axis_size/2,0,1,t.height),
                    e.fillRect(0,i.axis_size/2,t.width,1)
            }}
])&&a(e.prototype,n),s&&a(e,s),t}();
    var o=function t(){
        !function(t,e){
            if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")
        }
        (this,t),
        this.left_horizontal=500,
        this.left_vertical=0,
        this.right_horizontal=500,
        this.right_vertical=500,
        this.switch_arming=0
    };
    function c(t,e){
        for(var n=0;n<e.length;n++){
            var i=e[n];
            i.enumerable=i.enumerable||!1,i.configurable=!0,
            "value"in i&&(i.writable=!0),
            Object.defineProperty(t,i.key,i)
        }
    }
    var _=function(){
        function t(e){
            !function(t,e){
                if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }
            (this,t),
            this.window=e,
            this.actual_state=null,
            this.is_sending_needed=!0,
            this.is_xhr_in_progress=!1,
            this.last_state_change_request=null,
            this.xhr=new XMLHttpRequest;
            var n=this,s=document.getElementById(i.statusIndicatorId);
            if(!(s instanceof HTMLElement))throw "Status indicator is not present";
            this.statusIndicator=s,
            this.xhr.addEventListener("loadend",function(){n.set_xhr_done()}),
            this.startKeepAlive()
        }
        var e,n,s;
        return e=t,
        (n=[{key:"set_state_changed",value:function(t){
            this.actual_state=t,
            this.send_request(t)
            }},{
            key:"startKeepAlive",
            value:function(){
                var t=this;
                setInterval(function(){
                    t.actual_state instanceof o&&t.send_request(t.actual_state)
                },
                i.keepAliveInterval)
            }},{
            key:"set_xhr_done",
            value:function(){
                var t=this;
                this.is_xhr_in_progress=!1,this.last_state_change_request instanceof o&&(this.send_request(this.last_state_change_request),this.last_state_change_request=null),
                this.statusIndicator.style.backgroundColor="green",
                this.checkTimer&&clearTimeout(this.checkTimer),
                this.checkTimer=setTimeout(function(){t.statusIndicator.style.backgroundColor="red"},600)
            }},{
            key:"send_request",
            value:function(t){
                this.is_xhr_in_progress?this.last_state_change_request=t:(this.xhr.abort(),this.xhr.open("GET","/control"+this.get_state_querystring(t),!0),this.is_xhr_in_progress=!0,this.xhr.send())
            }},{
            key:"get_state_querystring",
            value:function(t){
                var e="?";
                return e+="0="+(t.right_horizontal+1e3),
                e+="&1="+(t.right_vertical+1e3),
                e+="&2="+(t.left_vertical+1e3),
                e+="&3="+(t.left_horizontal+1e3),
                e+="&4="+(t.switch_arming+1e3)
            }}
        ])&&c(e.prototype,n),s&&c(e,s),t}();
        function h(t,e){
            for(var n=0;n<e.length;n++){
                var i=e[n];
                i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)
            }}
            var l=function(){
                function t(e,n){
                    !function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}
                    (this,t),
                    this.printer=e,
                    this.state=n,
                    this.listener=null
                }
                var e,n,a;
                return e=t,
                (n=[{key:"add_listeners",
                    value:function(){
                        this.add_touchstart(this.printer.get_right_canvas()),
                        this.add_touchstart(this.printer.get_left_canvas()),
                        this.add_touchmove(this.printer.get_right_canvas()),
                        this.add_touchmove(this.printer.get_left_canvas()),
                        this.add_touchend(this.printer.get_right_canvas()),
                        this.add_touchend(this.printer.get_left_canvas()),
                        this.add_switch_arming_change(this.printer.get_switch_arming_object())
                    }},{key:"add_switch_arming_change",
                    value:function(t){
                        var e=this;
                        t.addEventListener("change",function(n){n.preventDefault(),e.state.switch_arming=t.checked?i.switch_on_value:i.switch_off_value,e.listener instanceof _&&e.listener.set_state_changed(e.state)},!1)
                    }},{key:"add_touchstart",
                        value:function(t){
                            var e=this;
                            t.addEventListener("touchstart",function(n){n.preventDefault();var i=e.get_touch_for_canvas(t,n.changedTouches),s=e.get_touch_coords(t,i),a=e.get_real_coords(t,i);e.process_state_change(a,t),e.printer.draw_control_point(s,t)},!1)
                    }},{key:"add_touchmove",
                        value:function(t){
                            var e=this;
                            t.addEventListener("touchmove",function(n){n.preventDefault();var i=e.get_touch_for_canvas(t,n.changedTouches),s=e.get_touch_coords(t,i),a=e.get_real_coords(t,i);e.process_state_change(a,t),e.printer.draw_control_point(s,t)},!1)
                    }},{key:"add_touchend",
                        value:function(t){
                            var e=this;
                            t.addEventListener("touchend",function(n){n.preventDefault();var s=e.get_touch_for_canvas(t,n.changedTouches),a=e.get_touch_coords(t,s),r=e.get_real_coords(t,s);a.x=i.axis_size/2,r.x=i.axis_size/2,t.id===i.rc_id&&(a.y=i.axis_size/2,r.y=i.axis_size/2),e.process_state_change(r,t),e.printer.draw_control_point(a,t)},!1)
                    }},{key:"set_state_listener",
                        value:function(t){this.listener=t
                    }},{key:"process_state_change",
                        value:function(t,e){
                            var n=Number.parseInt(e.width.toString()),
                            s=Number.parseInt(e.height.toString()),
                            a=i.scale*t.x,
                            r=i.scale*t.y;e.id===i.lc_id?(this.state.left_horizontal=Math.round(a/n),this.state.left_vertical=i.scale-Math.round(r/s)):(this.state.right_horizontal=Math.round(a/n),this.state.right_vertical=i.scale-Math.round(r/s)),this.call_listener(this.state)
                    }},{key:"call_listener",
                        value:function(t){
                            this.listener instanceof _&&this.listener.set_state_changed(t)
                    }},{key:"get_touch_for_canvas",
                        value:function(t,e){
                            var n,i=e[0];
                            for(n=1;n<e.length;n+=1)if(e[n].target instanceof HTMLElement&&t.id===e[n].target.id){i=e[n];break}return i
                    }},{key:"get_touch_coords",
                        value:function(t,e){
                            var n=new s;
                            return n.x=e.pageX-t.offsetLeft,n.y=e.pageY-t.offsetTop,this.get_coords_in_limits(t,n)
                    }},{key:"get_real_coords",
                        value:function(t,e){
                            var n=new s;
                            return n.x=e.pageX-t.offsetLeft,n.y=e.pageY-t.offsetTop,this.get_real_coords_in_limits(t,n)
                    }},{key:"get_coords_in_limits",
                        value:function(t,e){
                            var n;for(n in e)e=this.get_coord_in_limits(t,e,n);return e
                    }},{key:"get_real_coords_in_limits",
                        value:function(t,e){
                            return e.x<0?e.x=0:e.x>t.width&&(e.x=t.width),e.y<0?e.y=0:e.y>t.height&&(e.y=t.height),e
                    }},{key:"get_coord_in_limits",
                        value:function(t,e,n){
                            var i=this.printer.get_control_point_size()/2;
                            return e.x<i?e.x=i:e.x>t.width-i&&(e.x=t.width-i),e.y<i?e.y=i:e.y>t.height-i&&(e.y=t.height-i),e
                    }}
                ])&&h(e.prototype,n),a&&h(e,a),t}(),u=new r(document),d=new l(u,new o),f=new _(window);u.clear_canvas(u.get_left_canvas()),u.clear_canvas(u.get_right_canvas());
                var v=new s,g=new s;
                v.x=i.axis_size/2,v.y=i.axis_size/2,g.x=i.axis_size/2,g.y=i.axis_size-i.control_point_size/2,u.draw_control_point(v,u.get_right_canvas()),u.draw_control_point(g,u.get_left_canvas()),d.set_state_listener(f),d.add_listeners()
            }]);