(this["webpackJsonpclick-counter"]=this["webpackJsonpclick-counter"]||[]).push([[0],{233:function(t,e,n){"use strict";n.r(e);var r=n(0),c=n.n(r),i=n(12),a=n.n(i),o=n(11),u=n(16),s=n(14),l=n(13),j=n(281),b=n(290),h=n(5),d=n(282),O=n(291),f=n(283),x=n(285),p=n(286),v=n(287),m=n(65),y=n.n(m),C=n(98),k=n(99),w=n.n(k),g=(n(225),n(207)),T=n(205),P=n(197),$=n(4),S=function(){function t(){Object(o.a)(this,t)}return Object(u.a)(t,[{key:"toString",value:function(){return"NullContext"}}]),t}();function B(t){var e,n,r=function(){function t(){Object(o.a)(this,t)}return Object(u.a)(t,null,[{key:"contextType",get:function(){return t._contextType}}]),t}();return r._contextType=c.a.createContext(new S),r.WithContext=(n=e=function(e){Object(s.a)(r,e);var n=Object(l.a)(r);function r(){var t;Object(o.a)(this,r);for(var e=arguments.length,c=new Array(e),i=0;i<e;i++)c[i]=arguments[i];return(t=n.call.apply(n,[this].concat(c))).context=void 0,t}return Object(u.a)(r,[{key:"render",value:function(){if(this.context instanceof S)throw Error("NullContext found, you must run the Provider of ".concat(t.name," first"));return this.props.builder(this.context)}}]),r}(c.a.PureComponent),e.contextType=r._contextType,n),r.Provider=function(t){Object(s.a)(n,t);var e=Object(l.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return Object($.jsx)(r._contextType.Provider,{value:this.props.create(),children:this.props.children})}}]),n}(c.a.PureComponent),r.Builder=function(t){Object(s.a)(n,t);var e=Object(l.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){var t=this;return Object($.jsx)(r.WithContext,{builder:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(e){return Object($.jsx)(P.a,{bloc:e,builder:function(n){return t.props.builder(n,e)}})}))})}}]),n}(c.a.PureComponent),r}var _=function(t){Object(s.a)(n,t);var e=Object(l.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(u.a)(n,[{key:"mapEventToState",value:function(t){var e=this;return Object(g.a)(w.a.mark((function n(){return w.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t(e.state);case 2:case"end":return n.stop()}}),n)})))()}},{key:"emit",value:function(t){this.emit_with((function(){return t}))}},{key:"emit_with",value:function(t){this.add(t)}}]),n}(T.a);function D(t){return B(t)}var N=function t(e){Object(o.a)(this,t),this.counters=void 0,this.counters=e||C.a.List()},z=function(t){Object(s.a)(n,t);var e=Object(l.a)(n);function n(){var t;return Object(o.a)(this,n),(t=e.call(this,new N)).addCounter=function(){t.emit_with((function(e){return new N(t.state.counters.push(new W(e.counters.size)))}))},t.removeCounter=function(e){t.emit_with((function(t){return new N(t.counters.set(e,null))}))},t.clearCounter=function(){t.emit_with((function(t){return new N(t.counters.clear())}))},t}return n}(_);z.$=D(z);var F=function t(e,n){Object(o.a)(this,t),this.records=void 0,this.title=void 0,this.title=new R(e),this.records=new A(n)},W=function(t){Object(s.a)(n,t);var e=Object(l.a)(n);function n(t,r){var c;return Object(o.a)(this,n),(c=e.call(this,new F("Counter #".concat(t+1),r))).idx=void 0,c.idx=t,c}return n}(_);W.$=D(W);var A=function(t){Object(s.a)(n,t);var e=Object(l.a)(n);function n(t){var r;return Object(o.a)(this,n),(r=e.call(this,t||C.a.List())).pushRecord=function(t){r.emit_with((function(e){return e.push(t||new Date)}))},r.popRecord=function(){r.emit_with((function(t){return t.pop()}))},r}return n}(_);A.$=D(A);var R=function(t){Object(s.a)(n,t);var e=Object(l.a)(n);function n(t){var r;return Object(o.a)(this,n),(r=e.call(this,null)).defaultTitle=void 0,r.setTitle=function(t){r.emit(0===t.length?null:t)},r.defaultTitle=t,r}return n}(_);R.$=D(R);var E=n(206),J=n(263),L=n(266),M=n(267),V=n(268),H=n(269),U=n(270),I=n(271),q=n(289),G=n(78),K=n(235),Q=n(274),X=n(276),Y=n(277),Z=n(278),tt=n(279),et=n(280),nt=n(272),rt=n(273),ct=function(t){Object(s.a)(n,t);var e=Object(l.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return Object($.jsx)(c.a.Fragment,{children:Object($.jsx)(z.$.Builder,{builder:function(t){return Object($.jsx)(J.a,{container:!0,justify:"center",spacing:2,children:t.counters.filter((function(t){return t instanceof W})).map((function(t){var e=t;return Object($.jsx)(c.a.Fragment,{children:Object($.jsx)(J.a,{item:!0,children:Object($.jsx)(W.$.Provider,{create:function(){return e},children:Object($.jsx)(it,{})})})},e.idx)}))})}})})}}]),n}(c.a.PureComponent),it=function(t){Object(s.a)(n,t);var e=Object(l.a)(n);function n(){var t;Object(o.a)(this,n);for(var r=arguments.length,c=new Array(r),i=0;i<r;i++)c[i]=arguments[i];return(t=e.call.apply(e,[this].concat(c))).context=void 0,t}return Object(u.a)(n,[{key:"render",value:function(){var t=this.context,e=t.state.records,n=t.state.title;return Object($.jsx)(A.$.Provider,{create:function(){return e},children:Object($.jsx)(R.$.Provider,{create:function(){return n},children:Object($.jsx)(c.a.Fragment,{children:Object($.jsxs)(L.a,{children:[Object($.jsxs)(M.a,{onClick:function(){return e.pushRecord()},children:[Object($.jsx)(V.a,{children:Object($.jsx)(at,{})}),Object($.jsx)(H.a,{children:Object($.jsx)(ot,{})})]}),Object($.jsx)(U.a,{children:Object($.jsxs)(J.a,{container:!0,direction:"row",children:[Object($.jsx)(J.a,{item:!0,children:Object($.jsx)(ut,{})}),Object($.jsx)(J.a,{container:!0,item:!0,xs:!0,justify:"flex-end",children:Object($.jsx)(I.a,{"aria-label":"backspace",onClick:function(){return e.popRecord()},children:Object($.jsx)(nt.a,{})})})]})})]})})})})}}]),n}(c.a.PureComponent);it.contextType=W.$.contextType;var at=function(t){Object(s.a)(n,t);var e=Object(l.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return Object($.jsx)(q.a,{width:"9rem",height:"5rem",bgcolor:G.a.teal[400],children:Object($.jsxs)("svg",{width:"100%",height:"100%",viewBox:"0 0 100 100",children:[Object($.jsx)("style",{type:"text/css",children:"\n              .countText {\n                color: ".concat(G.a.common.white,";\n                fill: currentColor;\n                stroke: currentColor;\n                text-anchor: middle;\n                dominant-baseline: middle;\n              }\n            ")}),Object($.jsx)(A.$.Builder,{builder:function(t){return Object($.jsxs)("g",{children:[Object($.jsx)("text",{x:"50%",y:"50%",className:"countText",fontSize:"50",fontWeight:"bold",transform:"translate(0 1)",children:t.size}),Object($.jsx)("text",{x:"50%",y:"50%",className:"countText",fontSize:"150",fontWeight:"bold",strokeWidth:"10",opacity:"0.3",transform:"translate(0 10)",children:t.size})]})}})]})})}}]),n}(c.a.PureComponent),ot=function(t){Object(s.a)(n,t);var e=Object(l.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return Object($.jsxs)(q.a,{children:[Object($.jsx)(R.$.Builder,{builder:function(t,e){return Object($.jsx)(q.a,{color:"text.primary",children:Object($.jsx)(K.a,{variant:"body1",children:t||e.defaultTitle})})}}),Object($.jsx)(A.$.Builder,{builder:function(t){return Object($.jsx)(q.a,{color:"text.secondary",children:t.map((function(t,e){return[t,e]})).slice(-3).map((function(t){var e=Object(E.a)(t,2),n=e[0],r=e[1];return Object($.jsx)(c.a.Fragment,{children:Object($.jsx)(K.a,{variant:"body1",children:"".concat(y()(n,"hh:mm:ss")," #").concat(r)})},r)}))})}})]})}}]),n}(c.a.PureComponent),ut=function(t){Object(s.a)(n,t);var e=Object(l.a)(n);function n(t){var r;return Object(o.a)(this,n),(r=e.call(this,t)).context=void 0,r.setOpen=function(){r.setState({open:!0})},r.setClose=function(){r.setState({open:!1})},r.handleOk=function(){r.setClose()},r.state={open:!1},r}return Object(u.a)(n,[{key:"render",value:function(){var t=this,e=this.context,n=e.state.title;return Object($.jsxs)(c.a.Fragment,{children:[Object($.jsx)(I.a,{"aria-label":"settings",onClick:this.setOpen,children:Object($.jsx)(rt.a,{})}),Object($.jsxs)(Q.a,{open:this.state.open,onClose:this.setClose,children:[Object($.jsx)(X.a,{children:"Settings"}),Object($.jsx)(Y.a,{children:Object($.jsx)(Z.a,{fullWidth:!0,label:n.defaultTitle,defaultValue:n.state,onChange:function(t){return n.setTitle(t.target.value)}})}),Object($.jsxs)(tt.a,{children:[Object($.jsx)(z.$.WithContext,{builder:function(n){return Object($.jsx)(et.a,{color:"secondary",size:"medium",onClick:function(){n.removeCounter(e.idx),t.setClose()},children:"Delete"})}}),Object($.jsx)(et.a,{color:"primary",size:"medium",onClick:this.handleOk,children:"Ok"})]})]})]})}}]),n}(c.a.PureComponent);ut.contextType=W.$.contextType;var st=function(t){Object(s.a)(n,t);var e=Object(l.a)(n);function n(){var t;Object(o.a)(this,n);for(var r=arguments.length,c=new Array(r),i=0;i<r;i++)c[i]=arguments[i];return(t=e.call.apply(e,[this].concat(c))).counterViewBloc=new z,t}return Object(u.a)(n,[{key:"componentDidMount",value:function(){this.counterViewBloc.addCounter()}},{key:"render",value:function(){var t=this;return Object($.jsx)(z.$.Provider,{create:function(){return t.counterViewBloc},children:Object($.jsxs)(c.a.Fragment,{children:[Object($.jsx)(j.a,{children:Object($.jsx)(ct,{})}),Object($.jsx)(jt,{})]})})}}]),n}(c.a.PureComponent),lt=function(t){Object(s.a)(n,t);var e=Object(l.a)(n);function n(t){var r;return Object(o.a)(this,n),(r=e.call(this,t)).context=void 0,r.exportData=function(){return r.context.state.counters.filter((function(t){return t instanceof W})).map((function(t){var e=t;return{title:e.state.title.state||e.state.title.defaultTitle,records:e.state.records.state.toJSON()}})).toJSON()},r.setOpen=function(){r.setState({open:!0})},r.setClose=function(){r.setState({open:!1})},r.export=function(){var t=r.exportData(),e=JSON.stringify(t);console.info(t);var n=new Blob([e],{type:"application/json;charset=utf-8"}),c=URL.createObjectURL(n),i=document.createElement("a");i.setAttribute("href",c),i.setAttribute("download","".concat(y()(new Date,"yyyy-mm-dd-HH-MM-ss"),".json")),i.click(),r.setClose()},r.state={open:!1},r}return Object(u.a)(n,[{key:"render",value:function(){var t=this,e=this.props.classes;return Object($.jsx)(c.a.Fragment,{children:Object($.jsxs)(d.a,{ariaLabel:"speed dial",className:e.speedDial,icon:Object($.jsx)(O.a,{}),open:this.state.open,onOpen:this.setOpen,onClose:this.setClose,children:[Object($.jsx)(f.a,{tooltipTitle:"Add",icon:Object($.jsx)(x.a,{}),onClick:this.context.addCounter}),Object($.jsx)(f.a,{tooltipTitle:"Clear",icon:Object($.jsx)(p.a,{}),onClick:function(){t.context.clearCounter(),t.context.addCounter(),t.setClose()}}),Object($.jsx)(f.a,{tooltipTitle:"Export",icon:Object($.jsx)(v.a,{}),onClick:this.export})]})})}}]),n}(c.a.PureComponent);lt.contextType=z.$.contextType;var jt=h.a((function(t){return b.a({speedDial:{position:"fixed",bottom:t.spacing(2),right:t.spacing(2)}})}))(lt),bt=function(t){Object(s.a)(n,t);var e=Object(l.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return Object($.jsx)(st,{})}}]),n}(c.a.Component);a.a.render(Object($.jsx)(c.a.StrictMode,{children:Object($.jsx)(bt,{})}),document.getElementById("root"))}},[[233,1,2]]]);
//# sourceMappingURL=main.3d1c13a7.chunk.js.map