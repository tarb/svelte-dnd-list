import{S as F,i as G,K as M,e as p,t as k,k as I,w as y,c as u,a as $,h as x,d as o,m as b,x as w,b as g,g as D,J as f,y as z,q as H,o as q,B as L,j as B,s as N,V as O,E as P}from"../chunks/index-f8022b9b.js";import{D as j,r as Q}from"../chunks/DragDropList-d3b57ef2.js";import{H as R}from"../chunks/HorizontalCenterDropZone-a1bfad87.js";import{H as T}from"../chunks/HorizontalDropZone-72151a7b.js";import{V as U}from"../chunks/VerticalDropZone-70b39c9d.js";import"../chunks/index-0051cdc5.js";function W(n){let t,r=n[0][n[2]]+"",l;return{c(){t=p("div"),l=k(r),this.h()},l(e){t=u(e,"DIV",{class:!0});var a=$(t);l=x(a,r),a.forEach(o),this.h()},h(){g(t,"class","item svelte-26s733")},m(e,a){D(e,t,a),f(t,l)},p(e,a){a&5&&r!==(r=e[0][e[2]]+"")&&B(l,r)},d(e){e&&o(t)}}}function X(n){let t,r=n[0][n[2]]+"",l;return{c(){t=p("div"),l=k(r),this.h()},l(e){t=u(e,"DIV",{class:!0});var a=$(t);l=x(a,r),a.forEach(o),this.h()},h(){g(t,"class","item svelte-26s733")},m(e,a){D(e,t,a),f(t,l)},p(e,a){a&5&&r!==(r=e[0][e[2]]+"")&&B(l,r)},d(e){e&&o(t)}}}function Y(n){let t,r=n[0][n[2]]+"",l;return{c(){t=p("div"),l=k(r),this.h()},l(e){t=u(e,"DIV",{class:!0});var a=$(t);l=x(a,r),a.forEach(o),this.h()},h(){g(t,"class","item svelte-26s733")},m(e,a){D(e,t,a),f(t,l)},p(e,a){a&5&&r!==(r=e[0][e[2]]+"")&&B(l,r)},d(e){e&&o(t)}}}function ee(n){let t,r,l,e,a,d,Z,v,E,m,A,S,c,C;return d=new j({props:{id:"exampley",type:U,itemSize:50,itemCount:n[0].length,$$slots:{default:[W,({index:s})=>({2:s}),({index:s})=>s?4:0]},$$scope:{ctx:n}}}),d.$on("drop",n[1]),m=new j({props:{id:"examplex",type:T,itemSize:50,itemCount:n[0].length,$$slots:{default:[X,({index:s})=>({2:s}),({index:s})=>s?4:0]},$$scope:{ctx:n}}}),m.$on("drop",n[1]),c=new j({props:{id:"examplex",type:R,itemSize:50,itemCount:n[0].length,$$slots:{default:[Y,({index:s})=>({2:s}),({index:s})=>s?4:0]},$$scope:{ctx:n}}}),c.$on("drop",n[1]),{c(){t=p("h1"),r=k("Svelte Dnd List - Scrollable Containers Example"),l=I(),e=p("div"),a=p("div"),y(d.$$.fragment),Z=I(),v=p("div"),E=p("div"),y(m.$$.fragment),A=I(),S=p("div"),y(c.$$.fragment),this.h()},l(s){t=u(s,"H1",{});var i=$(t);r=x(i,"Svelte Dnd List - Scrollable Containers Example"),i.forEach(o),l=b(s),e=u(s,"DIV",{class:!0});var h=$(e);a=u(h,"DIV",{class:!0});var V=$(a);w(d.$$.fragment,V),V.forEach(o),Z=b(h),v=u(h,"DIV",{class:!0});var _=$(v);E=u(_,"DIV",{class:!0});var J=$(E);w(m.$$.fragment,J),J.forEach(o),A=b(_),S=u(_,"DIV",{class:!0});var K=$(S);w(c.$$.fragment,K),K.forEach(o),_.forEach(o),h.forEach(o),this.h()},h(){g(a,"class","container y svelte-26s733"),g(E,"class","container x svelte-26s733"),g(S,"class","container x svelte-26s733"),g(v,"class","flex stacked svelte-26s733"),g(e,"class","flex root svelte-26s733")},m(s,i){D(s,t,i),f(t,r),D(s,l,i),D(s,e,i),f(e,a),z(d,a,null),f(e,Z),f(e,v),f(v,E),z(m,E,null),f(v,A),f(v,S),z(c,S,null),C=!0},p(s,[i]){const h={};i&1&&(h.itemCount=s[0].length),i&13&&(h.$$scope={dirty:i,ctx:s}),d.$set(h);const V={};i&1&&(V.itemCount=s[0].length),i&13&&(V.$$scope={dirty:i,ctx:s}),m.$set(V);const _={};i&1&&(_.itemCount=s[0].length),i&13&&(_.$$scope={dirty:i,ctx:s}),c.$set(_)},i(s){C||(H(d.$$.fragment,s),H(m.$$.fragment,s),H(c.$$.fragment,s),C=!0)},o(s){q(d.$$.fragment,s),q(m.$$.fragment,s),q(c.$$.fragment,s),C=!1},d(s){s&&o(t),s&&o(l),s&&o(e),L(d),L(m),L(c)}}}function te(n,t,r){let l=Array.from(Array(400).keys()).map((a,d)=>d+1);function e({detail:{from:a,to:d}}){!d||a===d||r(0,l=Q(l,a.index,d.index))}return[l,e]}class se extends F{constructor(t){super(),G(this,t,te,ee,M,{})}}function ae(n){let t,r,l;return r=new se({}),{c(){t=I(),y(r.$$.fragment),this.h()},l(e){O('[data-svelte="svelte-1cnrxei"]',document.head).forEach(o),t=b(e),w(r.$$.fragment,e),this.h()},h(){document.title="Svelte Dnd List - Example"},m(e,a){D(e,t,a),z(r,e,a),l=!0},p:P,i(e){l||(H(r.$$.fragment,e),l=!0)},o(e){q(r.$$.fragment,e),l=!1},d(e){e&&o(t),L(r,e)}}}class fe extends F{constructor(t){super(),G(this,t,null,ae,N,{})}}export{fe as default};
