import{S as c,i as f,K as V,e as u,t as d,k as _,w as $,c as h,a as v,h as g,d as o,m as S,x,g as m,J as D,y as E,q as y,o as q,B as L,b as w,j as C,s as b,V as j,E as k}from"../chunks/index-f8022b9b.js";import{D as z,r as B}from"../chunks/DragDropList-d3b57ef2.js";import{V as H}from"../chunks/VerticalDropZone-70b39c9d.js";import"../chunks/index-0051cdc5.js";function I(l){let s,a=l[0][l[2]]+"",n;return{c(){s=u("div"),n=d(a),this.h()},l(e){s=h(e,"DIV",{class:!0});var r=v(s);n=g(r,a),r.forEach(o),this.h()},h(){w(s,"class","svelte-118sn6g")},m(e,r){m(e,s,r),D(s,n)},p(e,r){r&5&&a!==(a=e[0][e[2]]+"")&&C(n,a)},d(e){e&&o(s)}}}function J(l){let s,a,n,e,r;return e=new z({props:{id:"example",type:H,itemSize:50,itemCount:l[0].length,$$slots:{default:[I,({index:t})=>({2:t}),({index:t})=>t?4:0]},$$scope:{ctx:l}}}),e.$on("drop",l[1]),{c(){s=u("h1"),a=d("Svelte Dnd List - Simple Example"),n=_(),$(e.$$.fragment)},l(t){s=h(t,"H1",{});var i=v(s);a=g(i,"Svelte Dnd List - Simple Example"),i.forEach(o),n=S(t),x(e.$$.fragment,t)},m(t,i){m(t,s,i),D(s,a),m(t,n,i),E(e,t,i),r=!0},p(t,[i]){const p={};i&1&&(p.itemCount=t[0].length),i&13&&(p.$$scope={dirty:i,ctx:t}),e.$set(p)},i(t){r||(y(e.$$.fragment,t),r=!0)},o(t){q(e.$$.fragment,t),r=!1},d(t){t&&o(s),t&&o(n),L(e,t)}}}function K(l,s,a){let n=[1,2,3,4,5];function e({detail:{from:r,to:t}}){!t||r===t||a(0,n=B(n,r.index,t.index))}return[n,e]}class Z extends c{constructor(s){super(),f(this,s,K,J,V,{})}}function A(l){let s,a,n;return a=new Z({}),{c(){s=_(),$(a.$$.fragment),this.h()},l(e){j('[data-svelte="svelte-1cnrxei"]',document.head).forEach(o),s=S(e),x(a.$$.fragment,e),this.h()},h(){document.title="Svelte Dnd List - Example"},m(e,r){m(e,s,r),E(a,e,r),n=!0},p:k,i(e){n||(y(a.$$.fragment,e),n=!0)},o(e){q(a.$$.fragment,e),n=!1},d(e){e&&o(s),L(a,e)}}}class O extends c{constructor(s){super(),f(this,s,null,A,b,{})}}export{O as default};