webpackJsonp([7,5],{0:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}n(251);var o=n(227),r=i(o),a=n(15),u=i(a),c=n(577),s=i(c),f=n(543),d=i(f),l=n(244),m=i(l),p=n(249),h=i(p);r.default.use(u.default),r.default.use(s.default);var v=new s.default({mode:"history",routes:m.default});window.app=new r.default({el:"#app",router:v,store:h.default,render:function(e){return e(d.default)}}),document.body.addEventListener("click",function(e){var t=e.target,n={INPUT:1,TEXTAREA:1};t.tagName in n&&setTimeout(function(){t.scrollIntoViewIfNeeded()},400)},!1)},12:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.animate=t.checkUserIdentifyInfo=t.gotoUserIdentifyInfo=t.dynamicLoadJs=t.statistic=t.showBack=t.linkedmeInnerApp=t.linkedmeFun=t.dismantlingRedEnvelopes=t.enterDetailPageEvent=t.getVersion=t.isInnerApp=t.getStyle=t.jumpToView=t.closeWebView=t.innerAppShare=t.imageShrink=t.commentByCommunity=t.forwardByCommunity=t.publishComment=t.getUserSession=t.checkUserSession=t.getQueryString=t.callLoginJockey=t.removeStore=t.getSessionStore=t.setSessionStore=t.getStore=t.setStore=void 0;var o=n(171),r=i(o),a=n(118),u=i(a);n(114),n(115);var c=n(37),s=t.setStore=function(e,t){e&&("string"!=typeof t&&(t=(0,u.default)(t)),window.localStorage.setItem(e,t))},f=(t.getStore=function(e){if(e)return window.localStorage.getItem(e)},t.setSessionStore=function(e,t){e&&("string"!=typeof t&&(t=(0,u.default)(t)),window.sessionStorage.setItem(e,t))},t.getSessionStore=function(e){if(e)return window.sessionStorage.getItem(e)},t.removeStore=function(e){e&&window.localStorage.removeItem(e)},t.callLoginJockey=function(e){WebViewJavascriptBridge.ready(function(t){t.login(function(t){t.uid,t.sid;s("sessionSid",t.sid),s("sessionUid",t.uid),e&&"function"==typeof e&&e()})})}),d=(t.getQueryString=function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(t);return null!=n?decodeURIComponent(n[2]):null},t.checkUserSession=function(e){WebViewJavascriptBridge.ready(function(t){t.getSession(function(t){var n=(t.uid,t.sid);if(s("sessionSid",t.sid),s("sessionUid",t.uid),n){if(!e||"function"!=typeof e)return;e()}else f(e)})})},t.getUserSession=function(e){WebViewJavascriptBridge.ready(function(t){t.getSession(function(t){t.uid,t.sid;s("sessionSid",t.sid),s("sessionUid",t.uid),e&&"function"==typeof e&&e()})})},t.publishComment=function(e,t,n,i,o){WebViewJavascriptBridge.ready(function(r){r.getSession(function(r){var a=(r.uid,r.sid);s("sessionSid",r.sid),s("sessionUid",r.uid),a?WebViewJavascriptBridge.ready(function(r){r.publishComment(e,t,n,i,o)}):f(o)})})},t.forwardByCommunity=function(e,t,n){WebViewJavascriptBridge.ready(function(i){i.getSession(function(i){var o=(i.uid,i.sid);s("sessionSid",i.sid),s("sessionUid",i.uid),o?WebViewJavascriptBridge.ready(function(i){i.forwardByCommunity(e,t,n)}):f(n)})})},t.commentByCommunity=function(e,t,n,i){WebViewJavascriptBridge.ready(function(o){o.getSession(function(o){var r=(o.uid,o.sid);s("sessionSid",o.sid),s("sessionUid",o.uid),r?WebViewJavascriptBridge.ready(function(o){o.commentByCommunity(e,t,n,i)}):f(i)})})},t.imageShrink=function(e){WebViewJavascriptBridge.imageShrink(e)},t.innerAppShare=function(e,t,n,i,o,r,a,u){WebViewJavascriptBridge.showRightShareButton(e,t,n,i,o,r,a,u)},t.closeWebView=function(){WebViewJavascriptBridge.closeWebView()},t.jumpToView=function(e,t,n){WebViewJavascriptBridge.ready(function(i){i.jumpToView(e,t,n)})},t.getStyle=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"int",i=void 0;return i="scrollTop"===t?e.scrollTop:e.currentStyle?e.currentStyle[t]:document.defaultView.getComputedStyle(e,null)[t],"float"==n?parseFloat(i):parseInt(i)}),l=(t.isInnerApp=function(){return/JFZFortune/i.test(navigator.userAgent)},t.getVersion=function(){for(var e=window.navigator.userAgent.split(" "),t=0,n=0;n<e.length;n++)if(e[n].indexOf("JFZFortune/")>-1){var i=e[n].split("/");return i[1]&&(t=i[1]),parseInt(t.replace(/\./g,""))}return 0},t.enterDetailPageEvent=function(e,t){t&&/JFZFortune/i.test(navigator.userAgent)?WebViewJavascriptBridge.ready(function(e){e.jumpToView("32","0",{uid:t})}):window.location.href=decodeURI(e)},t.dismantlingRedEnvelopes=function(e,t){WebViewJavascriptBridge.ready(function(n){n.dismantlingRedEnvelopes(e,t)})},t.linkedmeFun=function(e){/JFZFortune/i.test(navigator.userAgent)||l("https://static.lkme.cc/linkedme.min.js",function(){var t=c.linkedmeKey,n={};n.type="live",linkedme.init(t,n,function(e,t){});var i={},o=window.location.href,r=encodeURI(o);i.params='{"linkedme":"'+r+'"}',linkedme.link(i,function(t,n){if(t)console.log("errr"+t);else{if(!e||"function"!=typeof e)return;e(n.url)}},!1)})},t.linkedmeInnerApp=function(e,t,n){/JFZFortune/i.test(navigator.userAgent)||l("https://static.lkme.cc/linkedme.min.js",function(){var i=c.linkedmeKey,o={};o.type="live",linkedme.init(i,o,function(e,t){});var r={},a={view:{viewId:e,viewProperty:t}},s=encodeURI("app://")+(0,u.default)(a);a=encodeURI(s),r.params='{"linkedme":"'+a+'"}',linkedme.link(r,function(e,t){if(e)console.log("errr"+e);else{if(!n||"function"!=typeof n)return;n(t.url)}},!1)})},t.showBack=function(e){var t=void 0,n=void 0;document.addEventListener("scroll",function(){o()},!1),document.addEventListener("touchstart",function(){o()},{passive:!0}),document.addEventListener("touchmove",function(){o()},{passive:!0}),document.addEventListener("touchend",function(){n=document.body.scrollTop,i()},{passive:!0});var i=function e(){t=requestAnimationFrame(function(){document.body.scrollTop!=n?(n=document.body.scrollTop,e()):cancelAnimationFrame(t),o()})},o=function(){e(document.body.scrollTop>500?!0:!1)}},t.statistic=function(e){WebViewJavascriptBridge.ready(function(t){t.statistic(e)})},t.dynamicLoadJs=function(e,t){var n=document.getElementsByTagName("head")[0],i=document.createElement("script");i.type="text/javascript",i.src=e,"function"==typeof t&&(i.onload=i.onreadystatechange=function(){this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(t(),i.onload=i.onreadystatechange=null)}),n.appendChild(i)});t.gotoUserIdentifyInfo=function(e){WebViewJavascriptBridge.ready(function(t){t.getSession(function(t){var n=(t.uid,t.sid);s("sessionSid",t.sid),s("sessionUid",t.uid),n?WebViewJavascriptBridge.ready(function(t){t.getUserIdentifyInfo(function(t){var n=t.idCard,i=t.realName,o=t.simuRiskLevel;if(null==i||""==i||""==n||""==n)WebViewJavascriptBridge.goIdentifyPage(function(){if(null==i||""==i)return!1;if(null==o||""==o){var t=window.location.href;return window.location.href=c.riskTestUrl+"?jumpUrl="+encodeURI(t),null}e&&"function"==typeof e&&e()});else{if(null==o||""==o){var r=window.location.href;return window.location.href=c.riskTestUrl+"?jumpUrl="+encodeURI(r),null}if(!e||"function"!=typeof e)return;e()}})}):f(e)})})},t.checkUserIdentifyInfo=function(e){WebViewJavascriptBridge.ready(function(t){t.getUserIdentifyInfo(function(t){var n=t.idCard,i=t.realName,o=t.simuRiskLevel;if(console.log(t),null==i||""==i||""==n||""==n||null==o||""==o){if(!e||"function"!=typeof e)return;e("0")}else{if(!e||"function"!=typeof e)return;e("1")}})})},t.animate=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:400,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"ease-out",o=arguments[4];clearInterval(e.timer),n instanceof Function?(o=n,n=400):n instanceof String&&(i=n,n=400),i instanceof Function&&(o=i,i="ease-out");var a=function(t){return"opacity"===t?Math.round(100*d(e,t,"float")):d(e,t)},u=parseFloat(document.documentElement.style.fontSize),c={},s={};(0,r.default)(t).forEach(function(e){/[^\d^\.]+/gi.test(t[e])?c[e]=t[e].match(/[^\d^\.]+/gi)[0]||"px":c[e]="px",s[e]=a(e)}),(0,r.default)(t).forEach(function(e){"rem"==c[e]?t[e]=Math.ceil(parseInt(t[e])*u):t[e]=parseInt(t[e])});var f=!0,l={};e.timer=setInterval(function(){(0,r.default)(t).forEach(function(r){var u=0,c=!1,d=a(r)||0,m=0,p=void 0;switch(i){case"ease-out":m=d,p=5*n/400;break;case"linear":m=s[r],p=20*n/400;break;case"ease-in":var h=l[r]||0;u=h+(t[r]-s[r])/n,l[r]=u;break;default:m=d,p=5*n/400}switch("ease-in"!==i&&(u=(t[r]-m)/p,u=u>0?Math.ceil(u):Math.floor(u)),i){case"ease-out":c=d!=t[r];break;case"linear":c=Math.abs(Math.abs(d)-Math.abs(t[r]))>Math.abs(u);break;case"ease-in":c=Math.abs(Math.abs(d)-Math.abs(t[r]))>Math.abs(u);break;default:c=d!=t[r]}c?(f=!1,"opacity"===r?(e.style.filter="alpha(opacity:"+(d+u)+")",e.style.opacity=(d+u)/100):"scrollTop"===r?e.scrollTop=d+u:e.style[r]=d+u+"px"):f=!0,f&&(clearInterval(e.timer),o&&o())})},20)}},37:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="",i="history",o="1357cc17c938b98079fafb246ea25602";t.baseUrl=n=window.location.host.toString().indexOf("h5")>-1?window.location.host:"http://h5.jfz.net";var r=n+"/fortune/user/risk-test";t.linkedmeKey=o,t.baseUrl=n,t.routerMode=i,t.riskTestUrl=r},114:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var o=n(118),r=i(o);!function(){for(var e=window.location.host,t={callbacks:{},send:function(e,t){this.dispatchMessage("event",e,t)},sendCallback:function(e){var t=n.createEnvelope(e);this.dispatchMessage("callback",t,function(){})},triggerCallback:function(e){var t=this,n=Array.prototype.slice.call(arguments);n.shift(),setTimeout(function(){var i=t.callbacks[e];i.apply(this,n)},0)},dispatchMessage:function(e,t,n){var i=this;this.callbacks[t.id]=function(){n.apply(this,arguments),delete i.callbacks[t.id]};var o="jockey://"+e+"/"+t.id+"?"+encodeURIComponent((0,r.default)(t)),a=document.createElement("iframe");a.setAttribute("src",o),document.documentElement.appendChild(a),a.parentNode.removeChild(a),a=null}},n={listeners:{},dispatcher:null,messageCount:0,on:function(e,t){(!this.listeners.hasOwnProperty(e)||!this.listeners[e]instanceof Array)&&(this.listeners[e]=[]),this.listeners[e].push(t)},off:function(e){(!this.listeners.hasOwnProperty(e)||!this.listeners[e]instanceof Array)&&(this.listeners[e]=[]),this.listeners[e]=[]},send:function(e,t,n){t instanceof Function&&(n=t,t=null),t=t||{},n=n||function(){};var i=this.createEnvelope(this.messageCount,e,t);this.dispatcher.send(i,n),this.messageCount+=1},trigger:function(e,t,n){for(var i=this,o=this.listeners[e]||[],r=0,a=function(){r+=1,r>=o.length&&i.dispatcher.sendCallback(t)},u=0;u<o.length;u++){var c=o[u];c.length<=1?(c(n),a()):c(n,a)}},triggerCallback:function(e){this.dispatcher.triggerCallback.apply(this.dispatcher,arguments)},createEnvelope:function(t,n,i){return{id:t,type:n,host:e,payload:i}}},i={send:function(e,t){t()},triggerCallback:function(){},sendCallback:function(){}},o=0,a=!1,u=["iPad","iPhone","iPod"];o<u.length;o++)if(navigator.platform.indexOf(u[o])>=0){a=!0;break}var c=/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),s=navigator.userAgent.toLowerCase().indexOf("android")>-1;a&&c||s?n.dispatcher=t:n.dispatcher=i,window.Jockey=n}()},115:function(e,t){"use strict";!function(e,t){function n(t){return t=t||function(){},S?t(e.WebViewJavascriptBridge):document.addEventListener("WebViewJavascriptBridgeReady",function(){t(e.WebViewJavascriptBridge)},!1),this}function i(){var e=document,t=e.createEvent("Events");t.initEvent("WebViewJavascriptBridgeReady",!0,!0),t.bridge=WebViewJavascriptBridge,o(function(n){e.dispatchEvent(t)})}function o(e){return e=e||function(){},S?(e(S),!1):void setTimeout(function(){t.send("getEnvironment",function(t){S=t,e(t)})},0)}function r(e){e=e||function(){},setTimeout(function(){t.send("getSession",function(t){e(t)})},0)}function a(e,n,i){i=i||{},setTimeout(function(){t.send("showAppointment",{title:e,type:n,extra:i})},0)}function u(){setTimeout(function(){t.send("showInvestAgreeMentIfNeed")},0)}function c(e,n,i,o,r,a,u,c){a=a||"",u=u||0,c=c||function(){};var s=this;t.off("afterClickRightShareButton"),t.on("afterClickRightShareButton",function(){s.shareToSNS(e,n,i,o,r,a),c()}),setTimeout(function(){t.send("showRightBarItem",{itemType:"0",alwayShow:u,itemClickObject:{},msgAfterClick:"afterClickRightShareButton",btnTitle:"",btnImage:"https://oss-cn-hangzhou.aliyuncs.com/jfzapp-static2/devenv/ad/cd796d11ec931f822453cf1bef101d65.png"})},0)}function s(e,n,i,o,r,a){a=a||"";var u="SHARE_NONEED_REPORT";setTimeout(function(){t.send("shareToSNS",{viewTitle:e,shareTitle:n,content:i,url:o,imageUrl:r,shareID:a,needReport:u})},0)}function f(e,n,i){setTimeout(function(){t.send("jumpToBuy",{proLevel:e,proLevelDes:n,proCode:i})},0)}function d(e){setTimeout(function(){t.send("login",function(t){e&&e(t)})},0)}function l(e){e=e||function(){},setTimeout(function(){t.send("getUserIdentifyInfo",function(t){e(t)})},0)}function m(e){e=e||function(){},setTimeout(function(){t.send("goIdentifyPage",function(t){e(t)})},0)}function p(e){e=e||function(){},setTimeout(function(){t.send("riskEvaluationResult",function(t){e(t)})},0)}function h(e,n){e=e||function(){},n=n?"1":"0",t.off("modal"),t.on("modal",e),setTimeout(function(){t.send("takeoverCloseBrowser",{isTakeover:n,callback:"modal"})},0)}function v(){setTimeout(function(){t.send("closeWebView")})}function T(e,n,i,o,r){r=r||function(){},setTimeout(function(){t.send("addProComment",{prdCode:e,prdType:n,prdName:"",replyCommentId:i.toString(),placeholder:o},function(e){r(e)})},0)}function I(e,n,i){i=i||function(){},setTimeout(function(){t.send("forwardByCommunity",{articleId:e,placeholder:n},function(e){i(e)})},0)}function g(n,i,o,r){r=r||function(){};for(var a=e.navigator.userAgent.split(" "),u=null,c=0;c<a.length;c++)if(a[c].indexOf("JFZFortune/")>-1){var s=a[c].split("/");u=s[1]}parseInt(u.replace(/\./g,""))<410?setTimeout(function(){t.send("addProComment",{prdCode:n,prdType:"community",prdName:"",replyCommentId:i.toString(),placeholder:o},function(e){r(e)})},0):setTimeout(function(){t.send("commentByCommunity",{articleId:n,replyCommentId:i,placeholder:o},function(e){r(e)})},0)}function E(e,n,i){setTimeout(function(){t.send("jumpToView",{view:{viewId:e,closeWebView:n,viewProperty:i}})},0)}function y(e){setTimeout(function(){t.send("statistic",{event:e})},0)}function w(e){setTimeout(function(){t.send("imageShrink",{imgSrc:e})},0)}function C(e,n){setTimeout(function(){t.send("dismantlingRedEnvelopes",{id:e},function(e){n&&"function"==typeof n&&n(e)})},0)}var S;e.WebViewJavascriptBridge||(e.WebViewJavascriptBridge={init:i,ready:n,getEnvironment:o,getSession:r,showAppointment:a,showInvestAgreeMentIfNeed:u,showRightShareButton:c,shareToSNS:s,jumpToBuy:f,login:d,jumpToView:E,getUserIdentifyInfo:l,goIdentifyPage:m,riskEvaluationResult:p,closeBrowser:h,closeWebView:v,publishComment:T,forwardByCommunity:I,commentByCommunity:g,statistic:y,imageShrink:w,dismantlingRedEnvelopes:C},e.WebViewJavascriptBridge.init())}(window,Jockey)},169:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.GETARTICLELIST="GETARTICLELIST",t.GETBLOCKDETAIL="GETBLOCKDETAIL",t.GETARTICLEDETAIL="GETARTICLEDETAIL",t.GETARTICLCOMMENT="GETARTICLCOMMENT",t.CLICKLIKECOMMIT="CLICKLIKECOMMIT",t.COMMENTCLICKLIKECOMMIT="COMMENTCLICKLIKECOMMIT",t.DELETEARTICLE="DELETEARTICLE",t.NOARTICLE="NOARTICLE",t.GETUSERDETAIL="GETUSERDETAIL",t.SENDARTICLELIST="SENDARTICLELIST",t.DISCUSSARTICLELIST="DISCUSSARTICLELIST",t.USERFOLLOW="USERFOLLOW",t.COMMENTDELETE="COMMENTDELETE",t.GETHOTARTICLECOMMENT="GETHOTARTICLECOMMENT",t.GETFINANCIALADVISORINFO="GETFINANCIALADVISORINFO",t.DYNAMICUPDATEBYDETAIL="DYNAMICUPDATEBYDETAIL",t.GETAPIREQUSTTIMESTAMP="GETAPIREQUSTTIMESTAMP",t.GETREPRESENTPRODUCT="GETREPRESENTPRODUCT",t.UPDATEISAUTHIDENTITY="UPDATEISAUTHIDENTITY"},244:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(e){return n.e(1,function(t){var n=[t(555)];e.apply(null,n)}.bind(this))},o=function(e){return n.e(0,function(t){var n=[t(554)];e.apply(null,n)}.bind(this))},r=function(e){return n.e(2,function(t){var n=[t(558)];e.apply(null,n)}.bind(this))},a=function(e){return n.e(3,function(t){var n=[t(557)];e.apply(null,n)}.bind(this))},u=function(e){return n.e(4,function(t){var n=[t(556)];e.apply(null,n)}.bind(this))},c="",s=[{path:"/",redirect:{name:"communityList"}},{path:"/vueApp/community/communityList",component:i,name:"communityList"},{path:"/vueApp/community/userCenter/:userUid",component:r,name:"userCenter"},{path:"/vueApp/community/communityDetail",component:o,name:"communityDetail"},{path:"/vueApp/community/redPacketRule",component:a,name:"redPacketRule"}].map(function(e){return e.path=c+e.path,e});s.push({path:"*",component:u,name:"notfound"}),t.default=s,e.exports=t.default},245:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function o(){return"jsonp_"+Date.now()+"_"+Math.ceil(1e5*Math.random())}function r(e){try{delete window[e]}catch(t){window[e]=void 0}}function a(e){var t=document.getElementById(e);t&&document.getElementsByTagName("head")[0].removeChild(t)}function u(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=l.baseUrl+e,i="";(0,d.default)(t).forEach(function(e){i+=e+"="+t[e]+"&"}),""!==i&&(i=i.substr(0,i.lastIndexOf("&")),n=n+"?"+i);var u=t.timeout||m.timeout,c=t.jsonpCallback||m.jsonpCallback,f=void 0;return new s.default(function(i,d){var l=t.jsonpCallbackFunction||o(),m=c+"_"+l;window[l]=function(e){i({ok:!0,json:function(){return s.default.resolve(e)}}),f&&clearTimeout(f),a(m),r(l)},n+=n.indexOf("?")===-1?"?":"&";var p=document.createElement("script");p.setAttribute("src",""+n+c+"="+l),t.charset&&p.setAttribute("charset",t.charset),p.id=m,document.getElementsByTagName("head")[0].appendChild(p),f=setTimeout(function(){d(new Error("JSONP request to "+e+" timed out")),r(l),a(m),window[l]=function(){r(l)}},u),p.onerror=function(){d(new Error("JSONP request to "+e+" failed")),r(l),a(m),f&&clearTimeout(f)}})}Object.defineProperty(t,"__esModule",{value:!0});var c=n(172),s=i(c),f=n(171),d=i(f),l=n(37),m={timeout:5e3,jsonpCallback:"callback",jsonpCallbackFunction:null};t.default=u,e.exports=t.default},247:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(118),r=i(o),a=n(58),u=i(a),c=n(57),s=i(c),f=n(245),d=i(f),l=n(169);t.default={getArticleList:function(e,t){var n=this,i=e.commit,o=(e.state,t.blockId),r=t.page,a=t.pageSize;return(0,s.default)(u.default.mark(function e(){var t;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=(0,d.default)("/fortune/community/article-list",{blockId:o,page:r,pageSize:a}),t.then(function(e){return e.json()}).then(function(e){e.error||i(l.GETARTICLELIST,e)}).catch(function(e){});case 2:case"end":return e.stop()}},e,n)}))()},getBlockDetail:function(e,t){var n=this,i=e.commit;e.state;return(0,s.default)(u.default.mark(function e(){var o;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:o=(0,d.default)("/fortune/community/block-detail",{blockId:t}),o.then(function(e){return e.json()}).then(function(e){(0,r.default)(e);e.error||i(l.GETBLOCKDETAIL,e)}).catch(function(e){});case 2:case"end":return e.stop()}},e,n)}))()},getArticleDetail:function(e,t){var n=this,i=e.commit,o=(e.state,t.articleId),a=t.uid,c=t.sid;return(0,s.default)(u.default.mark(function e(){var t;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=(0,d.default)("/fortune/community/article-detail",{articleId:o,uid:a,sid:c}),t.then(function(e){return e.json()}).then(function(e){(0,r.default)(e);e.error?i(l.NOARTICLE,e):i(l.GETARTICLEDETAIL,e)}).catch(function(e){});case 2:case"end":return e.stop()}},e,n)}))()},getArticleComment:function(e,t){var n=this,i=e.commit,o=(e.state,t.articleId),a=t.page,c=t.pageSize,f=t.uid,m=t.sid;return(0,s.default)(u.default.mark(function e(){var t;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=(0,d.default)("/fortune/comment/comment-list",{code:o,type:"community",page:a,pageSize:c,uid:f,sid:m,orderLike:"0"}),t.then(function(e){return e.json()}).then(function(e){(0,r.default)(e);e.error||i(l.GETARTICLCOMMENT,e)}).catch(function(e){});case 2:case"end":return e.stop()}},e,n)}))()},thumbsUpFun:function(e,t){var n=this,i=e.commit,o=(e.state,t.uid),a=t.sid,c=t.articleId;return(0,s.default)(u.default.mark(function e(){var t;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:console.log("点赞开始"),t=(0,d.default)("/fortune/community/click-like",{uid:o,sid:a,articleId:c}),t.then(function(e){return e.json()}).then(function(e){(0,r.default)(e);i(l.CLICKLIKECOMMIT,e)}).catch(function(e){});case 3:case"end":return e.stop()}},e,n)}))()},commentThumbsUpFun:function(e,t){var n=this,i=e.commit,o=(e.state,t.uid),a=t.sid,c=t.commentId;return(0,s.default)(u.default.mark(function e(){var t;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:console.log("评论点赞开始"),t=(0,d.default)("/fortune/comment/click-like",{uid:o,sid:a,commentId:c,type:"community"}),t.then(function(e){return e.json()}).then(function(e){(0,r.default)(e);i(l.COMMENTCLICKLIKECOMMIT,e)}).catch(function(e){});case 3:case"end":return e.stop()}},e,n)}))()},deleteArticleFun:function(e,t){var n=this,i=e.commit,o=(e.state,t.uid),a=t.sid,c=t.articleId;return(0,s.default)(u.default.mark(function e(){var t;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=(0,d.default)("/fortune/community/delete-article",{uid:o,sid:a,articleId:c,type:"community"}),t.then(function(e){return e.json()}).then(function(e){(0,r.default)(e);i(l.DELETEARTICLE,e)}).catch(function(e){});case 2:case"end":return e.stop()}},e,n)}))()},followOperateFun:function(e,t){var n=this,i=e.commit,o=(e.state,t.uid),a=t.sid,c=t.targetUid,f=t.focusType,m=t.followType;return(0,s.default)(u.default.mark(function e(){var t;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=(0,d.default)("/fortune/community/focus",{uid:o,sid:a,targetUid:c,focusType:f}),t.then(function(e){return e.json()}).then(function(e){(0,r.default)(e);i(l.USERFOLLOW,{json:e,followType:m})}).catch(function(e){});case 2:case"end":return e.stop()}},e,n)}))()},getUserDetail:function(e,t){var n=this,i=e.commit;e.state;return(0,s.default)(u.default.mark(function e(){var o;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:o=(0,d.default)("/fortune/community/user-detail",{targetId:t}),o.then(function(e){return e.json()}).then(function(e){(0,r.default)(e);i(l.GETUSERDETAIL,e)}).catch(function(e){});case 2:case"end":return e.stop()}},e,n)}))()},getSendArticleList:function(e,t){var n=this,i=e.commit,o=(e.state,t.targetUid),a=t.page,c=t.pageSize;return(0,s.default)(u.default.mark(function e(){var t;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=(0,d.default)("/fortune/community/send-article-list",{targetId:o,page:a,pageSize:c}),t.then(function(e){return e.json()}).then(function(e){(0,r.default)(e);i(l.SENDARTICLELIST,e)}).catch(function(e){});case 2:case"end":return e.stop()}},e,n)}))()},getDiscussArticleList:function(e,t){var n=this,i=e.commit,o=(e.state,t.targetUid),a=t.page,c=t.pageSize;return(0,s.default)(u.default.mark(function e(){var t;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=(0,d.default)("/fortune/community/discuss-article-list",{targetId:o,page:a,pageSize:c}),t.then(function(e){return e.json()}).then(function(e){(0,r.default)(e);i(l.DISCUSSARTICLELIST,e)}).catch(function(e){});case 2:case"end":return e.stop()}},e,n)}))()},deleteCommentDelte:function(e,t){var n=this,i=e.commit,o=(e.state,t.commentId),a=t.uid,c=t.sid,f=t.type;return(0,s.default)(u.default.mark(function e(){var t;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=(0,d.default)("/fortune/comment/delete-comment",{id:o,type:f,uid:a,sid:c}),t.then(function(e){return e.json()}).then(function(e){(0,r.default)(e);i(l.COMMENTDELETE,e)}).catch(function(e){});case 2:case"end":return e.stop()}},e,n)}))()},getHotArticleComment:function(e,t){var n=this,i=e.commit,o=(e.state,t.articleId),a=t.uid,c=t.sid;return(0,s.default)(u.default.mark(function e(){var t;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=(0,d.default)("/fortune/comment/hot-comment-list",{code:o,type:"community",uid:a,sid:c}),t.then(function(e){return e.json()}).then(function(e){(0,r.default)(e);e.error||i(l.GETHOTARTICLECOMMENT,e)}).catch(function(e){});case 2:case"end":return e.stop()}},e,n)}))()},getFinancialAdvisorInfo:function(e,t){var n=this,i=e.commit,o=(e.state,t.uid),a=t.useDecrypt;return(0,s.default)(u.default.mark(function e(){var t;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=(0,d.default)("/fortune/user/financial-info",{uid:o,useDecrypt:a}),t.then(function(e){return e.json()}).then(function(e){(0,r.default)(e);e.error||i(l.GETFINANCIALADVISORINFO,e)}).catch(function(e){});case 2:case"end":return e.stop()}},e,n)}))()},dynamicUpdateDetail:function(e,t){var n=this,i=e.commit,o=(e.state,t.stateValue),r=t.receivedValue;return(0,s.default)(u.default.mark(function e(){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:o&&i(l.DYNAMICUPDATEBYDETAIL,o,r);case 1:case"end":return e.stop()}},e,n)}))()},getApiRequestTimeStamp:function(e,t){var n=this,i=e.commit,o=(e.state,t.uid),a=t.articleId,c=t.api,f=t.time;return(0,s.default)(u.default.mark(function e(){var t;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=(0,d.default)("/common/report/time",{uid:o,articleId:a,api:c,time:f}),t.then(function(e){return e.json()}).then(function(e){(0,r.default)(e);e.error||i(l.GETAPIREQUSTTIMESTAMP,e)}).catch(function(e){});case 2:case"end":return e.stop()}},e,n)}))()},getRepresentProduct:function(e,t){var n=this,i=e.commit,o=(e.state,t.code),a=t.page,c=t.pageSize;return(0,s.default)(u.default.mark(function e(){var t;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=(0,d.default)("/fortune/pof/manager-product-list",{code:o,page:a,pageSize:c}),t.then(function(e){return e.json()}).then(function(e){(0,r.default)(e);e.error||i(l.GETREPRESENTPRODUCT,e)}).catch(function(e){});case 2:case"end":return e.stop()}},e,n)}))()},updateIsAuthIdentify:function(e,t){var n=e.commit,i=(e.state,t.stateValue);i&&n(l.UPDATEISAUTHIDENTITY,i)}},e.exports=t.default},248:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={},e.exports=t.default},249:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(227),r=i(o),a=n(15),u=i(a),c=n(250),s=i(c),f=n(247),d=i(f),l=n(248),m=i(l);r.default.use(u.default);var p={blockDetail:[],articleList:[],articlePageInfo:[],titleName:"",articleDetail:[],articleComment:[],likeInfo:"",commentLikeInfo:"",articleDeleteInfo:"",commentPageInfo:"",articleDetailError:[],userDetail:[],sendArticleList:[],discussArticleList:[],followCallBackInfo:[],commentDeleteInfo:[],hotArticleComment:[],financialAdvisorInfo:[],representProduct:[],isAuthIdentify:"0"};t.default=new u.default.Store({state:p,getters:m.default,actions:d.default,mutations:s.default}),e.exports=t.default},250:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o,r=n(253),a=i(r),u=n(254),c=i(u),s=n(169);n(12);t.default=(o={},(0,a.default)(o,s.GETBLOCKDETAIL,function(e,t){e.blockDetail=t}),(0,a.default)(o,s.GETARTICLELIST,function(e,t){e.articlePageInfo=t.page;var n=t.items;e.articleList=[e.articleList].concat((0,c.default)(n)),e.titleName="最新"}),(0,a.default)(o,s.NOARTICLE,function(e,t){e.articleDetailError=t}),(0,a.default)(o,s.GETARTICLEDETAIL,function(e,t){e.articleDetail=t}),(0,a.default)(o,s.GETARTICLCOMMENT,function(e,t){e.commentPageInfo=t.page;var n=t.items;1==t.page.current?e.articleComment=n:e.articleComment=[].concat((0,c.default)(e.articleComment),(0,c.default)(n))}),(0,a.default)(o,s.CLICKLIKECOMMIT,function(e,t){e.likeInfo=t}),(0,a.default)(o,s.COMMENTCLICKLIKECOMMIT,function(e,t){1==t&&(t=(new Date).getTime()),e.commentLikeInfo=t}),(0,a.default)(o,s.DELETEARTICLE,function(e,t){e.articleDeleteInfo=t}),(0,a.default)(o,s.GETUSERDETAIL,function(e,t){e.userDetail=t}),(0,a.default)(o,s.SENDARTICLELIST,function(e,t){e.sendArticleList=t}),(0,a.default)(o,s.DISCUSSARTICLELIST,function(e,t){e.discussArticleList=t}),(0,a.default)(o,s.USERFOLLOW,function(e,t){e.followCallBackInfo=t}),(0,a.default)(o,s.COMMENTDELETE,function(e,t){e.commentDeleteInfo=t}),(0,a.default)(o,s.GETHOTARTICLECOMMENT,function(e,t){e.hotArticleComment=t}),(0,a.default)(o,s.GETFINANCIALADVISORINFO,function(e,t){e.financialAdvisorInfo=t}),(0,a.default)(o,s.GETAPIREQUSTTIMESTAMP,function(e,t){}),(0,a.default)(o,s.DYNAMICUPDATEBYDETAIL,function(e,t,n){e.articleDetail[0].redPacket.status=t,e.articleDetail[0].redPacket.received=n}),(0,a.default)(o,s.GETREPRESENTPRODUCT,function(e,t){e.representProduct=t.items}),(0,a.default)(o,s.UPDATEISAUTHIDENTITY,function(e,t){e.isAuthIdentify=t}),o),e.exports=t.default},523:function(e,t){},543:function(e,t,n){var i,o;n(523);var r=n(575);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=r.render,o.staticRenderFns=r.staticRenderFns,e.exports=i},575:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]}}});