var fe=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports);var ze=fe((Ve,et)=>{(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").then(function(e){console.log("ServiceWorker registration successful with scope: ",e.scope)},function(e){console.error("ServiceWorker registration failed: ",e)});var a=function(){var e=window.navigator.userAgent.toLowerCase();return/ipad/.test(e)};if(function(){var e=window.navigator.userAgent.toLowerCase();return/iphone|ipad|ipod/.test(e)}()&&!("standalone"in window.navigator&&window.navigator.standalone)){var t=document.createElement("div");t.style.cssText="display: block;position: fixed;z-index:1000000;padding: 5px 7px;left: 2%;"+(a()?"top:15px;":"bottom: 15px;")+"width: 96%;border-radius: 3px;background-color: #f1f1f1;font-size: 14px;font-family: sans-serif;text-align: center;",t.innerHTML='<span id="triangle-down" style="'+(a()?"opacity:0;":"opacity:1;")+'position: absolute;width: 0;height: 0;bottom: -7px;left: 50%;transform: translateX(-50%);border-left: 7px solid transparent;border-right: 7px solid transparent;border-top: 7px solid #fff;"></span><span>Install this webapp on your device: tap <span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 50 50" height="15px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="15px" xml:space="preserve"><polyline fill="none" points="17,10 25,2 33,10   " stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><line fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" x1="25" x2="25" y1="32" y2="2.333"/><rect fill="none" height="50" width="50"/><path d="M17,17H8v32h34V17h-9" fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/></svg></span> and then Add to homescreen.</span>',window.document.body.appendChild(t),setTimeout(function(){window.document.body.removeChild(t)},4e3)}});/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rt=globalThis,vt=rt.ShadowRoot&&(rt.ShadyCSS===void 0||rt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Bt=Symbol(),Mt=new WeakMap;let me=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==Bt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(vt&&t===void 0){const n=e!==void 0&&e.length===1;n&&(t=Mt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&Mt.set(e,t))}return t}toString(){return this.cssText}};const ve=a=>new me(typeof a=="string"?a:a+"",void 0,Bt),ge=(a,t)=>{if(vt)a.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const n=document.createElement("style"),s=rt.litNonce;s!==void 0&&n.setAttribute("nonce",s),n.textContent=e.cssText,a.appendChild(n)}},Ct=vt?a=>a:a=>a instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return ve(e)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ye,defineProperty:be,getOwnPropertyDescriptor:$e,getOwnPropertyNames:we,getOwnPropertySymbols:_e,getPrototypeOf:Ae}=Object,B=globalThis,St=B.trustedTypes,xe=St?St.emptyScript:"",ut=B.reactiveElementPolyfillSupport,J=(a,t)=>a,st={toAttribute(a,t){switch(t){case Boolean:a=a?xe:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,t){let e=a;switch(t){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},gt=(a,t)=>!ye(a,t),Tt={attribute:!0,type:String,converter:st,reflect:!1,hasChanged:gt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),B.litPropertyMetadata??(B.litPropertyMetadata=new WeakMap);class z extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Tt){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const n=Symbol(),s=this.getPropertyDescriptor(t,n,e);s!==void 0&&be(this.prototype,t,s)}}static getPropertyDescriptor(t,e,n){const{get:s,set:o}=$e(this.prototype,t)??{get(){return this[e]},set(l){this[e]=l}};return{get(){return s==null?void 0:s.call(this)},set(l){const y=s==null?void 0:s.call(this);o.call(this,l),this.requestUpdate(t,y,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Tt}static _$Ei(){if(this.hasOwnProperty(J("elementProperties")))return;const t=Ae(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(J("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(J("properties"))){const e=this.properties,n=[...we(e),..._e(e)];for(const s of n)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[n,s]of e)this.elementProperties.set(n,s)}this._$Eh=new Map;for(const[e,n]of this.elementProperties){const s=this._$Eu(e,n);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const s of n)e.unshift(Ct(s))}else t!==void 0&&e.push(Ct(t));return e}static _$Eu(t,e){const n=e.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const n of e.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ge(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var n;return(n=e.hostConnected)==null?void 0:n.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var n;return(n=e.hostDisconnected)==null?void 0:n.call(e)})}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$EC(t,e){var o;const n=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,n);if(s!==void 0&&n.reflect===!0){const l=(((o=n.converter)==null?void 0:o.toAttribute)!==void 0?n.converter:st).toAttribute(e,n.type);this._$Em=t,l==null?this.removeAttribute(s):this.setAttribute(s,l),this._$Em=null}}_$AK(t,e){var o;const n=this.constructor,s=n._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const l=n.getPropertyOptions(s),y=typeof l.converter=="function"?{fromAttribute:l.converter}:((o=l.converter)==null?void 0:o.fromAttribute)!==void 0?l.converter:st;this._$Em=s,this[s]=y.fromAttribute(e,l.type),this._$Em=null}}requestUpdate(t,e,n){if(t!==void 0){if(n??(n=this.constructor.getPropertyOptions(t)),!(n.hasChanged??gt)(this[t],e))return;this.P(t,e,n)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,n){this._$AL.has(t)||this._$AL.set(t,e),n.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var n;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,l]of this._$Ep)this[o]=l;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,l]of s)l.wrapped!==!0||this._$AL.has(o)||this[o]===void 0||this.P(o,this[o],l)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(n=this._$EO)==null||n.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(e)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(n=>{var s;return(s=n.hostUpdated)==null?void 0:s.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[J("elementProperties")]=new Map,z[J("finalized")]=new Map,ut==null||ut({ReactiveElement:z}),(B.reactiveElementVersions??(B.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const K=globalThis,nt=K.trustedTypes,Pt=nt?nt.createPolicy("lit-html",{createHTML:a=>a}):void 0,Lt="$lit$",U=`lit$${(Math.random()+"").slice(9)}$`,Ft="?"+U,Ee=`<${Ft}>`,j=document,X=()=>j.createComment(""),Q=a=>a===null||typeof a!="object"&&typeof a!="function",Ht=Array.isArray,Me=a=>Ht(a)||typeof(a==null?void 0:a[Symbol.iterator])=="function",pt=`[ 	
\f\r]`,G=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ot=/-->/g,Nt=/>/g,F=RegExp(`>|${pt}(?:([^\\s"'>=/]+)(${pt}*=${pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Rt=/'/g,kt=/"/g,jt=/^(?:script|style|textarea|title)$/i,Ce=a=>(t,...e)=>({_$litType$:a,strings:t,values:e}),q=Ce(1),V=Symbol.for("lit-noChange"),C=Symbol.for("lit-nothing"),It=new WeakMap,H=j.createTreeWalker(j,129);function Dt(a,t){if(!Array.isArray(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return Pt!==void 0?Pt.createHTML(t):t}const Se=(a,t)=>{const e=a.length-1,n=[];let s,o=t===2?"<svg>":"",l=G;for(let y=0;y<e;y++){const u=a[y];let _,E,b=-1,P=0;for(;P<u.length&&(l.lastIndex=P,E=l.exec(u),E!==null);)P=l.lastIndex,l===G?E[1]==="!--"?l=Ot:E[1]!==void 0?l=Nt:E[2]!==void 0?(jt.test(E[2])&&(s=RegExp("</"+E[2],"g")),l=F):E[3]!==void 0&&(l=F):l===F?E[0]===">"?(l=s??G,b=-1):E[1]===void 0?b=-2:(b=l.lastIndex-E[2].length,_=E[1],l=E[3]===void 0?F:E[3]==='"'?kt:Rt):l===kt||l===Rt?l=F:l===Ot||l===Nt?l=G:(l=F,s=void 0);const R=l===F&&a[y+1].startsWith("/>")?" ":"";o+=l===G?u+Ee:b>=0?(n.push(_),u.slice(0,b)+Lt+u.slice(b)+U+R):u+U+(b===-2?y:R)}return[Dt(a,o+(a[e]||"<?>")+(t===2?"</svg>":"")),n]};class Y{constructor({strings:t,_$litType$:e},n){let s;this.parts=[];let o=0,l=0;const y=t.length-1,u=this.parts,[_,E]=Se(t,e);if(this.el=Y.createElement(_,n),H.currentNode=this.el.content,e===2){const b=this.el.content.firstChild;b.replaceWith(...b.childNodes)}for(;(s=H.nextNode())!==null&&u.length<y;){if(s.nodeType===1){if(s.hasAttributes())for(const b of s.getAttributeNames())if(b.endsWith(Lt)){const P=E[l++],R=s.getAttribute(b).split(U),D=/([.?@])?(.*)/.exec(P);u.push({type:1,index:o,name:D[2],strings:R,ctor:D[1]==="."?Pe:D[1]==="?"?Oe:D[1]==="@"?Ne:ot}),s.removeAttribute(b)}else b.startsWith(U)&&(u.push({type:6,index:o}),s.removeAttribute(b));if(jt.test(s.tagName)){const b=s.textContent.split(U),P=b.length-1;if(P>0){s.textContent=nt?nt.emptyScript:"";for(let R=0;R<P;R++)s.append(b[R],X()),H.nextNode(),u.push({type:2,index:++o});s.append(b[P],X())}}}else if(s.nodeType===8)if(s.data===Ft)u.push({type:2,index:o});else{let b=-1;for(;(b=s.data.indexOf(U,b+1))!==-1;)u.push({type:7,index:o}),b+=U.length-1}o++}}static createElement(t,e){const n=j.createElement("template");return n.innerHTML=t,n}}function Z(a,t,e=a,n){var l,y;if(t===V)return t;let s=n!==void 0?(l=e._$Co)==null?void 0:l[n]:e._$Cl;const o=Q(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((y=s==null?void 0:s._$AO)==null||y.call(s,!1),o===void 0?s=void 0:(s=new o(a),s._$AT(a,e,n)),n!==void 0?(e._$Co??(e._$Co=[]))[n]=s:e._$Cl=s),s!==void 0&&(t=Z(a,s._$AS(a,t.values),s,n)),t}class Te{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:n}=this._$AD,s=((t==null?void 0:t.creationScope)??j).importNode(e,!0);H.currentNode=s;let o=H.nextNode(),l=0,y=0,u=n[0];for(;u!==void 0;){if(l===u.index){let _;u.type===2?_=new tt(o,o.nextSibling,this,t):u.type===1?_=new u.ctor(o,u.name,u.strings,this,t):u.type===6&&(_=new Re(o,this,t)),this._$AV.push(_),u=n[++y]}l!==(u==null?void 0:u.index)&&(o=H.nextNode(),l++)}return H.currentNode=j,s}p(t){let e=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}}class tt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,n,s){this.type=2,this._$AH=C,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),Q(t)?t===C||t==null||t===""?(this._$AH!==C&&this._$AR(),this._$AH=C):t!==this._$AH&&t!==V&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Me(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==C&&Q(this._$AH)?this._$AA.nextSibling.data=t:this.T(j.createTextNode(t)),this._$AH=t}$(t){var o;const{values:e,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Y.createElement(Dt(n.h,n.h[0]),this.options)),n);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(e);else{const l=new Te(s,this),y=l.u(this.options);l.p(e),this.T(y),this._$AH=l}}_$AC(t){let e=It.get(t.strings);return e===void 0&&It.set(t.strings,e=new Y(t)),e}k(t){Ht(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let n,s=0;for(const o of t)s===e.length?e.push(n=new tt(this.S(X()),this.S(X()),this,this.options)):n=e[s],n._$AI(o),s++;s<e.length&&(this._$AR(n&&n._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var n;for((n=this._$AP)==null?void 0:n.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class ot{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,s,o){this.type=1,this._$AH=C,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=C}_$AI(t,e=this,n,s){const o=this.strings;let l=!1;if(o===void 0)t=Z(this,t,e,0),l=!Q(t)||t!==this._$AH&&t!==V,l&&(this._$AH=t);else{const y=t;let u,_;for(t=o[0],u=0;u<o.length-1;u++)_=Z(this,y[n+u],e,u),_===V&&(_=this._$AH[u]),l||(l=!Q(_)||_!==this._$AH[u]),_===C?t=C:t!==C&&(t+=(_??"")+o[u+1]),this._$AH[u]=_}l&&!s&&this.j(t)}j(t){t===C?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Pe extends ot{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===C?void 0:t}}class Oe extends ot{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==C)}}class Ne extends ot{constructor(t,e,n,s,o){super(t,e,n,s,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??C)===V)return;const n=this._$AH,s=t===C&&n!==C||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==C&&(n===C||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Re{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const ft=K.litHtmlPolyfillSupport;ft==null||ft(Y,tt),(K.litHtmlVersions??(K.litHtmlVersions=[])).push("3.1.2");const ke=(a,t,e)=>{const n=(e==null?void 0:e.renderBefore)??t;let s=n._$litPart$;if(s===void 0){const o=(e==null?void 0:e.renderBefore)??null;n._$litPart$=s=new tt(t.insertBefore(X(),o),o,void 0,e??{})}return s._$AI(a),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class W extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ke(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return V}}var Ut;W._$litElement$=!0,W.finalized=!0,(Ut=globalThis.litElementHydrateSupport)==null||Ut.call(globalThis,{LitElement:W});const mt=globalThis.litElementPolyfillSupport;mt==null||mt({LitElement:W});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zt=a=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(a,t)}):customElements.define(a,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ie={attribute:!0,type:String,converter:st,reflect:!1,hasChanged:gt},Ue=(a=Ie,t,e)=>{const{kind:n,metadata:s}=e;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),o.set(e.name,a),n==="accessor"){const{name:l}=e;return{set(y){const u=t.get.call(this);t.set.call(this,y),this.requestUpdate(l,u,a)},init(y){return y!==void 0&&this.P(l,void 0,a),y}}}if(n==="setter"){const{name:l}=e;return function(y){const u=this[l];t.call(this,y),this.requestUpdate(l,u,a)}}throw Error("Unsupported decorator location: "+n)};function lt(a){return(t,e)=>typeof e=="object"?Ue(a,t,e):((n,s,o)=>{const l=s.hasOwnProperty(o);return s.constructor.createProperty(o,l?{...n,wrapped:!0}:n),l?Object.getOwnPropertyDescriptor(s,o):void 0})(a,t,e)}var et={};(function a(t,e,n,s){var o=!!(t.Worker&&t.Blob&&t.Promise&&t.OffscreenCanvas&&t.OffscreenCanvasRenderingContext2D&&t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype.transferControlToOffscreen&&t.URL&&t.URL.createObjectURL),l=typeof Path2D=="function"&&typeof DOMMatrix=="function",y=function(){if(!t.OffscreenCanvas)return!1;var i=new OffscreenCanvas(1,1),r=i.getContext("2d");r.fillRect(0,0,1,1);var c=i.transferToImageBitmap();try{r.createPattern(c,"no-repeat")}catch{return!1}return!0}();function u(){}function _(i){var r=e.exports.Promise,c=r!==void 0?r:t.Promise;return typeof c=="function"?new c(i):(i(u,u),null)}var E=function(i,r){return{transform:function(c){if(i)return c;if(r.has(c))return r.get(c);var d=new OffscreenCanvas(c.width,c.height),p=d.getContext("2d");return p.drawImage(c,0,0),r.set(c,d),d},clear:function(){r.clear()}}}(y,new Map),b=function(){var i=Math.floor(16.666666666666668),r,c,d={},p=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(r=function(f){var m=Math.random();return d[m]=requestAnimationFrame(function h(v){p===v||p+i-1<v?(p=v,delete d[m],f()):d[m]=requestAnimationFrame(h)}),m},c=function(f){d[f]&&cancelAnimationFrame(d[f])}):(r=function(f){return setTimeout(f,i)},c=function(f){return clearTimeout(f)}),{frame:r,cancel:c}}(),P=function(){var i,r,c={};function d(p){function f(m,h){p.postMessage({options:m||{},callback:h})}p.init=function(h){var v=h.transferControlToOffscreen();p.postMessage({canvas:v},[v])},p.fire=function(h,v,$){if(r)return f(h,null),r;var A=Math.random().toString(36).slice(2);return r=_(function(w){function x(S){S.data.callback===A&&(delete c[A],p.removeEventListener("message",x),r=null,E.clear(),$(),w())}p.addEventListener("message",x),f(h,A),c[A]=x.bind(null,{data:{callback:A}})}),r},p.reset=function(){p.postMessage({reset:!0});for(var h in c)c[h](),delete c[h]}}return function(){if(i)return i;if(!n&&o){var p=["var CONFETTI, SIZE = {}, module = {};","("+a.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{i=new Worker(URL.createObjectURL(new Blob([p])))}catch(f){return typeof console!==void 0&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",f),null}d(i)}return i}}(),R={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function D(i,r){return r?r(i):i}function qt(i){return i!=null}function M(i,r,c){return D(i&&qt(i[r])?i[r]:R[r],c)}function Wt(i){return i<0?0:Math.floor(i)}function Vt(i,r){return Math.floor(Math.random()*(r-i))+i}function ct(i){return parseInt(i,16)}function Zt(i){return i.map(Gt)}function Gt(i){var r=String(i).replace(/[^0-9a-f]/gi,"");return r.length<6&&(r=r[0]+r[0]+r[1]+r[1]+r[2]+r[2]),{r:ct(r.substring(0,2)),g:ct(r.substring(2,4)),b:ct(r.substring(4,6))}}function Jt(i){var r=M(i,"origin",Object);return r.x=M(r,"x",Number),r.y=M(r,"y",Number),r}function Kt(i){i.width=document.documentElement.clientWidth,i.height=document.documentElement.clientHeight}function Xt(i){var r=i.getBoundingClientRect();i.width=r.width,i.height=r.height}function Qt(i){var r=document.createElement("canvas");return r.style.position="fixed",r.style.top="0px",r.style.left="0px",r.style.pointerEvents="none",r.style.zIndex=i,r}function Yt(i,r,c,d,p,f,m,h,v){i.save(),i.translate(r,c),i.rotate(f),i.scale(d,p),i.arc(0,0,1,m,h,v),i.restore()}function te(i){var r=i.angle*(Math.PI/180),c=i.spread*(Math.PI/180);return{x:i.x,y:i.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:i.startVelocity*.5+Math.random()*i.startVelocity,angle2D:-r+(.5*c-Math.random()*c),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:i.color,shape:i.shape,tick:0,totalTicks:i.ticks,decay:i.decay,drift:i.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:i.gravity*3,ovalScalar:.6,scalar:i.scalar,flat:i.flat}}function ee(i,r){r.x+=Math.cos(r.angle2D)*r.velocity+r.drift,r.y+=Math.sin(r.angle2D)*r.velocity+r.gravity,r.velocity*=r.decay,r.flat?(r.wobble=0,r.wobbleX=r.x+10*r.scalar,r.wobbleY=r.y+10*r.scalar,r.tiltSin=0,r.tiltCos=0,r.random=1):(r.wobble+=r.wobbleSpeed,r.wobbleX=r.x+10*r.scalar*Math.cos(r.wobble),r.wobbleY=r.y+10*r.scalar*Math.sin(r.wobble),r.tiltAngle+=.1,r.tiltSin=Math.sin(r.tiltAngle),r.tiltCos=Math.cos(r.tiltAngle),r.random=Math.random()+2);var c=r.tick++/r.totalTicks,d=r.x+r.random*r.tiltCos,p=r.y+r.random*r.tiltSin,f=r.wobbleX+r.random*r.tiltCos,m=r.wobbleY+r.random*r.tiltSin;if(i.fillStyle="rgba("+r.color.r+", "+r.color.g+", "+r.color.b+", "+(1-c)+")",i.beginPath(),l&&r.shape.type==="path"&&typeof r.shape.path=="string"&&Array.isArray(r.shape.matrix))i.fill(se(r.shape.path,r.shape.matrix,r.x,r.y,Math.abs(f-d)*.1,Math.abs(m-p)*.1,Math.PI/10*r.wobble));else if(r.shape.type==="bitmap"){var h=Math.PI/10*r.wobble,v=Math.abs(f-d)*.1,$=Math.abs(m-p)*.1,A=r.shape.bitmap.width*r.scalar,w=r.shape.bitmap.height*r.scalar,x=new DOMMatrix([Math.cos(h)*v,Math.sin(h)*v,-Math.sin(h)*$,Math.cos(h)*$,r.x,r.y]);x.multiplySelf(new DOMMatrix(r.shape.matrix));var S=i.createPattern(E.transform(r.shape.bitmap),"no-repeat");S.setTransform(x),i.globalAlpha=1-c,i.fillStyle=S,i.fillRect(r.x-A/2,r.y-w/2,A,w),i.globalAlpha=1}else if(r.shape==="circle")i.ellipse?i.ellipse(r.x,r.y,Math.abs(f-d)*r.ovalScalar,Math.abs(m-p)*r.ovalScalar,Math.PI/10*r.wobble,0,2*Math.PI):Yt(i,r.x,r.y,Math.abs(f-d)*r.ovalScalar,Math.abs(m-p)*r.ovalScalar,Math.PI/10*r.wobble,0,2*Math.PI);else if(r.shape==="star")for(var g=Math.PI/2*3,T=4*r.scalar,O=8*r.scalar,N=r.x,I=r.y,L=5,k=Math.PI/L;L--;)N=r.x+Math.cos(g)*O,I=r.y+Math.sin(g)*O,i.lineTo(N,I),g+=k,N=r.x+Math.cos(g)*T,I=r.y+Math.sin(g)*T,i.lineTo(N,I),g+=k;else i.moveTo(Math.floor(r.x),Math.floor(r.y)),i.lineTo(Math.floor(r.wobbleX),Math.floor(p)),i.lineTo(Math.floor(f),Math.floor(m)),i.lineTo(Math.floor(d),Math.floor(r.wobbleY));return i.closePath(),i.fill(),r.tick<r.totalTicks}function re(i,r,c,d,p){var f=r.slice(),m=i.getContext("2d"),h,v,$=_(function(A){function w(){h=v=null,m.clearRect(0,0,d.width,d.height),E.clear(),p(),A()}function x(){n&&!(d.width===s.width&&d.height===s.height)&&(d.width=i.width=s.width,d.height=i.height=s.height),!d.width&&!d.height&&(c(i),d.width=i.width,d.height=i.height),m.clearRect(0,0,d.width,d.height),f=f.filter(function(S){return ee(m,S)}),f.length?h=b.frame(x):w()}h=b.frame(x),v=w});return{addFettis:function(A){return f=f.concat(A),$},canvas:i,promise:$,reset:function(){h&&b.cancel(h),v&&v()}}}function $t(i,r){var c=!i,d=!!M(r||{},"resize"),p=!1,f=M(r,"disableForReducedMotion",Boolean),m=o&&!!M(r||{},"useWorker"),h=m?P():null,v=c?Kt:Xt,$=i&&h?!!i.__confetti_initialized:!1,A=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,w;function x(g,T,O){for(var N=M(g,"particleCount",Wt),I=M(g,"angle",Number),L=M(g,"spread",Number),k=M(g,"startVelocity",Number),ae=M(g,"decay",Number),oe=M(g,"gravity",Number),le=M(g,"drift",Number),_t=M(g,"colors",Zt),ce=M(g,"ticks",Number),At=M(g,"shapes"),he=M(g,"scalar"),de=!!M(g,"flat"),xt=Jt(g),Et=N,dt=[],ue=i.width*xt.x,pe=i.height*xt.y;Et--;)dt.push(te({x:ue,y:pe,angle:I,spread:L,startVelocity:k,color:_t[Et%_t.length],shape:At[Vt(0,At.length)],ticks:ce,decay:ae,gravity:oe,drift:le,scalar:he,flat:de}));return w?w.addFettis(dt):(w=re(i,dt,v,T,O),w.promise)}function S(g){var T=f||M(g,"disableForReducedMotion",Boolean),O=M(g,"zIndex",Number);if(T&&A)return _(function(k){k()});c&&w?i=w.canvas:c&&!i&&(i=Qt(O),document.body.appendChild(i)),d&&!$&&v(i);var N={width:i.width,height:i.height};h&&!$&&h.init(i),$=!0,h&&(i.__confetti_initialized=!0);function I(){if(h){var k={getBoundingClientRect:function(){if(!c)return i.getBoundingClientRect()}};v(k),h.postMessage({resize:{width:k.width,height:k.height}});return}N.width=N.height=null}function L(){w=null,d&&(p=!1,t.removeEventListener("resize",I)),c&&i&&(document.body.contains(i)&&document.body.removeChild(i),i=null,$=!1)}return d&&!p&&(p=!0,t.addEventListener("resize",I,!1)),h?h.fire(g,N,L):x(g,N,L)}return S.reset=function(){h&&h.reset(),w&&w.reset()},S}var ht;function wt(){return ht||(ht=$t(null,{useWorker:!0,resize:!0})),ht}function se(i,r,c,d,p,f,m){var h=new Path2D(i),v=new Path2D;v.addPath(h,new DOMMatrix(r));var $=new Path2D;return $.addPath(v,new DOMMatrix([Math.cos(m)*p,Math.sin(m)*p,-Math.sin(m)*f,Math.cos(m)*f,c,d])),$}function ne(i){if(!l)throw new Error("path confetti are not supported in this browser");var r,c;typeof i=="string"?r=i:(r=i.path,c=i.matrix);var d=new Path2D(r),p=document.createElement("canvas"),f=p.getContext("2d");if(!c){for(var m=1e3,h=m,v=m,$=0,A=0,w,x,S=0;S<m;S+=2)for(var g=0;g<m;g+=2)f.isPointInPath(d,S,g,"nonzero")&&(h=Math.min(h,S),v=Math.min(v,g),$=Math.max($,S),A=Math.max(A,g));w=$-h,x=A-v;var T=10,O=Math.min(T/w,T/x);c=[O,0,0,O,-Math.round(w/2+h)*O,-Math.round(x/2+v)*O]}return{type:"path",path:r,matrix:c}}function ie(i){var r,c=1,d="#000000",p='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof i=="string"?r=i:(r=i.text,c="scalar"in i?i.scalar:c,p="fontFamily"in i?i.fontFamily:p,d="color"in i?i.color:d);var f=10*c,m=""+f+"px "+p,h=new OffscreenCanvas(f,f),v=h.getContext("2d");v.font=m;var $=v.measureText(r),A=Math.ceil($.actualBoundingBoxRight+$.actualBoundingBoxLeft),w=Math.ceil($.actualBoundingBoxAscent+$.actualBoundingBoxDescent),x=2,S=$.actualBoundingBoxLeft+x,g=$.actualBoundingBoxAscent+x;A+=x+x,w+=x+x,h=new OffscreenCanvas(A,w),v=h.getContext("2d"),v.font=m,v.fillStyle=d,v.fillText(r,S,g);var T=1/c;return{type:"bitmap",bitmap:h.transferToImageBitmap(),matrix:[T,0,0,T,-A*T/2,-w*T/2]}}e.exports=function(){return wt().apply(this,arguments)},e.exports.reset=function(){wt().reset()},e.exports.create=$t,e.exports.shapeFromPath=ne,e.exports.shapeFromText=ie})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),et,!1);const Be=et.exports;et.exports.create;var Le={VITE_CANISTER_ORIGIN:"http://be2us-64aaa-aaaaa-qaabq-cai.localhost:8000",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},Fe=Object.defineProperty,He=Object.getOwnPropertyDescriptor,yt=(a,t,e,n)=>{for(var s=n>1?void 0:n?He(t,e):t,o=a.length-1,l;o>=0;o--)(l=a[o])&&(s=(n?l(t,e,s):l(s))||s);return n&&s&&Fe(t,e,s),s};let it=class extends W{constructor(){super(),this.loading=!1,this.textButton="Create my nft 😄",this.imgSrcToArrayBuffer=async a=>{const t=await new Promise(e=>{const n=new FileReader;n.onloadend=()=>{e(n.result)},n.readAsArrayBuffer(a)});return new Uint8Array(t)},this.sendRequestForCreateNft=async a=>{const{VITE_CANISTER_ORIGIN:t}=Le,e=await this.imgSrcToArrayBuffer(a.img),s={minter:"zrzlu-77t5u-6mmw7-zpbko-j73cv-fh5aq-wgjyr-w7but-3nars-j4lul-nae",metadata:[{data:Array.from(e),purpose:{Rendered:null},key_val_data:[{key:"name",val:{TextContent:a.name}},{key:"description",val:{TextContent:a.description}}]}]};return await(await fetch(`${t}/v1/nft/mint`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})).json()},this.handleSubmitCreateNft=async a=>{a.preventDefault();const t=new FormData(a.target),e=Object.fromEntries(t.entries());this.loading=!0;try{if((await this.sendRequestForCreateNft(e)).Ok){Be(),this._createEvent("add-nfts-total");const s=this.textButton;this.textButton="Nft created 🥳🥳",setTimeout(()=>{this.textButton=s},1e3)}}catch{const s=this.textButton;this.textButton="There was a mistake 😢😥",setTimeout(()=>{this.textButton=s},1e3)}this.loading=!1},this.render=()=>q`
  <section data-bs-version="5.1" class="list1 cid-ugXsidhq15" id="list02-1i">	  
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-12 col-md-12 col-lg-10 m-auto">
					<div class="content">
						<div class="row justify-content-center mb-5">
							<div class="col-12 content-head">
								<div class="mbr-section-head">
									<h4 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
										<strong>Create NFT</strong></h4>
								</div>
							</div>
						</div>
						<form @submit=${this.handleSubmitCreateNft}>
							<div class="mb-3">
								<label for="nft-name" class="form-label">NFT's name</label>
								<input required type="text" name="name" class="form-control" id="nft-name" aria-describedby="nftNameHelp">
								<div id="nftNameHelp" class="form-text">Write a funny and unique name.</div>
							</div>
							<div class="mb-3">
								<label for="nft-description" class="form-label">Description</label>
								<input required type="text" name="description" class="form-control" id="nft-description" aria-describedby="nftNameHelp">
								<div id="nftNameHelp" class="form-text">You're creative and make a description for your NFT.</div>
							</div>
							<div class="mb-3">
								<label for="nft" class="form-label">Upload a image of your NFT</label>
								<input required name="img" class="form-control" type="file" id="formFile">
							</div>
							<div class="d-flex align-items-center gap-2">
								<button type="submit" class="btn ms-0 btn-primary">${this.textButton}</button>
                ${this.loading?q`<div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`:q``}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>`}createRenderRoot(){return this}_createEvent(a,t){const e=new CustomEvent(a,{bubbles:!0,composed:!0,detail:t});this.dispatchEvent(e)}};yt([lt()],it.prototype,"loading",2);yt([lt()],it.prototype,"textButton",2);it=yt([zt("nft-form")],it);var je=Object.defineProperty,De=Object.getOwnPropertyDescriptor,bt=(a,t,e,n)=>{for(var s=n>1?void 0:n?De(t,e):t,o=a.length-1,l;o>=0;o--)(l=a[o])&&(s=(n?l(t,e,s):l(s))||s);return n&&s&&je(t,e,s),s};let at=class extends W{constructor(){super(),this.sortedTransactions={},this.transactions=[],this.nftsTotal=0,this.getNftsTotal=async()=>{const t=await(await fetch("http://be2us-64aaa-aaaaa-qaabq-cai.localhost:8000/v1/nft/total")).text();this.nftsTotal=+t},this.handleAddNftsTotal=()=>{this.nftsTotal++},this.getAllTransaction(),this.getNftsTotal()}async getAllTransaction(){const t=await(await fetch("http://be2us-64aaa-aaaaa-qaabq-cai.localhost:8000/v1/tickets/all/sorted")).json();this.sortedTransactions=t,this.transactions=t}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),window.addEventListener("add-nfts-total",this.handleAddNftsTotal)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("add-nfts-total",this.handleAddNftsTotal)}render(){return q`

            <section data-bs-version="5.1" class="counter1 counters cid-ugXs5vm9Vt pt-3" id="counter1-1h">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-12 content-head">
                    <div class="card-wrapper mb-5">
                      <div class="card-box align-center">

                        <button type="button" class="btn btn-primary" @click=${this.getAllTransaction}>
                          Fetch all transactions
                        </button>

                        <h5 class="mbr-section-title mbr-fonts-style mb-4 display-1" style="font-weight: 700; font-size: 64px; font-family: Inter Tight, sans-serif; text-align: center;">
                          Transactions
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row content-row mt-4">
                  <div class="item features-without-image col-12 col-md-6 col-lg-3 item-mb" style="text-align: center;">
                    <div class="item-wrapper">
                      <div class="title mb-3">
                        <h3 class="count mbr-fonts-style display-1">
                          <span style="color: #9fe870; font-weight: 700; text-align: center;" class="align-center">
                            ${Object.keys(this.sortedTransactions).length}
                          </span>
                        </h3>
                      </div>
                      <h4 class="card-title mbr-fonts-style display-5">
                        <span style="font-weight: 700; font-size: 31.168px; text-align: center;">
                          <strong>Received</strong>
                        </span>
                      </h4>
                    </div>
                  </div>
                  <div class="item features-without-image col-12 col-md-6 col-lg-3 item-mb" style="text-align: center;">
                    <div class="item-wrapper">
                      <div class="title mb-3">
                        <h3 class="count mbr-fonts-style display-1">
                          <span style="color: #9fe870; font-weight: 700; text-align: center;" class="align-center">
                            ${Object.keys(this.sortedTransactions).length}
                          </span>
                        </h3>
                      </div>
                      <h4 class="card-title mbr-fonts-style display-5">
                        <span style="font-weight: 700; font-size: 31.168px; text-align: center;">
                          <strong>Processed</strong>
                        </span>
                      </h4>
                    </div>
                  </div>
                  <div class="item features-without-image col-12 col-md-6 col-lg-3 item-mb" style="text-align: center;">
                    <div class="item-wrapper">
                      <div class="title mb-3">
                        <h3 class="count mbr-fonts-style display-1">
                          <span style="color: #9fe870; font-weight: 700; text-align: center;" class="align-center">
                            ${this.nftsTotal}
                          </span>
                        </h3>
                      </div>
                      <h4 class="card-title mbr-fonts-style display-5">
                        <span style="font-weight: 700; font-size: 31.168px; text-align: center;">
                          <strong>NFTs Created</strong>
                        </span>
                      </h4>
                    </div>
                  </div>
                  <div class="item features-without-image col-12 col-md-6 col-lg-3 item-mb" style="text-align: center;">
                    <div class="item-wrapper">
                      <div class="title mb-3">
                        <h3 class="count mbr-fonts-style display-1">
                          <span style="color: #9fe870; font-weight: 700; text-align: center;" class="align-center">
                            ${this.nftsTotal}
                          </span>
                        </h3>
                      </div>
                      <h4 class="card-title mbr-fonts-style display-5">
                        <span style="font-weight: 700; font-size: 31.168px; text-align: center;">
                          <strong>Active NFTs</strong>
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <br><br>
            
            <div class="container">
              ${this.transactions.map(a=>q`
                <div class="card my-3">
                  <div class="card-header">
                    <strong>Order ID:</strong> <span class="badge bg-primary">${a.orderId}</span>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">
                      <span style="color: #52007D">
                        Event: ${a.event.eventName}
                      </span>
                    </h5>
                    <p class="card-text">
                      <strong>Status:</strong> <span class="badge bg-success">${a.status}</span><br>
                      <strong>Operation:</strong> ${a.operation}<br>
                      <strong>Company ID:</strong> ${a.companyId}<br>
                      <strong>User Name:</strong> ${a.user.name}<br>
                      <strong>Email:</strong> ${a.user.email}<br>
                      <strong>Phone:</strong> ${a.user.phone}
                    </p>
                    <h5>Event Details</h5>
                    <p>
                      <strong>Event ID:</strong> ${a.event.eventId}<br>
                      <strong>Artist:</strong> ${a.event.eventArtist}<br>
                      <strong>Venue:</strong> ${a.event.eventVenue}<br>
                      <strong>Country:</strong> ${a.event.eventCountry}<br>
                      <strong>GPS:</strong> ${a.event.eventVenueGPS}<br>
                      <strong>Date and Time:</strong> ${a.event.eventDateTime}<br>
                      <strong>Promoter:</strong> ${a.event.eventPromoterCompany}<br><br>                      
                      <strong>Information:</strong><br>
                      <p><u>${a.event.eventInformation}</u></p>
                    </p>
                    <h5>Seats</h5>
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>Section</th>
                          <th>Row</th>
                          <th>Seat</th>
                          <th>Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${a.seats.map(t=>q`
                          <tr>
                            <td>${t.ticket.ticketSection}</td>
                            <td>${t.ticket.ticketRow}</td>
                            <td>${t.ticket.ticketSeat}</td>
                            <td>${t.ticket.ticketPrice}</td>
                            <td>${t.ticket.ticketTotal}</td>
                          </tr>
                        `)}
                      </tbody>
                    </table>
                  </div>
                </div>
              `)}
            </div>


            <nft-form nftsTotal=${this.nftsTotal}></nft-form>
    `}};bt([lt()],at.prototype,"sortedTransactions",2);bt([lt()],at.prototype,"nftsTotal",2);at=bt([zt("azle-app")],at)});export default ze();
