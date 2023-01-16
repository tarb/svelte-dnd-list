import{S as De,i as Te,I as He,U as D,k as ge,l as me,m as pe,h as G,n as S,V as j,b as ye,g as Se,W as Ye,d as Oe,f as we,t as _e,H as Xe,X as ke,o as Ie,C as Re,a as Ae,c as Me,G as Pe,N as le,D as We,E as Fe,F as Ue,Y as Be,Z as Ve,_ as R,R as ce}from"./index-86407da6.js";import{w as Ne}from"./index-6dd86626.js";var q=(o=>(o[o.Vertical=0]="Vertical",o[o.Horizontal=1]="Horizontal",o))(q||{}),E=(o=>(o[o.Programatic=0]="Programatic",o[o.UserDrag=1]="UserDrag",o[o.UserCopy=2]="UserCopy",o))(E||{});function lt(o,e,t){const d=o.slice(),[i]=d.splice(e,1);return t>d.length?d.push(i):d.splice(t,0,i),d}function qe(o,e,t,d=10){do{if(t===document.scrollingElement)break;if(Je(t)){const i=t.getBoundingClientRect(),y=i.height/3,p=i.width/3;let h=!1;if(e>i.top&&e<i.top+y&&t.scrollTop>0){const s=(e-i.top)/y*d;t.scrollTop-=d-s,h=!0}else if(e<i.bottom&&e>i.bottom-y&&t.scrollTop+t.clientHeight<t.scrollHeight){const s=(i.bottom-e)/y*d;t.scrollTop+=d-s,h=!0}if(o>i.left&&o<i.left+p&&t.scrollLeft>0){const s=(o-i.left)/p*d;t.scrollLeft-=d-s,h=!0}else if(o<i.right&&o>i.right-p&&t.scrollLeft+t.clientWidth<t.scrollWidth){const s=(i.right-o)/p*d;t.scrollLeft+=d-s,h=!0}if(h)return!0}}while(t=t==null?void 0:t.parentElement);return Ge(o,e,d)}function Ge(o,e,t=10){const d=window.innerHeight,i=window.innerWidth,y=d/3,p=i/3;let h=!1;if(o<p&&window.scrollX>0){const s=o/p*t;window.scrollBy(-(t-s),0),h=!0}else if(o>i-p&&window.scrollX+i<document.scrollingElement.scrollWidth){const s=(i-o)/p*t;window.scrollBy(t-s,0),h=!0}if(e<y&&window.scrollY>0){const s=e/y*t;window.scrollBy(0,-(t-s)),h=!0}else if(e>d-y&&window.scrollY+d<document.scrollingElement.scrollHeight){const s=(d-e)/y*t;window.scrollBy(0,t-s),h=!0}return h}function je(o){const e=getComputedStyle(o);return e.overflowY==="scroll"||e.overflowY==="auto"||e.overflowX==="scroll"||e.overflowX==="auto"}function Je(o){return o&&(o.scrollHeight>o.clientHeight||o.scrollWidth>o.clientWidth)&&je(o)}function de(o,e,t){const d=o.slice();return d[35]=e[t],d[36]=e,d[37]=t,d}const Ke=o=>({index:o[0]&32,drag:o[0]&130}),ae=o=>{var e,t,d,i;return{index:o[37],drag:((t=(e=o[7])==null?void 0:e.sourceZone)==null?void 0:t.id)===o[1]||((i=(d=o[7])==null?void 0:d.destZone)==null?void 0:i.id)===o[1]?o[7]:void 0}};function ue(o,e){let t,d,i,y,p=e[37],h,s,f;const v=e[21].default,z=Re(v,e,e[20],ae),A=()=>e[22](t,p),F=()=>e[22](null,p);function V(..._){return e[23](e[37],..._)}function N(..._){return e[24](e[37],..._)}return{key:o,first:null,c(){t=ge("div"),z&&z.c(),d=Ae(),this.h()},l(_){t=me(_,"DIV",{"data-dnd-item":!0,"data-dnd-dragging":!0,class:!0,style:!0});var x=pe(t);z&&z.l(x),d=Me(x),x.forEach(G),this.h()},h(){S(t,"data-dnd-item",""),S(t,"data-dnd-dragging",i=(r==null?void 0:r.sourceIndex)===e[37]&&(r==null?void 0:r.sourceZone.id)===e[1]||e[7]===null?!0:void 0),S(t,"class",y=j(e[2])+" svelte-5t9ew"),S(t,"style",e[6]),this.first=t},m(_,x){ye(_,t,x),z&&z.m(t,null),Pe(t,d),A(),h=!0,s||(f=[le(t,"mousedown",V),le(t,"touchstart",N)],s=!0)},p(_,x){e=_,z&&z.p&&(!h||x[0]&1048738)&&We(z,v,e,e[20],h?Ue(v,e[20],x,Ke):Fe(e[20]),ae),(!h||x[0]&162&&i!==(i=(r==null?void 0:r.sourceIndex)===e[37]&&(r==null?void 0:r.sourceZone.id)===e[1]||e[7]===null?!0:void 0))&&S(t,"data-dnd-dragging",i),(!h||x[0]&4&&y!==(y=j(e[2])+" svelte-5t9ew"))&&S(t,"class",y),(!h||x[0]&64)&&S(t,"style",e[6]),p!==e[37]&&(F(),p=e[37],A())},i(_){h||(we(z,_),h=!0)},o(_){_e(z,_),h=!1},d(_){_&&G(t),z&&z.d(_),F(),s=!1,Be(f)}}}function Qe(o){let e,t=[],d=new Map,i,y,p=o[5];const h=s=>s[4](s[37]);for(let s=0;s<p.length;s+=1){let f=de(o,p,s),v=h(f);d.set(v,t[s]=ue(v,f))}return{c(){e=ge("div");for(let s=0;s<t.length;s+=1)t[s].c();this.h()},l(s){e=me(s,"DIV",{"data-dnd-zone":!0,class:!0});var f=pe(e);for(let v=0;v<t.length;v+=1)t[v].l(f);f.forEach(G),this.h()},h(){S(e,"data-dnd-zone",""),S(e,"class",i=j(`${o[3]} ${o[0].containerClass}`)+" svelte-5t9ew")},m(s,f){ye(s,e,f);for(let v=0;v<t.length;v+=1)t[v].m(e,null);o[25](e),y=!0},p(s,f){f[0]&1049591&&(p=s[5],Se(),t=Ye(t,f,h,1,s,p,d,e,Ve,ue,null,de),Oe()),(!y||f[0]&9&&i!==(i=j(`${s[3]} ${s[0].containerClass}`)+" svelte-5t9ew"))&&S(e,"class",i)},i(s){if(!y){for(let f=0;f<p.length;f+=1)we(t[f]);y=!0}},o(s){for(let f=0;f<t.length;f+=1)_e(t[f]);y=!1},d(s){s&&G(e);for(let f=0;f<t.length;f+=1)t[f].d();o[25](null)}}}const $e="data-dnd-zone",et=`[${$e}]`,fe="[data-dnd-handle]",tt="data-dnd-copy",nt="data-dnd-placeholder",he=5,B=new Array;let T,r,H;const X=Ne(void 0);function ot(o,e){const t=document.elementFromPoint(o,e),d=t==null?void 0:t.closest(et);return[t,d?B.find(i=>i.el===d):void 0]}function it(o,e,t){let d,i;Xe(o,X,n=>t(7,i=n));let{$$slots:y={},$$scope:p}=e,{id:h}=e,{itemCount:s}=e,{itemSize:f}=e,{type:v}=e,{priority:z=1}=e,{scrollSpeed:A=15}=e,{itemClass:F=""}=e,{zoneClass:V=""}=e,{keyFn:N=n=>n}=e,{useHandle:_=!1}=e,{allowDrag:x=()=>!0}=e,{copy:J=!1}=e;const l=new v(h,z,s,f),be=ke();let K=new Array(s);Ie(()=>(l.styleContainerBaseStyle(),B.push(l),B.sort((n,c)=>c.priority-n.priority),()=>{B.splice(B.findIndex(n=>n===l),1)}));function Q(n,c){n.button!==0||!x(c)||_&&n.target.closest(fe)===null||(document.addEventListener("mousemove",te),document.addEventListener("mouseup",ie),ee({pageX:n.pageX,pageY:n.pageY},c))}function $(n,c){!x(c)||_&&n.target.closest(fe)===null||(document.addEventListener("touchmove",ne),document.addEventListener("touchend",se),ee({pageX:n.touches[0].pageX,pageY:n.touches[0].pageY},c))}function ee({pageX:n,pageY:c},u){const g=l.items[u],b=g.getBoundingClientRect();T={el:g,initPageX:n,initPageY:c,sourceIndex:u,dragLeft:n-b.left,dragTop:c-b.top,sourceZone:l}}function te(n){oe(n)}function ne(n){oe({pageX:n.touches[0].pageX,pageY:n.touches[0].pageY,clientX:n.touches[0].clientX,clientY:n.touches[0].clientY})}function oe({pageX:n,pageY:c,clientX:u,clientY:g}){if(r===void 0&&(Math.abs(n-T.initPageX)>he||Math.abs(c-T.initPageY)>he)){r&&M();const b=new Set([l]);let a,m,w;J?(w=E.UserCopy,m=T.el.cloneNode(!0),m.setAttribute(tt,""),document.body.appendChild(m)):(w=E.UserDrag,m=T.el,a=document.createElement("div"),a.style.cssText=l.placeholderStyleStr(),a.setAttribute(nt,""),l.el.appendChild(a)),r={type:w,el:m,placeholder:a,resetZones:b,sourceIndex:T.sourceIndex,hoverIndex:void 0,sourceZone:T.sourceZone,destZone:l,dragLeft:T.dragLeft-window.scrollX,dragTop:T.dragTop-window.scrollY,onResolve:void 0},R(X,i=r,i),T=void 0,document.body.style.cursor="grabbing"}if(r){H&&cancelAnimationFrame(H);const b=()=>{H=void 0;const a=r,{el:m,sourceZone:w,sourceIndex:C,dragLeft:Z,dragTop:P}=a,Y=u-Z,O=g-P,U=n-window.scrollX,W=c-window.scrollY,[Ee,L]=ot(U,W);if(L===w){const k=L!==a.destZone;k&&a.destZone!==void 0&&a.destZone.styleDestReset();const I=L.pointIndex(U,W);a.type===E.UserDrag&&(I!==a.hoverIndex||k)&&(L.styleSourceMove(I,C,a.hoverIndex!==void 0),r={...r,hoverIndex:I,destZone:L},R(X,i=r,i)),m.style.cssText=`
						position: fixed;
						top: 0;
						left: 0;
						z-index:1000;
						pointer-events:none;
						cursor:grabbing;
						height:${w.itemHeight()}px;
						width:${w.itemWidth()}px; 
						transform:translate(${Y}px,${O}px);
						transition: 
							height 0.2s cubic-bezier(0.2, 0, 0, 1), 
							width 0.2s cubic-bezier(0.2, 0, 0, 1);
						`}else{const k=L!==a.destZone;if(k&&(a.type===E.UserDrag&&a.destZone===w?a.destZone.styleSourceMissing(C):a.destZone!==void 0&&a.destZone.styleDestReset()),L!==void 0){k&&a.resetZones.add(L);const I=L.pointIndex(U,W);(I!==a.hoverIndex||k)&&(L.styleDestMove(I),r={...r,hoverIndex:I,destZone:L},R(X,i=r,i)),m.style.cssText=`
							position: fixed;
							top: 0;
							left: 0;
							z-index:1000;
							pointer-events: none;
							cursor: grabbing;
							height: ${L.itemHeight()}px;
							width: ${L.itemWidth()}px;
							transform: translate(${Y}px,${O}px);
							transition: 
								height 0.2s cubic-bezier(0.2, 0, 0, 1), 
								width 0.2s cubic-bezier(0.2, 0, 0, 1);
						`}else k&&(r={...r,hoverIndex:-1,destZone:void 0},R(X,i=r,i)),m.style.cssText=`
							position: fixed;
							top: 0;
							left: 0;
							z-index: 1000;
							pointer-events: none;
							cursor: grabbing;
							height: ${a.sourceZone.itemHeight()}px;
							width: ${a.sourceZone.itemWidth()}px;
							transform: translate(${Y}px,${O}px);
							transition:
								height 0.2s cubic-bezier(0.2, 0, 0, 1), 
								width 0.2s cubic-bezier(0.2, 0, 0, 1);
						`}qe(u,g,Ee,A)&&(H=requestAnimationFrame(b))};H=requestAnimationFrame(b)}}function ie(n){document.removeEventListener("mousemove",te),document.removeEventListener("mouseup",ie),r&&re()}function se(n){document.removeEventListener("touchmove",ne),document.removeEventListener("touchend",se),r&&re()}function re(){H&&cancelAnimationFrame(H);const{el:n,destZone:c,sourceZone:u,sourceIndex:g,type:b}=r,a=r.hoverIndex??g;document.body.style.cursor="",n.addEventListener("transitionend",M);let m,w,C,Z,P=!1;if(c===u&&b!==E.UserCopy){let Y=0,O=0;const{count:U,direction:W}=u;a===U&&(W===q.Vertical?O=-1:W===q.Horizontal&&(Y=-1)),m=u.dragXOffset(a+Y),w=u.dragYOffset(a+O),C=u.itemHeight(),Z=u.itemWidth(),P=n.style.transform===`translate(${m}px, ${w}px)`||n.style.transform===""}else c!==void 0&&c!==u?(m=c.dragXOffset(a,c.count+1),w=c.dragYOffset(a,c.count+1),C=c.itemHeight(),Z=c.itemWidth()):(m=u.dragXOffset(g),w=u.dragYOffset(g),C=u.itemHeight(),Z=u.itemWidth(),b!==E.UserCopy&&u.styleSourceMove(g,g,!0));n.style.cssText=`
			top: 0;
			left: 0;
			z-index: 1000;
			position: fixed;
			height: ${C}px;
			width: ${Z}px;
			transform: translate(${m}px,${w}px);
			transition: 
				transform 0.2s cubic-bezier(0.2,0,0,1),
				height 0.2s cubic-bezier(0.2, 0, 0, 1),
				width 0.2s cubic-bezier(0.2, 0, 0, 1);
		`,P&&M()}function M(n){var Y;const{el:c,destZone:u,sourceZone:g,sourceIndex:b,resetZones:a,placeholder:m,type:w}=r,C=r.hoverIndex??b;if(c&&w===E.UserCopy&&c.remove(),n&&n.target!==c)return;H&&cancelAnimationFrame(H),H=void 0;const Z={dropZoneID:g.id,index:b},P=u?u===g&&C===b?Z:{dropZoneID:u.id,index:C}:void 0;be("drop",{from:Z,to:P}),m&&g.el.removeChild(m),a.forEach(O=>O.styleRemove()),c.removeEventListener("transitionend",M),(Y=r.onResolve)==null||Y.call(r),r=void 0,R(X,i=void 0,i)}async function ve(n,c,u,g=500){return new Promise(b=>{if(r!==void 0){b();return}const a=l.items[n];if(!a){b();return}{const m=l.dragXOffset(n),w=l.dragYOffset(n),C=l.itemHeight(),Z=l.itemWidth();a.style.cssText=`
					z-index: 1000;
					height: ${C}px;
					width: ${Z}px;
					position: fixed;
					transform: translate(${m}px,${w}px);
				`}l.styleSourceMove(n,n,!1),u!==l?(setTimeout(()=>{(r==null?void 0:r.type)===E.Programatic&&l.styleSourceMissing(n)},g*.4),u.styleDestMove(c)):setTimeout(()=>{(r==null?void 0:r.type)===E.Programatic&&l.styleSourceMove(c,n,!0)},g*.25),r={type:E.Programatic,el:a,placeholder:void 0,resetZones:new Set([l,u]),sourceIndex:n,hoverIndex:c,sourceZone:l,destZone:u,dragLeft:0,dragTop:0,onResolve:b},R(X,i=r,i);{const m=u.dragXOffset(c,u.count+1),w=u.dragYOffset(c,u.count+1),C=u.itemHeight(),Z=u.itemWidth();a.addEventListener("transitionend",M),a.style.cssText=`
					z-index: 1000; 
					position: fixed; 
					top:0; left: 0;
					height: ${C}px; 
					width: ${Z}px; 
					transform: translate(${m}px,${w}px); 
					transition:
						transform ${g}ms cubic-bezier(0.2, 0, 0, 1), 
						height ${g}ms cubic-bezier(0.2, 0, 0, 1), 
						width ${g}ms cubic-bezier(0.2, 0, 0, 1);
				`}})}async function ze(n,c=500){return new Promise(u=>{if(r!==void 0){u();return}const g=l.items[n];if(!g){u();return}g.style.cssText=`height:${l.itemHeight()}px; width:${l.itemWidth()}px; position:fixed; opacity: 1;`,l.styleSourceMove(n,n,!1),setTimeout(()=>{(r==null?void 0:r.type)===E.Programatic&&l.styleSourceMissing(n)},c*.4),r={type:E.Programatic,el:g,placeholder:void 0,resetZones:new Set([l]),sourceIndex:n,hoverIndex:n,sourceZone:l,destZone:void 0,dragLeft:0,dragTop:0,onResolve:u},R(X,i=r,i);{const b=l.dragXOffset(n,l.count+1),a=l.dragYOffset(n,l.count+1),m=l.itemHeight(),w=l.itemWidth();g.addEventListener("transitionend",M),g.style.cssText=`
					position: fixed; 
					top:0; left: 0;
					height: ${m}px; 
					width: ${w}px; 
					opacity: 0.6;
					transform: translate(${b}px,${a}px); 
					transition:
						opacity ${c}ms cubic-bezier(0.2, 0, 0, 1);
						transform ${c}ms cubic-bezier(0.2, 0, 0, 1), 
						height ${c}ms cubic-bezier(0.2, 0, 0, 1), 
						width ${c}ms cubic-bezier(0.2, 0, 0, 1);
				`}})}function xe(n,c){ce[n?"unshift":"push"](()=>{l.items[c]=n,t(0,l),t(1,h),t(10,s),t(11,f)})}const Ce=(n,c)=>Q(c,n),Ze=(n,c)=>$(c,n);function Le(n){ce[n?"unshift":"push"](()=>{l.el=n,t(0,l),t(1,h),t(10,s),t(11,f)})}return o.$$set=n=>{"id"in n&&t(1,h=n.id),"itemCount"in n&&t(10,s=n.itemCount),"itemSize"in n&&t(11,f=n.itemSize),"type"in n&&t(12,v=n.type),"priority"in n&&t(13,z=n.priority),"scrollSpeed"in n&&t(14,A=n.scrollSpeed),"itemClass"in n&&t(2,F=n.itemClass),"zoneClass"in n&&t(3,V=n.zoneClass),"keyFn"in n&&t(4,N=n.keyFn),"useHandle"in n&&t(15,_=n.useHandle),"allowDrag"in n&&t(16,x=n.allowDrag),"copy"in n&&t(17,J=n.copy),"$$scope"in n&&t(20,p=n.$$scope)},o.$$.update=()=>{o.$$.dirty[0]&2&&t(0,l.id=h,l),o.$$.dirty[0]&3073&&(s!=l.count||f!==l.itemSize)&&(t(0,l.count=s,l),t(0,l.itemSize=f,l),t(5,K=new Array(s)),l.el&&l.styleContainerBaseStyle()),o.$$.dirty[0]&2049&&t(6,d=`${l.direction===q.Vertical?"height":"width"}: ${f}px;`)},[l,h,F,V,N,K,d,i,Q,$,s,f,v,z,A,_,x,J,ve,ze,p,y,xe,Ce,Ze,Le]}class ct extends De{constructor(e){super(),Te(this,e,it,Qe,He,{id:1,itemCount:10,itemSize:11,type:12,priority:13,scrollSpeed:14,itemClass:2,zoneClass:3,keyFn:4,useHandle:15,allowDrag:16,copy:17,dropzone:0,move:18,remove:19},null,[-1,-1])}get id(){return this.$$.ctx[1]}set id(e){this.$$set({id:e}),D()}get itemCount(){return this.$$.ctx[10]}set itemCount(e){this.$$set({itemCount:e}),D()}get itemSize(){return this.$$.ctx[11]}set itemSize(e){this.$$set({itemSize:e}),D()}get type(){return this.$$.ctx[12]}set type(e){this.$$set({type:e}),D()}get priority(){return this.$$.ctx[13]}set priority(e){this.$$set({priority:e}),D()}get scrollSpeed(){return this.$$.ctx[14]}set scrollSpeed(e){this.$$set({scrollSpeed:e}),D()}get itemClass(){return this.$$.ctx[2]}set itemClass(e){this.$$set({itemClass:e}),D()}get zoneClass(){return this.$$.ctx[3]}set zoneClass(e){this.$$set({zoneClass:e}),D()}get keyFn(){return this.$$.ctx[4]}set keyFn(e){this.$$set({keyFn:e}),D()}get useHandle(){return this.$$.ctx[15]}set useHandle(e){this.$$set({useHandle:e}),D()}get allowDrag(){return this.$$.ctx[16]}set allowDrag(e){this.$$set({allowDrag:e}),D()}get copy(){return this.$$.ctx[17]}set copy(e){this.$$set({copy:e}),D()}get dropzone(){return this.$$.ctx[0]}get move(){return this.$$.ctx[18]}get remove(){return this.$$.ctx[19]}}export{ct as D,q as a,lt as r};
