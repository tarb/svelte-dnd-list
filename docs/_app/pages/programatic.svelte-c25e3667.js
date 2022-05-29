import{S as N,i as U,K as et,e as C,L as S,k as L,c as D,a as g,M as E,d as u,m as k,b as d,W as G,g as M,J as p,N as R,n as Z,X as nt,Z as rt,t as ot,x as X,h as lt,y as q,z as H,r as P,p as O,C as I,U as Q,s as it,V as at}from"../chunks/index-549bb60c.js";import{D as ct,a as x}from"../chunks/DragDropList-11ae773e.js";class tt{constructor(t,n,r,e){this.direction=ct.Horizontal,this.id=t,this.priority=r,this.count=n,this.itemSize=e,this.items=new Array(n),this.el=void 0,this.containerClass="horizontal"}insideBounding(t,n){const r=this.el;let e=0,i=0;for(let c=r;c;c=c.parentElement)i+=c.scrollLeft,e+=c.scrollTop;const s=r.getBoundingClientRect(),f=s.left+i,h=s.right+i,m=s.top+e,l=s.bottom+e;return n>m&&n<l&&t>f&&t<h}pointIndex(t,n){const{el:r,itemSize:e,count:i}=this,f=r.getBoundingClientRect().left-r.scrollLeft+window.scrollX,h=Math.floor((t-f)/e);return Math.min(Math.max(h,0),i)}placeholderStyleStr(){return`width: ${this.itemSize}px; height: 100%;`}dragXOffset(t){const n=this.el.getBoundingClientRect();return t*this.itemSize+n.left}dragYOffset(t){return this.el.getBoundingClientRect().top}itemHeight(){return this.el.clientHeight}itemWidth(){return this.itemSize}styleSourceMove(t,n,r){const{items:e,itemSize:i}=this;for(let s=0;s<e.length;++s){const f=t>n&&(s<n||s>n&&s<=t)||t<n&&s<t||t==n&&s<n,h=t>n&&s>t||t<n&&(s>=t&&s<n||s>n)||t==n&&s>n,m=e[s];f?m&&(m.style.cssText=`transform: translateX(0px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${i}px;`):h&&(r?m&&(m.style.cssText=`transform: translateX(${i}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${i}px;`):m&&(m.style.cssText=`transform: translateX(${i}px); width: ${i}px;`))}}styleSourceMissing(t){const{items:n,itemSize:r}=this;for(let e=0;e<n.length;++e)n[e]&&e!==t&&(n[e].style.cssText=`transform: translateX(0px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${r}px;`)}styleDestMove(t){const{items:n,itemSize:r}=this;for(let e=0;e<n.length;++e){const i=n[e];e<t?i&&(i.style.cssText=`transform: translateX(0px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${r}px;`):i&&(i.style.cssText=`transform: translateX(${r}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${r}px;`)}}styleDestReset(){const{items:t,itemSize:n}=this;for(let r=0;r<t.length;++r)t[r]&&(t[r].style.cssText=`transform:translateX(0px); transition:transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${n}px;`)}styleRemove(){this.styleContainerBaseStyle()}styleContainerBaseStyle(){const{items:t,itemSize:n}=this;for(let r=0;r<t.length;++r){const e=t[r];e&&(e.style.cssText=` width: ${n}px;`)}}}function ft(o){let t,n,r,e,i,s,f,h,m,l,c,_,b,y,w,B,T,a,z;return{c(){t=C("div"),n=C("button"),r=S("svg"),e=S("path"),i=L(),s=C("button"),f=S("svg"),h=S("path"),m=L(),l=C("button"),c=S("svg"),_=S("path"),b=L(),y=C("button"),w=S("svg"),B=S("path"),this.h()},l($){t=D($,"DIV",{class:!0});var v=g(t);n=D(v,"BUTTON",{class:!0});var V=g(n);r=E(V,"svg",{viewBox:!0});var F=g(r);e=E(F,"path",{d:!0}),g(e).forEach(u),F.forEach(u),V.forEach(u),i=k(v),s=D(v,"BUTTON",{class:!0});var W=g(s);f=E(W,"svg",{viewBox:!0});var A=g(f);h=E(A,"path",{d:!0}),g(h).forEach(u),A.forEach(u),W.forEach(u),m=k(v),l=D(v,"BUTTON",{class:!0});var J=g(l);c=E(J,"svg",{viewBox:!0});var K=g(c);_=E(K,"path",{d:!0}),g(_).forEach(u),K.forEach(u),J.forEach(u),b=k(v),y=D(v,"BUTTON",{class:!0});var Y=g(y);w=E(Y,"svg",{viewBox:!0});var j=g(w);B=E(j,"path",{d:!0}),g(B).forEach(u),j.forEach(u),Y.forEach(u),v.forEach(u),this.h()},h(){d(e,"d","m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"),d(r,"viewBox","0 0 24 24"),d(n,"class","up svelte-14q3uy9"),d(h,"d","M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"),d(f,"viewBox","0 0 24 24"),d(s,"class","left svelte-14q3uy9"),d(_,"d","m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"),d(c,"viewBox","0 0 24 24"),d(l,"class","right svelte-14q3uy9"),d(B,"d","m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"),d(w,"viewBox","0 0 24 24"),d(y,"class","down svelte-14q3uy9"),d(t,"class",T=G(`card ${o[0]}`)+" svelte-14q3uy9")},m($,v){M($,t,v),p(t,n),p(n,r),p(r,e),p(t,i),p(t,s),p(s,f),p(f,h),p(t,m),p(t,l),p(l,c),p(c,_),p(t,b),p(t,y),p(y,w),p(w,B),a||(z=[R(n,"click",o[2]),R(s,"click",o[3]),R(l,"click",o[4]),R(y,"click",o[5])],a=!0)},p($,[v]){v&1&&T!==(T=G(`card ${$[0]}`)+" svelte-14q3uy9")&&d(t,"class",T)},i:Z,o:Z,d($){$&&u(t),a=!1,nt(z)}}}function ht(o,t,n){let{color:r}=t;const e=rt(),i=()=>e("up"),s=()=>e("left"),f=()=>e("right"),h=()=>e("down");return o.$$set=m=>{"color"in m&&n(0,r=m.color)},[r,e,i,s,f,h]}class st extends N{constructor(t){super(),U(this,t,ht,ft,et,{color:0})}}function ut(o){let t,n;function r(){return o[5](o[15])}function e(){return o[6](o[15])}function i(){return o[7](o[15])}return t=new st({props:{color:o[2][o[15]]}}),t.$on("right",r),t.$on("left",e),t.$on("down",i),{c(){X(t.$$.fragment)},l(s){q(t.$$.fragment,s)},m(s,f){H(t,s,f),n=!0},p(s,f){o=s;const h={};f&32772&&(h.color=o[2][o[15]]),t.$set(h)},i(s){n||(P(t.$$.fragment,s),n=!0)},o(s){O(t.$$.fragment,s),n=!1},d(s){I(t,s)}}}function mt(o){let t,n;function r(){return o[10](o[15])}function e(){return o[11](o[15])}function i(){return o[12](o[15])}return t=new st({props:{color:o[3][o[15]]}}),t.$on("right",r),t.$on("left",e),t.$on("up",i),{c(){X(t.$$.fragment)},l(s){q(t.$$.fragment,s)},m(s,f){H(t,s,f),n=!0},p(s,f){o=s;const h={};f&32776&&(h.color=o[3][o[15]]),t.$set(h)},i(s){n||(P(t.$$.fragment,s),n=!0)},o(s){O(t.$$.fragment,s),n=!1},d(s){I(t,s)}}}function pt(o){let t,n,r,e,i,s,f,h={id:"a",zoneClass:"zone",type:tt,itemSize:80,itemCount:o[2].length,keyFn:o[8],$$slots:{default:[ut,({index:l})=>({15:l}),({index:l})=>l?32768:0]},$$scope:{ctx:o}};e=new x({props:h}),o[9](e),e.$on("drop",o[4]);let m={id:"b",zoneClass:"zone",type:tt,itemSize:80,itemCount:o[3].length,keyFn:o[13],$$slots:{default:[mt,({index:l})=>({15:l}),({index:l})=>l?32768:0]},$$scope:{ctx:o}};return s=new x({props:m}),o[14](s),s.$on("drop",o[4]),{c(){t=C("h1"),n=ot("Svelte Dnd List - Programatic Example"),r=L(),X(e.$$.fragment),i=L(),X(s.$$.fragment)},l(l){t=D(l,"H1",{});var c=g(t);n=lt(c,"Svelte Dnd List - Programatic Example"),c.forEach(u),r=k(l),q(e.$$.fragment,l),i=k(l),q(s.$$.fragment,l)},m(l,c){M(l,t,c),p(t,n),M(l,r,c),H(e,l,c),M(l,i,c),H(s,l,c),f=!0},p(l,[c]){const _={};c&4&&(_.itemCount=l[2].length),c&4&&(_.keyFn=l[8]),c&98319&&(_.$$scope={dirty:c,ctx:l}),e.$set(_);const b={};c&8&&(b.itemCount=l[3].length),c&8&&(b.keyFn=l[13]),c&98319&&(b.$$scope={dirty:c,ctx:l}),s.$set(b)},i(l){f||(P(e.$$.fragment,l),P(s.$$.fragment,l),f=!0)},o(l){O(e.$$.fragment,l),O(s.$$.fragment,l),f=!1},d(l){l&&u(t),l&&u(r),o[9](null),I(e,l),l&&u(i),o[14](null),I(s,l)}}}function dt(o,t,n){let r,e,i=["cyan","blue","green","lime"],s=["yellow","orange","red","pink"];function f({detail:{from:a,to:z}}){if(!z||a===z)return;let $;a.dropZoneID==="a"?(n(2,i=[...i]),[$]=i.splice(a.index,1)):a.dropZoneID==="b"&&(n(3,s=[...s]),[$]=s.splice(a.index,1)),z.dropZoneID==="a"?(n(2,i=[...i]),i.splice(z.index,0,$)):z.dropZoneID==="b"&&(n(3,s=[...s]),s.splice(z.index,0,$))}const h=a=>a<i.length-1&&r.move(a,a+1,r.dropzone),m=a=>a>0&&r.move(a,a-1,r.dropzone),l=a=>r.move(a,Math.min(a,s.length),e.dropzone),c=a=>i[a];function _(a){Q[a?"unshift":"push"](()=>{r=a,n(0,r)})}const b=a=>a<s.length-1&&e.move(a,a+1,e.dropzone),y=a=>a>0&&e.move(a,a-1,e.dropzone),w=a=>e.move(a,Math.min(a,i.length),r.dropzone),B=a=>s[a];function T(a){Q[a?"unshift":"push"](()=>{e=a,n(1,e)})}return[r,e,i,s,f,h,m,l,c,_,b,y,w,B,T]}class gt extends N{constructor(t){super(),U(this,t,dt,pt,et,{})}}function _t(o){let t,n,r;return n=new gt({}),{c(){t=L(),X(n.$$.fragment),this.h()},l(e){at('[data-svelte="svelte-1b2nloh"]',document.head).forEach(u),t=k(e),q(n.$$.fragment,e),this.h()},h(){document.title="Svelte Dnd List - Programatic Example"},m(e,i){M(e,t,i),H(n,e,i),r=!0},p:Z,i(e){r||(P(n.$$.fragment,e),r=!0)},o(e){O(n.$$.fragment,e),r=!1},d(e){e&&u(t),I(n,e)}}}class bt extends N{constructor(t){super(),U(this,t,null,_t,it,{})}}export{bt as default};