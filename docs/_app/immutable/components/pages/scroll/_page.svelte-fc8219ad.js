import{S as T,i as F,I as J,k as c,q as L,a as V,w as I,l as p,m as $,r as q,h as o,c as j,x as b,n as g,b as D,G as f,y,f as z,t as w,z as H,u as B,s as K,T as M,B as N}from"../../../chunks/index-86407da6.js";import{D as A,r as O}from"../../../chunks/DragDropList-a1baaa18.js";import{H as Q}from"../../../chunks/HorizontalCenterDropZone-00bcaf3c.js";import{H as R}from"../../../chunks/HorizontalDropZone-48718d1c.js";import{V as U}from"../../../chunks/VerticalDropZone-d5e0fb4f.js";function W(n){let t,r=n[0][n[2]]+"",l;return{c(){t=c("div"),l=L(r),this.h()},l(e){t=p(e,"DIV",{class:!0});var a=$(t);l=q(a,r),a.forEach(o),this.h()},h(){g(t,"class","item svelte-10ju9k1")},m(e,a){D(e,t,a),f(t,l)},p(e,a){a&5&&r!==(r=e[0][e[2]]+"")&&B(l,r)},d(e){e&&o(t)}}}function X(n){let t,r=n[0][n[2]]+"",l;return{c(){t=c("div"),l=L(r),this.h()},l(e){t=p(e,"DIV",{class:!0});var a=$(t);l=q(a,r),a.forEach(o),this.h()},h(){g(t,"class","item svelte-10ju9k1")},m(e,a){D(e,t,a),f(t,l)},p(e,a){a&5&&r!==(r=e[0][e[2]]+"")&&B(l,r)},d(e){e&&o(t)}}}function Y(n){let t,r=n[0][n[2]]+"",l;return{c(){t=c("div"),l=L(r),this.h()},l(e){t=p(e,"DIV",{class:!0});var a=$(t);l=q(a,r),a.forEach(o),this.h()},h(){g(t,"class","item svelte-10ju9k1")},m(e,a){D(e,t,a),f(t,l)},p(e,a){a&5&&r!==(r=e[0][e[2]]+"")&&B(l,r)},d(e){e&&o(t)}}}function ee(n){let t,r,l,e,a,d,x,h,E,u,Z,S,m,C;return d=new A({props:{id:"exampley",type:U,itemSize:50,itemCount:n[0].length,$$slots:{default:[W,({index:s})=>({2:s}),({index:s})=>s?4:0]},$$scope:{ctx:n}}}),d.$on("drop",n[1]),u=new A({props:{id:"examplex",type:R,itemSize:50,itemCount:n[0].length,$$slots:{default:[X,({index:s})=>({2:s}),({index:s})=>s?4:0]},$$scope:{ctx:n}}}),u.$on("drop",n[1]),m=new A({props:{id:"examplex",type:Q,itemSize:50,itemCount:n[0].length,$$slots:{default:[Y,({index:s})=>({2:s}),({index:s})=>s?4:0]},$$scope:{ctx:n}}}),m.$on("drop",n[1]),{c(){t=c("h1"),r=L("Svelte Dnd List - Scrollable Containers Example"),l=V(),e=c("div"),a=c("div"),I(d.$$.fragment),x=V(),h=c("div"),E=c("div"),I(u.$$.fragment),Z=V(),S=c("div"),I(m.$$.fragment),this.h()},l(s){t=p(s,"H1",{});var i=$(t);r=q(i,"Svelte Dnd List - Scrollable Containers Example"),i.forEach(o),l=j(s),e=p(s,"DIV",{class:!0});var v=$(e);a=p(v,"DIV",{class:!0});var k=$(a);b(d.$$.fragment,k),k.forEach(o),x=j(v),h=p(v,"DIV",{class:!0});var _=$(h);E=p(_,"DIV",{class:!0});var G=$(E);b(u.$$.fragment,G),G.forEach(o),Z=j(_),S=p(_,"DIV",{class:!0});var P=$(S);b(m.$$.fragment,P),P.forEach(o),_.forEach(o),v.forEach(o),this.h()},h(){g(a,"class","container y svelte-10ju9k1"),g(E,"class","container x svelte-10ju9k1"),g(S,"class","container x svelte-10ju9k1"),g(h,"class","flex stacked svelte-10ju9k1"),g(e,"class","flex root svelte-10ju9k1")},m(s,i){D(s,t,i),f(t,r),D(s,l,i),D(s,e,i),f(e,a),y(d,a,null),f(e,x),f(e,h),f(h,E),y(u,E,null),f(h,Z),f(h,S),y(m,S,null),C=!0},p(s,[i]){const v={};i&1&&(v.itemCount=s[0].length),i&13&&(v.$$scope={dirty:i,ctx:s}),d.$set(v);const k={};i&1&&(k.itemCount=s[0].length),i&13&&(k.$$scope={dirty:i,ctx:s}),u.$set(k);const _={};i&1&&(_.itemCount=s[0].length),i&13&&(_.$$scope={dirty:i,ctx:s}),m.$set(_)},i(s){C||(z(d.$$.fragment,s),z(u.$$.fragment,s),z(m.$$.fragment,s),C=!0)},o(s){w(d.$$.fragment,s),w(u.$$.fragment,s),w(m.$$.fragment,s),C=!1},d(s){s&&o(t),s&&o(l),s&&o(e),H(d),H(u),H(m)}}}function te(n,t,r){let l=Array.from(Array(400).keys()).map((a,d)=>d+1);function e({detail:{from:a,to:d}}){!d||a===d||r(0,l=O(l,a.index,d.index))}return[l,e]}class se extends T{constructor(t){super(),F(this,t,te,ee,J,{})}}function ae(n){let t,r,l;return r=new se({}),{c(){t=V(),I(r.$$.fragment),this.h()},l(e){M("svelte-1cnrxei",document.head).forEach(o),t=j(e),b(r.$$.fragment,e),this.h()},h(){document.title="Svelte Dnd List - Example"},m(e,a){D(e,t,a),y(r,e,a),l=!0},p:N,i(e){l||(z(r.$$.fragment,e),l=!0)},o(e){w(r.$$.fragment,e),l=!1},d(e){e&&o(t),H(r,e)}}}class de extends T{constructor(t){super(),F(this,t,null,ae,K,{})}}export{de as default};
