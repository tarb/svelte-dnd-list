import{S as O,i as U,I as te,k as L,L as y,a as C,l as q,m as _,M as k,h as f,c as T,n as h,V as Q,b as P,G as d,N as F,B as M,Y as re,X as oe,q as se,w as S,r as ae,x as H,y as I,f as N,t as V,z as Z,R as W,s as le,T as ie}from"../../../chunks/index-86407da6.js";import{D as x}from"../../../chunks/DragDropList-a1baaa18.js";import{H as ee}from"../../../chunks/HorizontalDropZone-48718d1c.js";function ce(n){let e,a,l,r,i,t,u,p,$,o,c,m,b,w,z,D,B,s,E;return{c(){e=L("div"),a=L("button"),l=y("svg"),r=y("path"),i=C(),t=L("button"),u=y("svg"),p=y("path"),$=C(),o=L("button"),c=y("svg"),m=y("path"),b=C(),w=L("button"),z=y("svg"),D=y("path"),this.h()},l(g){e=q(g,"DIV",{class:!0});var v=_(e);a=q(v,"BUTTON",{class:!0});var G=_(a);l=k(G,"svg",{viewBox:!0});var R=_(l);r=k(R,"path",{d:!0}),_(r).forEach(f),R.forEach(f),G.forEach(f),i=T(v),t=q(v,"BUTTON",{class:!0});var X=_(t);u=k(X,"svg",{viewBox:!0});var Y=_(u);p=k(Y,"path",{d:!0}),_(p).forEach(f),Y.forEach(f),X.forEach(f),$=T(v),o=q(v,"BUTTON",{class:!0});var j=_(o);c=k(j,"svg",{viewBox:!0});var A=_(c);m=k(A,"path",{d:!0}),_(m).forEach(f),A.forEach(f),j.forEach(f),b=T(v),w=q(v,"BUTTON",{class:!0});var J=_(w);z=k(J,"svg",{viewBox:!0});var K=_(z);D=k(K,"path",{d:!0}),_(D).forEach(f),K.forEach(f),J.forEach(f),v.forEach(f),this.h()},h(){h(r,"d","m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"),h(l,"viewBox","0 0 24 24"),h(a,"class","up svelte-14q3uy9"),h(p,"d","M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"),h(u,"viewBox","0 0 24 24"),h(t,"class","left svelte-14q3uy9"),h(m,"d","m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"),h(c,"viewBox","0 0 24 24"),h(o,"class","right svelte-14q3uy9"),h(D,"d","m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"),h(z,"viewBox","0 0 24 24"),h(w,"class","down svelte-14q3uy9"),h(e,"class",B=Q(`card ${n[0]}`)+" svelte-14q3uy9")},m(g,v){P(g,e,v),d(e,a),d(a,l),d(l,r),d(e,i),d(e,t),d(t,u),d(u,p),d(e,$),d(e,o),d(o,c),d(c,m),d(e,b),d(e,w),d(w,z),d(z,D),s||(E=[F(a,"click",n[2]),F(t,"click",n[3]),F(o,"click",n[4]),F(w,"click",n[5])],s=!0)},p(g,[v]){v&1&&B!==(B=Q(`card ${g[0]}`)+" svelte-14q3uy9")&&h(e,"class",B)},i:M,o:M,d(g){g&&f(e),s=!1,re(E)}}}function ue(n,e,a){let{color:l}=e;const r=oe(),i=()=>r("up"),t=()=>r("left"),u=()=>r("right"),p=()=>r("down");return n.$$set=$=>{"color"in $&&a(0,l=$.color)},[l,r,i,t,u,p]}class ne extends O{constructor(e){super(),U(this,e,ue,ce,te,{color:0})}}function fe(n){let e,a;function l(){return n[5](n[15])}function r(){return n[6](n[15])}function i(){return n[7](n[15])}return e=new ne({props:{color:n[2][n[15]]}}),e.$on("right",l),e.$on("left",r),e.$on("down",i),{c(){S(e.$$.fragment)},l(t){H(e.$$.fragment,t)},m(t,u){I(e,t,u),a=!0},p(t,u){n=t;const p={};u&32772&&(p.color=n[2][n[15]]),e.$set(p)},i(t){a||(N(e.$$.fragment,t),a=!0)},o(t){V(e.$$.fragment,t),a=!1},d(t){Z(e,t)}}}function pe(n){let e,a;function l(){return n[10](n[15])}function r(){return n[11](n[15])}function i(){return n[12](n[15])}return e=new ne({props:{color:n[3][n[15]]}}),e.$on("right",l),e.$on("left",r),e.$on("up",i),{c(){S(e.$$.fragment)},l(t){H(e.$$.fragment,t)},m(t,u){I(e,t,u),a=!0},p(t,u){n=t;const p={};u&32776&&(p.color=n[3][n[15]]),e.$set(p)},i(t){a||(N(e.$$.fragment,t),a=!0)},o(t){V(e.$$.fragment,t),a=!1},d(t){Z(e,t)}}}function de(n){let e,a,l,r,i,t,u,p={id:"a",zoneClass:"zone",type:ee,itemSize:80,itemCount:n[2].length,keyFn:n[8],$$slots:{default:[fe,({index:o})=>({15:o}),({index:o})=>o?32768:0]},$$scope:{ctx:n}};r=new x({props:p}),n[9](r),r.$on("drop",n[4]);let $={id:"b",zoneClass:"zone",type:ee,itemSize:80,itemCount:n[3].length,keyFn:n[13],$$slots:{default:[pe,({index:o})=>({15:o}),({index:o})=>o?32768:0]},$$scope:{ctx:n}};return t=new x({props:$}),n[14](t),t.$on("drop",n[4]),{c(){e=L("h1"),a=se("Svelte Dnd List - Programatic Example"),l=C(),S(r.$$.fragment),i=C(),S(t.$$.fragment)},l(o){e=q(o,"H1",{});var c=_(e);a=ae(c,"Svelte Dnd List - Programatic Example"),c.forEach(f),l=T(o),H(r.$$.fragment,o),i=T(o),H(t.$$.fragment,o)},m(o,c){P(o,e,c),d(e,a),P(o,l,c),I(r,o,c),P(o,i,c),I(t,o,c),u=!0},p(o,[c]){const m={};c&4&&(m.itemCount=o[2].length),c&4&&(m.keyFn=o[8]),c&98319&&(m.$$scope={dirty:c,ctx:o}),r.$set(m);const b={};c&8&&(b.itemCount=o[3].length),c&8&&(b.keyFn=o[13]),c&98319&&(b.$$scope={dirty:c,ctx:o}),t.$set(b)},i(o){u||(N(r.$$.fragment,o),N(t.$$.fragment,o),u=!0)},o(o){V(r.$$.fragment,o),V(t.$$.fragment,o),u=!1},d(o){o&&f(e),o&&f(l),n[9](null),Z(r,o),o&&f(i),n[14](null),Z(t,o)}}}function he(n,e,a){let l,r,i=["cyan","blue","green","lime"],t=["yellow","orange","red","pink"];function u({detail:{from:s,to:E}}){if(!E||s===E)return;let g;s.dropZoneID==="a"?(a(2,i=[...i]),[g]=i.splice(s.index,1)):s.dropZoneID==="b"&&(a(3,t=[...t]),[g]=t.splice(s.index,1)),E.dropZoneID==="a"?(a(2,i=[...i]),i.splice(E.index,0,g)):E.dropZoneID==="b"&&(a(3,t=[...t]),t.splice(E.index,0,g))}const p=s=>s<i.length-1&&l.move(s,s+1,l.dropzone),$=s=>s>0&&l.move(s,s-1,l.dropzone),o=s=>l.move(s,Math.min(s,t.length),r.dropzone),c=s=>i[s];function m(s){W[s?"unshift":"push"](()=>{l=s,a(0,l)})}const b=s=>s<t.length-1&&r.move(s,s+1,r.dropzone),w=s=>s>0&&r.move(s,s-1,r.dropzone),z=s=>r.move(s,Math.min(s,i.length),l.dropzone),D=s=>t[s];function B(s){W[s?"unshift":"push"](()=>{r=s,a(1,r)})}return[l,r,i,t,u,p,$,o,c,m,b,w,z,D,B]}class _e extends O{constructor(e){super(),U(this,e,he,de,te,{})}}function me(n){let e,a,l;return a=new _e({}),{c(){e=C(),S(a.$$.fragment),this.h()},l(r){ie("svelte-1b2nloh",document.head).forEach(f),e=T(r),H(a.$$.fragment,r),this.h()},h(){document.title="Svelte Dnd List - Programatic Example"},m(r,i){P(r,e,i),I(a,r,i),l=!0},p:M,i(r){l||(N(a.$$.fragment,r),l=!0)},o(r){V(a.$$.fragment,r),l=!1},d(r){r&&f(e),Z(a,r)}}}class be extends O{constructor(e){super(),U(this,e,null,me,le,{})}}export{be as default};
