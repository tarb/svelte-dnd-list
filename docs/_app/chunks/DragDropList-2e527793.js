var Se=Object.defineProperty,Ee=Object.defineProperties;var Te=Object.getOwnPropertyDescriptors;var oe=Object.getOwnPropertySymbols;var He=Object.prototype.hasOwnProperty,Oe=Object.prototype.propertyIsEnumerable;var re=(i,e,n)=>e in i?Se(i,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[e]=n,X=(i,e)=>{for(var n in e||(e={}))He.call(e,n)&&re(i,n,e[n]);if(oe)for(var n of oe(e))Oe.call(e,n)&&re(i,n,e[n]);return i},N=(i,e)=>Ee(i,Te(e));import{S as Ie,i as ke,K as Me,W as T,e as ge,k as Ae,c as me,a as ye,m as Pe,d as q,b as O,X as B,g as pe,J as Re,N as de,G as Fe,H as Ue,I as We,q as _e,o as be,Y as Ye,n as Xe,Z as Ne,p as Ve,_ as qe,$ as Be,v as je,F as Ge,a0 as Je,a1 as M,U as ae}from"./index-f8022b9b.js";import{w as Ke}from"./index-0051cdc5.js";var V=(i=>(i[i.Vertical=0]="Vertical",i[i.Horizontal=1]="Horizontal",i))(V||{}),S=(i=>(i[i.Programatic=0]="Programatic",i[i.UserDrag=1]="UserDrag",i[i.UserCopy=2]="UserCopy",i))(S||{});function le(i,e,n){const m=i.slice();return m[34]=e[n],m[35]=e,m[36]=n,m}const Qe=i=>({index:i[0]&32,drag:i[0]&130}),ue=i=>{var e,n,m,u;return{index:i[36],drag:((n=(e=i[7])==null?void 0:e.sourceZone)==null?void 0:n.id)===i[1]||((u=(m=i[7])==null?void 0:m.destZone)==null?void 0:u.id)===i[1]?i[7]:void 0}};function ce(i,e){let n,m,u,E,Z=e[36],y,a,l;const p=e[20].default,b=Ge(p,e,e[19],ue),R=()=>e[21](n,Z),F=()=>e[21](null,Z);function W(...g){return e[22](e[36],...g)}function A(...g){return e[23](e[36],...g)}return{key:i,first:null,c(){n=ge("div"),b&&b.c(),m=Ae(),this.h()},l(g){n=me(g,"DIV",{"data-dnd-item":!0,"data-dnd-dragging":!0,class:!0,style:!0});var w=ye(n);b&&b.l(w),m=Pe(w),w.forEach(q),this.h()},h(){O(n,"data-dnd-item",""),O(n,"data-dnd-dragging",u=(o==null?void 0:o.sourceIndex)===e[36]&&(o==null?void 0:o.sourceZone.id)===e[1]||e[7]===null?!0:void 0),O(n,"class",E=B(e[2])+" svelte-1h8tpti"),O(n,"style",e[6]),this.first=n},m(g,w){pe(g,n,w),b&&b.m(n,null),Re(n,m),R(),y=!0,a||(l=[de(n,"mousedown",W),de(n,"touchstart",A)],a=!0)},p(g,w){e=g,b&&b.p&&(!y||w[0]&524450)&&Fe(b,p,e,e[19],y?We(p,e[19],w,Qe):Ue(e[19]),ue),(!y||w[0]&162&&u!==(u=(o==null?void 0:o.sourceIndex)===e[36]&&(o==null?void 0:o.sourceZone.id)===e[1]||e[7]===null?!0:void 0))&&O(n,"data-dnd-dragging",u),(!y||w[0]&4&&E!==(E=B(e[2])+" svelte-1h8tpti"))&&O(n,"class",E),(!y||w[0]&64)&&O(n,"style",e[6]),Z!==e[36]&&(F(),Z=e[36],R())},i(g){y||(_e(b,g),y=!0)},o(g){be(b,g),y=!1},d(g){g&&q(n),b&&b.d(g),F(),a=!1,Ye(l)}}}function $e(i){let e,n=[],m=new Map,u,E,Z=i[5];const y=a=>a[4](a[36]);for(let a=0;a<Z.length;a+=1){let l=le(i,Z,a),p=y(l);m.set(p,n[a]=ce(p,l))}return{c(){e=ge("div");for(let a=0;a<n.length;a+=1)n[a].c();this.h()},l(a){e=me(a,"DIV",{"data-dnd-zone":!0,class:!0});var l=ye(e);for(let p=0;p<n.length;p+=1)n[p].l(l);l.forEach(q),this.h()},h(){O(e,"data-dnd-zone",""),O(e,"class",u=B(`${i[3]} ${i[0].containerClass}`)+" svelte-1h8tpti")},m(a,l){pe(a,e,l);for(let p=0;p<n.length;p+=1)n[p].m(e,null);i[24](e),E=!0},p(a,l){l[0]&525303&&(Z=a[5],Xe(),n=Ne(n,l,y,1,a,Z,m,e,Je,ce,null,le),Ve()),(!E||l[0]&9&&u!==(u=B(`${a[3]} ${a[0].containerClass}`)+" svelte-1h8tpti"))&&O(e,"class",u)},i(a){if(!E){for(let l=0;l<Z.length;l+=1)_e(n[l]);E=!0}},o(a){for(let l=0;l<n.length;l+=1)be(n[l]);E=!1},d(a){a&&q(e);for(let l=0;l<n.length;l+=1)n[l].d();i[24](null)}}}const et="data-dnd-zone",tt=`[${et}]`,fe="[data-dnd-handle]",nt="data-dnd-copy",it="data-dnd-placeholder",he=5,U=new Array;let H,o,I;const k=Ke(void 0);function st(i,e){var m;const n=(m=document.elementFromPoint(i,e))==null?void 0:m.closest(tt);return n?U.find(u=>u.el===n):void 0}function ot(i,e,n){let m,u;qe(i,k,t=>n(7,u=t));let{$$slots:E={},$$scope:Z}=e,{id:y}=e,{itemCount:a}=e,{itemSize:l}=e,{type:p}=e,{priority:b=1}=e,{itemClass:R=""}=e,{zoneClass:F=""}=e,{keyFn:W=t=>t}=e,{useHandle:A=!1}=e,{allowDrag:g=()=>!0}=e,{copy:w=!1}=e;const r=new p(y,b,a,l),xe=Be();let j=new Array(a);je(()=>(r.styleContainerBaseStyle(),U.push(r),U.sort((t,d)=>d.priority-t.priority),()=>{U.splice(U.findIndex(t=>t===r),1)}));function G(t,d){t.button!==0||!g(d)||A&&t.target.closest(fe)===null||(document.addEventListener("mousemove",Q),document.addEventListener("mouseup",te),K({pageX:t.pageX,pageY:t.pageY},d))}function J(t,d){!g(d)||A&&t.target.closest(fe)===null||(document.addEventListener("touchmove",$),document.addEventListener("touchend",ne),K({pageX:t.touches[0].pageX,pageY:t.touches[0].pageY},d))}function K({pageX:t,pageY:d},s){const f=r.items[s],c=f.getBoundingClientRect();H={el:f,initPageX:t,initPageY:d,sourceIndex:s,dragLeft:t-c.left,dragTop:d-c.top,sourceZone:r}}function Q(t){ee(t)}function $(t){ee({pageX:t.touches[0].pageX,pageY:t.touches[0].pageY})}function ee({pageX:t,pageY:d}){if(o===void 0&&(Math.abs(t-H.initPageX)>he||Math.abs(d-H.initPageY)>he)){o&&P();const s=new Set([r]);let f,c,x;w?(x=S.UserCopy,c=H.el.cloneNode(!0),c.setAttribute(nt,""),document.body.appendChild(c)):(x=S.UserDrag,c=H.el,f=document.createElement("div"),f.style.cssText=r.placeholderStyleStr(),f.setAttribute(it,""),r.el.appendChild(f)),o={type:x,el:c,placeholder:f,resetZones:s,sourceIndex:H.sourceIndex,hoverIndex:void 0,sourceZone:H.sourceZone,destZone:r,dragLeft:H.dragLeft,dragTop:H.dragTop,onResolve:void 0},M(k,u=o,u),H=void 0,document.body.style.cursor="grabbing"}o&&(I&&cancelAnimationFrame(I),I=requestAnimationFrame(()=>{I=void 0;const s=o,{el:f,sourceZone:c,sourceIndex:x,dragLeft:_,dragTop:v}=s,z=t-_,C=d-v;let h=st(t,d);if(h===c){const D=h!==s.destZone;D&&s.destZone!==void 0&&s.destZone.styleDestReset();const L=h.pointIndex(t,d);s.type===S.UserDrag&&(L!==s.hoverIndex||D)&&(h.styleSourceMove(L,x,s.hoverIndex!==void 0),o=N(X({},o),{hoverIndex:L,destZone:h}),M(k,u=o,u)),f.style.cssText=`position: fixed;
						top: 0;
						left: 0;
						z-index:1000;
						pointer-events:none;
						cursor:grabbing;
						height:${c.itemHeight()}px;
						width:${c.itemWidth()}px; transition:height 0.2s cubic-bezier(0.2, 0, 0, 1), width 0.2s cubic-bezier(0.2, 0, 0, 1); position:fixed; transform:translate(${z}px,${C}px)`}else{const D=h!==s.destZone;if(D&&(s.type===S.UserDrag&&s.destZone===c?s.destZone.styleSourceMissing(x):s.destZone!==void 0&&s.destZone.styleDestReset()),h!==void 0){D&&s.resetZones.add(h);const L=h.pointIndex(t,d);(L!==s.hoverIndex||D)&&(h.styleDestMove(L),o=N(X({},o),{hoverIndex:L,destZone:h}),M(k,u=o,u)),f.style.cssText=`position: fixed; top: 0; left: 0; z-index:1000; pointer-events: none; cursor:grabbing; position:fixed; height:${h.itemHeight()}px; width:${h.itemWidth()}px; transition: height 0.2s cubic-bezier(0.2, 0, 0, 1); transform:translate(${z}px,${C}px); transition:height 0.2s cubic-bezier(0.2, 0, 0, 1), width 0.2s cubic-bezier(0.2, 0, 0, 1);`}else D&&(o=N(X({},o),{hoverIndex:-1,destZone:void 0}),M(k,u=o,u)),f.style.cssText=`position: fixed; top: 0; left: 0; z-index:1000; pointer-events:none; cursor:grabbing; position:fixed; transform:translate(${z}px,${C}px); height:${s.sourceZone.itemHeight()}px; width:${s.sourceZone.itemWidth()}px;  transition:height 0.2s cubic-bezier(0.2, 0, 0, 1), width 0.2s cubic-bezier(0.2, 0, 0, 1);`}}))}function te(t){document.removeEventListener("mousemove",Q),document.removeEventListener("mouseup",te),o&&ie()}function ne(t){document.removeEventListener("touchmove",$),document.removeEventListener("touchend",ne),o&&ie()}function ie(){var D;I&&cancelAnimationFrame(I);const{el:t,destZone:d,sourceZone:s,sourceIndex:f,type:c}=o,x=(D=o.hoverIndex)!=null?D:f;document.body.style.cursor="",t.addEventListener("transitionend",P);let _,v,z,C,h=!1;if(d===s&&c!==S.UserCopy){let L=0,Y=0;const{count:Le,direction:se}=s;x===Le&&(se===V.Vertical?Y=-1:se===V.Horizontal&&(L=-1)),_=s.dragXOffset(x+L),v=s.dragYOffset(x+Y),z=s.itemHeight(),C=s.itemWidth(),h=t.style.transform===`translate(${_}px, ${v}px)`||t.style.transform===""}else d!==void 0&&d!==s?(_=d.dragXOffset(x,d.count+1),v=d.dragYOffset(x,d.count+1),z=d.itemHeight(),C=d.itemWidth()):(_=s.dragXOffset(f),v=s.dragYOffset(f),z=s.itemHeight(),C=s.itemWidth(),c!==S.UserCopy&&s.styleSourceMove(f,f,!0));t.style.cssText=`position: fixed; top: 0; left: 0; z-index:1000; position:fixed; height:${z}px; width:${C}px; transform:translate(${_}px,${v}px); transition:transform 0.2s cubic-bezier(0.2,0,0,1), height 0.2s cubic-bezier(0.2, 0, 0, 1), width 0.2s cubic-bezier(0.2, 0, 0, 1);`,h&&P()}function P(t){var D,L;const{el:d,destZone:s,sourceZone:f,sourceIndex:c,resetZones:x,placeholder:_,type:v}=o,z=(D=o.hoverIndex)!=null?D:c;if(d&&v===S.UserCopy&&d.remove(),t&&t.target!==d)return;I&&cancelAnimationFrame(I),I=void 0;const C={dropZoneID:f.id,index:c},h=s?s===f&&z===c?C:{dropZoneID:s.id,index:z}:void 0;xe("drop",{from:C,to:h}),_&&f.el.removeChild(_),x.forEach(Y=>Y.styleRemove()),d.removeEventListener("transitionend",P),(L=o.onResolve)==null||L.call(o),o=void 0,M(k,u=void 0,u)}async function ze(t,d,s,f=500){return new Promise((c,x)=>{if(o!==void 0){c();return}const _=r.items[t];if(!_){c();return}{const v=r.dragXOffset(t),z=r.dragYOffset(t),C=r.itemHeight(),h=r.itemWidth();_.style.cssText=`z-index:1000; height:${C}px; width:${h}px; position:fixed; transform:translate(${v}px,${z}px)`}r.styleSourceMove(t,t,!1),s!==r?(setTimeout(()=>{(o==null?void 0:o.type)===S.Programatic&&r.styleSourceMissing(t)},f*.4),s.styleDestMove(d)):setTimeout(()=>{(o==null?void 0:o.type)===S.Programatic&&r.styleSourceMove(d,t,!0)},f*.25),o={type:S.Programatic,el:_,placeholder:void 0,resetZones:new Set([r,s]),sourceIndex:t,hoverIndex:d,sourceZone:r,destZone:s,dragLeft:0,dragTop:0,onResolve:c},M(k,u=o,u);{const v=s.dragXOffset(d,s.count+1),z=s.dragYOffset(d,s.count+1),C=s.itemHeight(),h=s.itemWidth();_.addEventListener("transitionend",P),_.style.cssText=`
                z-index: 1000; 
                position: fixed; 
				top:0; left: 0;
                height: ${C}px; 
                width: ${h}px; 
                transform: translate(${v}px,${z}px); 
                transition:
                    transform ${f}ms cubic-bezier(0.2, 0, 0, 1), 
                    height ${f}ms cubic-bezier(0.2, 0, 0, 1), 
                    width ${f}ms cubic-bezier(0.2, 0, 0, 1);`}})}async function we(t,d=500){return new Promise((s,f)=>{if(o!==void 0){s();return}const c=r.items[t];if(!c){s();return}c.style.cssText=`height:${r.itemHeight()}px; width:${r.itemWidth()}px; position:fixed; opacity: 1;`,r.styleSourceMove(t,t,!1),setTimeout(()=>{(o==null?void 0:o.type)===S.Programatic&&r.styleSourceMissing(t)},d*.4),o={type:S.Programatic,el:c,placeholder:void 0,resetZones:new Set([r]),sourceIndex:t,hoverIndex:t,sourceZone:r,destZone:void 0,dragLeft:0,dragTop:0,onResolve:s},M(k,u=o,u);{const x=r.dragXOffset(t,r.count+1),_=r.dragYOffset(t,r.count+1),v=r.itemHeight(),z=r.itemWidth();c.addEventListener("transitionend",P),c.style.cssText=`
                position: fixed; 
				top:0; left: 0;
                height: ${v}px; 
                width: ${z}px; 
				opacity: 0.6;
                transform: translate(${x}px,${_}px); 
                transition:
					opacity ${d}ms cubic-bezier(0.2, 0, 0, 1);
                    transform ${d}ms cubic-bezier(0.2, 0, 0, 1), 
                    height ${d}ms cubic-bezier(0.2, 0, 0, 1), 
                    width ${d}ms cubic-bezier(0.2, 0, 0, 1);`}})}function ve(t,d){ae[t?"unshift":"push"](()=>{r.items[d]=t,n(0,r),n(1,y),n(10,a),n(11,l)})}const Ce=(t,d)=>G(d,t),Ze=(t,d)=>J(d,t);function De(t){ae[t?"unshift":"push"](()=>{r.el=t,n(0,r),n(1,y),n(10,a),n(11,l)})}return i.$$set=t=>{"id"in t&&n(1,y=t.id),"itemCount"in t&&n(10,a=t.itemCount),"itemSize"in t&&n(11,l=t.itemSize),"type"in t&&n(12,p=t.type),"priority"in t&&n(13,b=t.priority),"itemClass"in t&&n(2,R=t.itemClass),"zoneClass"in t&&n(3,F=t.zoneClass),"keyFn"in t&&n(4,W=t.keyFn),"useHandle"in t&&n(14,A=t.useHandle),"allowDrag"in t&&n(15,g=t.allowDrag),"copy"in t&&n(16,w=t.copy),"$$scope"in t&&n(19,Z=t.$$scope)},i.$$.update=()=>{i.$$.dirty[0]&2&&n(0,r.id=y,r),i.$$.dirty[0]&3073&&(a!=r.count||l!==r.itemSize)&&(n(0,r.count=a,r),n(0,r.itemSize=l,r),n(5,j=new Array(a)),r.el&&r.styleContainerBaseStyle()),i.$$.dirty[0]&2049&&n(6,m=`${r.direction===V.Vertical?"height":"width"}: ${l}px;`)},[r,y,R,F,W,j,m,u,G,J,a,l,p,b,A,g,w,ze,we,Z,E,ve,Ce,Ze,De]}class lt extends Ie{constructor(e){super(),ke(this,e,ot,$e,Me,{id:1,itemCount:10,itemSize:11,type:12,priority:13,itemClass:2,zoneClass:3,keyFn:4,useHandle:14,allowDrag:15,copy:16,dropzone:0,move:17,remove:18},null,[-1,-1])}get id(){return this.$$.ctx[1]}set id(e){this.$$set({id:e}),T()}get itemCount(){return this.$$.ctx[10]}set itemCount(e){this.$$set({itemCount:e}),T()}get itemSize(){return this.$$.ctx[11]}set itemSize(e){this.$$set({itemSize:e}),T()}get type(){return this.$$.ctx[12]}set type(e){this.$$set({type:e}),T()}get priority(){return this.$$.ctx[13]}set priority(e){this.$$set({priority:e}),T()}get itemClass(){return this.$$.ctx[2]}set itemClass(e){this.$$set({itemClass:e}),T()}get zoneClass(){return this.$$.ctx[3]}set zoneClass(e){this.$$set({zoneClass:e}),T()}get keyFn(){return this.$$.ctx[4]}set keyFn(e){this.$$set({keyFn:e}),T()}get useHandle(){return this.$$.ctx[14]}set useHandle(e){this.$$set({useHandle:e}),T()}get allowDrag(){return this.$$.ctx[15]}set allowDrag(e){this.$$set({allowDrag:e}),T()}get copy(){return this.$$.ctx[16]}set copy(e){this.$$set({copy:e}),T()}get dropzone(){return this.$$.ctx[0]}get move(){return this.$$.ctx[17]}get remove(){return this.$$.ctx[18]}}export{V as D,lt as a};