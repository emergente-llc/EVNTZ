var ye=(u,a)=>()=>(a||u((a={exports:{}}).exports,a),a.exports);var Se=ye((Oe,L)=>{(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const f of document.querySelectorAll('link[rel="modulepreload"]'))M(f);new MutationObserver(f=>{for(const w of f)if(w.type==="childList")for(const C of w.addedNodes)C.tagName==="LINK"&&C.rel==="modulepreload"&&M(C)}).observe(document,{childList:!0,subtree:!0});function h(f){const w={};return f.integrity&&(w.integrity=f.integrity),f.referrerPolicy&&(w.referrerPolicy=f.referrerPolicy),f.crossOrigin==="use-credentials"?w.credentials="include":f.crossOrigin==="anonymous"?w.credentials="omit":w.credentials="same-origin",w}function M(f){if(f.ep)return;f.ep=!0;const w=h(f);fetch(f.href,w)}})();"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").then(function(h){console.log("ServiceWorker registration successful with scope: ",h.scope)},function(h){console.error("ServiceWorker registration failed: ",h)});var u=function(){var h=window.navigator.userAgent.toLowerCase();return/ipad/.test(h)};if(function(){var h=window.navigator.userAgent.toLowerCase();return/iphone|ipad|ipod/.test(h)}()&&!("standalone"in window.navigator&&window.navigator.standalone)){var a=document.createElement("div");a.style.cssText="display: block;position: fixed;z-index:1000000;padding: 5px 7px;left: 2%;"+(u()?"top:15px;":"bottom: 15px;")+"width: 96%;border-radius: 3px;background-color: #f1f1f1;font-size: 14px;font-family: sans-serif;text-align: center;",a.innerHTML='<span id="triangle-down" style="'+(u()?"opacity:0;":"opacity:1;")+'position: absolute;width: 0;height: 0;bottom: -7px;left: 50%;transform: translateX(-50%);border-left: 7px solid transparent;border-right: 7px solid transparent;border-top: 7px solid #fff;"></span><span>Install this webapp on your device: tap <span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 50 50" height="15px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="15px" xml:space="preserve"><polyline fill="none" points="17,10 25,2 33,10   " stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><line fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" x1="25" x2="25" y1="32" y2="2.333"/><rect fill="none" height="50" width="50"/><path d="M17,17H8v32h34V17h-9" fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/></svg></span> and then Add to homescreen.</span>',window.document.body.appendChild(a),setTimeout(function(){window.document.body.removeChild(a)},4e3)}});var L={};(function u(a,h,M,f){var w=!!(a.Worker&&a.Blob&&a.Promise&&a.OffscreenCanvas&&a.OffscreenCanvasRenderingContext2D&&a.HTMLCanvasElement&&a.HTMLCanvasElement.prototype.transferControlToOffscreen&&a.URL&&a.URL.createObjectURL),C=typeof Path2D=="function"&&typeof DOMMatrix=="function",O=function(){if(!a.OffscreenCanvas)return!1;var r=new OffscreenCanvas(1,1),e=r.getContext("2d");e.fillRect(0,0,1,1);var t=r.transferToImageBitmap();try{e.createPattern(t,"no-repeat")}catch{return!1}return!0}();function R(){}function P(r){var e=h.exports.Promise,t=e!==void 0?e:a.Promise;return typeof t=="function"?new t(r):(r(R,R),null)}var A=function(r,e){return{transform:function(t){if(r)return t;if(e.has(t))return e.get(t);var o=new OffscreenCanvas(t.width,t.height),i=o.getContext("2d");return i.drawImage(t,0,0),e.set(t,o),o},clear:function(){e.clear()}}}(O,new Map),F=function(){var r=Math.floor(16.666666666666668),e,t,o={},i=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(e=function(s){var l=Math.random();return o[l]=requestAnimationFrame(function n(c){i===c||i+r-1<c?(i=c,delete o[l],s()):o[l]=requestAnimationFrame(n)}),l},t=function(s){o[s]&&cancelAnimationFrame(o[s])}):(e=function(s){return setTimeout(s,r)},t=function(s){return clearTimeout(s)}),{frame:e,cancel:t}}(),H=function(){var r,e,t={};function o(i){function s(l,n){i.postMessage({options:l||{},callback:n})}i.init=function(n){var c=n.transferControlToOffscreen();i.postMessage({canvas:c},[c])},i.fire=function(n,c,m){if(e)return s(n,null),e;var p=Math.random().toString(36).slice(2);return e=P(function(v){function g(b){b.data.callback===p&&(delete t[p],i.removeEventListener("message",g),e=null,A.clear(),m(),v())}i.addEventListener("message",g),s(n,p),t[p]=g.bind(null,{data:{callback:p}})}),e},i.reset=function(){i.postMessage({reset:!0});for(var n in t)t[n](),delete t[n]}}return function(){if(r)return r;if(!M&&w){var i=["var CONFETTI, SIZE = {}, module = {};","("+u.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{r=new Worker(URL.createObjectURL(new Blob([i])))}catch(s){return typeof console!==void 0&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",s),null}o(r)}return r}}(),$={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function Z(r,e){return e?e(r):r}function G(r){return r!=null}function y(r,e,t){return Z(r&&G(r[e])?r[e]:$[e],t)}function J(r){return r<0?0:Math.floor(r)}function K(r,e){return Math.floor(Math.random()*(e-r))+r}function N(r){return parseInt(r,16)}function Q(r){return r.map(X)}function X(r){var e=String(r).replace(/[^0-9a-f]/gi,"");return e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),{r:N(e.substring(0,2)),g:N(e.substring(2,4)),b:N(e.substring(4,6))}}function Y(r){var e=y(r,"origin",Object);return e.x=y(e,"x",Number),e.y=y(e,"y",Number),e}function ee(r){r.width=document.documentElement.clientWidth,r.height=document.documentElement.clientHeight}function re(r){var e=r.getBoundingClientRect();r.width=e.width,r.height=e.height}function ae(r){var e=document.createElement("canvas");return e.style.position="fixed",e.style.top="0px",e.style.left="0px",e.style.pointerEvents="none",e.style.zIndex=r,e}function te(r,e,t,o,i,s,l,n,c){r.save(),r.translate(e,t),r.rotate(s),r.scale(o,i),r.arc(0,0,1,l,n,c),r.restore()}function ne(r){var e=r.angle*(Math.PI/180),t=r.spread*(Math.PI/180);return{x:r.x,y:r.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:r.startVelocity*.5+Math.random()*r.startVelocity,angle2D:-e+(.5*t-Math.random()*t),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:r.color,shape:r.shape,tick:0,totalTicks:r.ticks,decay:r.decay,drift:r.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:r.gravity*3,ovalScalar:.6,scalar:r.scalar,flat:r.flat}}function oe(r,e){e.x+=Math.cos(e.angle2D)*e.velocity+e.drift,e.y+=Math.sin(e.angle2D)*e.velocity+e.gravity,e.velocity*=e.decay,e.flat?(e.wobble=0,e.wobbleX=e.x+10*e.scalar,e.wobbleY=e.y+10*e.scalar,e.tiltSin=0,e.tiltCos=0,e.random=1):(e.wobble+=e.wobbleSpeed,e.wobbleX=e.x+10*e.scalar*Math.cos(e.wobble),e.wobbleY=e.y+10*e.scalar*Math.sin(e.wobble),e.tiltAngle+=.1,e.tiltSin=Math.sin(e.tiltAngle),e.tiltCos=Math.cos(e.tiltAngle),e.random=Math.random()+2);var t=e.tick++/e.totalTicks,o=e.x+e.random*e.tiltCos,i=e.y+e.random*e.tiltSin,s=e.wobbleX+e.random*e.tiltCos,l=e.wobbleY+e.random*e.tiltSin;if(r.fillStyle="rgba("+e.color.r+", "+e.color.g+", "+e.color.b+", "+(1-t)+")",r.beginPath(),C&&e.shape.type==="path"&&typeof e.shape.path=="string"&&Array.isArray(e.shape.matrix))r.fill(se(e.shape.path,e.shape.matrix,e.x,e.y,Math.abs(s-o)*.1,Math.abs(l-i)*.1,Math.PI/10*e.wobble));else if(e.shape.type==="bitmap"){var n=Math.PI/10*e.wobble,c=Math.abs(s-o)*.1,m=Math.abs(l-i)*.1,p=e.shape.bitmap.width*e.scalar,v=e.shape.bitmap.height*e.scalar,g=new DOMMatrix([Math.cos(n)*c,Math.sin(n)*c,-Math.sin(n)*m,Math.cos(n)*m,e.x,e.y]);g.multiplySelf(new DOMMatrix(e.shape.matrix));var b=r.createPattern(A.transform(e.shape.bitmap),"no-repeat");b.setTransform(g),r.globalAlpha=1-t,r.fillStyle=b,r.fillRect(e.x-p/2,e.y-v/2,p,v),r.globalAlpha=1}else if(e.shape==="circle")r.ellipse?r.ellipse(e.x,e.y,Math.abs(s-o)*e.ovalScalar,Math.abs(l-i)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI):te(r,e.x,e.y,Math.abs(s-o)*e.ovalScalar,Math.abs(l-i)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI);else if(e.shape==="star")for(var d=Math.PI/2*3,x=4*e.scalar,T=8*e.scalar,I=e.x,S=e.y,k=5,E=Math.PI/k;k--;)I=e.x+Math.cos(d)*T,S=e.y+Math.sin(d)*T,r.lineTo(I,S),d+=E,I=e.x+Math.cos(d)*x,S=e.y+Math.sin(d)*x,r.lineTo(I,S),d+=E;else r.moveTo(Math.floor(e.x),Math.floor(e.y)),r.lineTo(Math.floor(e.wobbleX),Math.floor(i)),r.lineTo(Math.floor(s),Math.floor(l)),r.lineTo(Math.floor(o),Math.floor(e.wobbleY));return r.closePath(),r.fill(),e.tick<e.totalTicks}function ie(r,e,t,o,i){var s=e.slice(),l=r.getContext("2d"),n,c,m=P(function(p){function v(){n=c=null,l.clearRect(0,0,o.width,o.height),A.clear(),i(),p()}function g(){M&&!(o.width===f.width&&o.height===f.height)&&(o.width=r.width=f.width,o.height=r.height=f.height),!o.width&&!o.height&&(t(r),o.width=r.width,o.height=r.height),l.clearRect(0,0,o.width,o.height),s=s.filter(function(b){return oe(l,b)}),s.length?n=F.frame(g):v()}n=F.frame(g),c=v});return{addFettis:function(p){return s=s.concat(p),m},canvas:r,promise:m,reset:function(){n&&F.cancel(n),c&&c()}}}function _(r,e){var t=!r,o=!!y(e||{},"resize"),i=!1,s=y(e,"disableForReducedMotion",Boolean),l=w&&!!y(e||{},"useWorker"),n=l?H():null,c=t?ee:re,m=r&&n?!!r.__confetti_initialized:!1,p=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,v;function g(d,x,T){for(var I=y(d,"particleCount",J),S=y(d,"angle",Number),k=y(d,"spread",Number),E=y(d,"startVelocity",Number),de=y(d,"decay",Number),ue=y(d,"gravity",Number),he=y(d,"drift",Number),U=y(d,"colors",Q),fe=y(d,"ticks",Number),W=y(d,"shapes"),me=y(d,"scalar"),ve=!!y(d,"flat"),z=Y(d),q=I,j=[],pe=r.width*z.x,ge=r.height*z.y;q--;)j.push(ne({x:pe,y:ge,angle:S,spread:k,startVelocity:E,color:U[q%U.length],shape:W[K(0,W.length)],ticks:fe,decay:de,gravity:ue,drift:he,scalar:me,flat:ve}));return v?v.addFettis(j):(v=ie(r,j,c,x,T),v.promise)}function b(d){var x=s||y(d,"disableForReducedMotion",Boolean),T=y(d,"zIndex",Number);if(x&&p)return P(function(E){E()});t&&v?r=v.canvas:t&&!r&&(r=ae(T),document.body.appendChild(r)),o&&!m&&c(r);var I={width:r.width,height:r.height};n&&!m&&n.init(r),m=!0,n&&(r.__confetti_initialized=!0);function S(){if(n){var E={getBoundingClientRect:function(){if(!t)return r.getBoundingClientRect()}};c(E),n.postMessage({resize:{width:E.width,height:E.height}});return}I.width=I.height=null}function k(){v=null,o&&(i=!1,a.removeEventListener("resize",S)),t&&r&&(document.body.contains(r)&&document.body.removeChild(r),r=null,m=!1)}return o&&!i&&(i=!0,a.addEventListener("resize",S,!1)),n?n.fire(d,I,k):g(d,I,k)}return b.reset=function(){n&&n.reset(),v&&v.reset()},b}var B;function D(){return B||(B=_(null,{useWorker:!0,resize:!0})),B}function se(r,e,t,o,i,s,l){var n=new Path2D(r),c=new Path2D;c.addPath(n,new DOMMatrix(e));var m=new Path2D;return m.addPath(c,new DOMMatrix([Math.cos(l)*i,Math.sin(l)*i,-Math.sin(l)*s,Math.cos(l)*s,t,o])),m}function le(r){if(!C)throw new Error("path confetti are not supported in this browser");var e,t;typeof r=="string"?e=r:(e=r.path,t=r.matrix);var o=new Path2D(e),i=document.createElement("canvas"),s=i.getContext("2d");if(!t){for(var l=1e3,n=l,c=l,m=0,p=0,v,g,b=0;b<l;b+=2)for(var d=0;d<l;d+=2)s.isPointInPath(o,b,d,"nonzero")&&(n=Math.min(n,b),c=Math.min(c,d),m=Math.max(m,b),p=Math.max(p,d));v=m-n,g=p-c;var x=10,T=Math.min(x/v,x/g);t=[T,0,0,T,-Math.round(v/2+n)*T,-Math.round(g/2+c)*T]}return{type:"path",path:e,matrix:t}}function ce(r){var e,t=1,o="#000000",i='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof r=="string"?e=r:(e=r.text,t="scalar"in r?r.scalar:t,i="fontFamily"in r?r.fontFamily:i,o="color"in r?r.color:o);var s=10*t,l=""+s+"px "+i,n=new OffscreenCanvas(s,s),c=n.getContext("2d");c.font=l;var m=c.measureText(e),p=Math.ceil(m.actualBoundingBoxRight+m.actualBoundingBoxLeft),v=Math.ceil(m.actualBoundingBoxAscent+m.actualBoundingBoxDescent),g=2,b=m.actualBoundingBoxLeft+g,d=m.actualBoundingBoxAscent+g;p+=g+g,v+=g+g,n=new OffscreenCanvas(p,v),c=n.getContext("2d"),c.font=l,c.fillStyle=o,c.fillText(e,b,d);var x=1/t;return{type:"bitmap",bitmap:n.transferToImageBitmap(),matrix:[x,0,0,x,-p*x/2,-v*x/2]}}h.exports=function(){return D().apply(this,arguments)},h.exports.reset=function(){D().reset()},h.exports.create=_,h.exports.shapeFromPath=le,h.exports.shapeFromText=ce})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),L,!1);const we=L.exports;L.exports.create;var V={VITE_CANISTER_ORIGIN:"http://be2us-64aaa-aaaaa-qaabq-cai.localhost:8000",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const be=(u,a="jpeg")=>{const h=new Uint8Array(u),M=new Blob([h],{type:`image/${a}`});return URL.createObjectURL(M)},Me=async u=>{const a=await new Promise(h=>{const M=new FileReader;M.onloadend=()=>{h(M.result)},M.readAsArrayBuffer(u)});return new Uint8ClampedArray(a)},xe=async u=>{const{VITE_CANISTER_ORIGIN:a}=V,h=await Me(u.img),f={minter:"zrzlu-77t5u-6mmw7-zpbko-j73cv-fh5aq-wgjyr-w7but-3nars-j4lul-nae",metadata:[{data:Array.from(h),purpose:{Rendered:null},key_val_data:[{key:"name",val:{TextContent:u.name}},{key:"description",val:{TextContent:u.description}}]}]};return await(await fetch(`${a}/v1/nft/mint`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(f)})).json()},Ce=async u=>{var C;const a=document.querySelector("#btn-create-nft");u.preventDefault();const h=new FormData(u.target),M=Object.fromEntries(h.entries());if(a==null||a.insertAdjacentHTML("afterend",`<div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`),a==null||a.setAttribute("disabled","true"),(await xe(M)).Ok){a==null||a.removeAttribute("disabled"),(C=a==null?void 0:a.nextSibling)==null||C.remove(),we();const O=a==null?void 0:a.textContent;a&&(a.textContent="Nft created 🥳🥳"),setTimeout(()=>{a&&(a.textContent=O)},1e3)}},Te=async()=>{const{VITE_CANISTER_ORIGIN:u}=V;return await(await fetch(`${u}/v1/nft/nfts`,{headers:{"Content-Type":"application/json"}})).json()},Ie=async()=>{const u=document.querySelector("#nfts"),a=await Te(),h=M=>{const{metadata:[{key_val_data:f,data:w}],id:C}=M,O=f.reduce((P,A)=>(P[A.key]=Object.values(A.val).at(0),P),{});return`
  <article class="card" style="width: 18rem;">
    
    <img src="${be(w)}" class="card-img-top" alt="Imaegn del NFT #${C}">
    <div class="card-body ms-0">
      <h5 class="card-title">${O.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">NFT #${C}</h6>
      <p class="card-text">${O.description}</p>
    </div>
  </article>
  `};u==null||u.insertAdjacentHTML("afterbegin",a.map(h).join(`
`))},Ee=()=>{const u=document.querySelector("#form-create-nft");u==null||u.addEventListener("submit",Ce),Ie()};document.addEventListener("DOMContentLoaded",Ee)});export default Se();
