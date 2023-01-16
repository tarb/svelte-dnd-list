var d=Object.defineProperty;var p=(h,t,i)=>t in h?d(h,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):h[t]=i;var c=(h,t,i)=>(p(h,typeof t!="symbol"?t+"":t,i),i);import{a as x}from"./DragDropList-a1baaa18.js";class y{constructor(t,i,s,e){c(this,"direction",x.Horizontal);c(this,"id");c(this,"priority");c(this,"itemSize");c(this,"count");c(this,"el");c(this,"items");c(this,"containerClass");c(this,"elWidth");c(this,"ro");this.id=t,this.priority=s,this.count=i,this.itemSize=e,this.items=new Array(i),this.el=void 0,this.ro=new ResizeObserver(this.onResize.bind(this)),this.containerClass="horizontal center"}onResize(t){const i=t[0].contentRect.width;this.elWidth=i}placeholderStyleStr(){return`width: ${this.itemSize}px; height: 100%;`}pointIndex(t,i){const{el:s,itemSize:e,count:o}=this,n=s.getBoundingClientRect(),r=n.left-s.scrollLeft;n.top-s.scrollTop,t=t-r;const l=this.count*this.itemSize;let a=0;l<this.elWidth&&(a=Math.floor((this.elWidth-l)/2));const m=Math.floor((t-a)/e);return Math.min(Math.max(m,0),o)}dragYOffset(t,i){return this.el.getBoundingClientRect().top}dragXOffset(t,i){const s=this.el.getBoundingClientRect(),e=(i??this.count)*this.itemSize;if(e<this.elWidth){const o=(this.elWidth-e)/2;return t*this.itemSize+o+s.left}return t*this.itemSize+s.left-this.el.scrollLeft}itemHeight(){return this.el.clientHeight}itemWidth(){return this.itemSize}styleSourceMove(t,i,s){const{items:e,itemSize:o}=this;for(let n=0;n<e.length;++n){const r=t>i&&(n<i||n>i&&n<=t)||t<i&&n<t||t==i&&n<i,l=t>i&&n>t||t<i&&(n>=t&&n<i||n>i)||t==i&&n>i,a=e[n];r?a&&(a.style.cssText=`transform: translateX(0px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${o}px;`):l&&(s?a&&(a.style.cssText=`transform: translateX(${o}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${o}px;`):a&&(a.style.cssText=`transform: translateX(${o}px); width: ${o}px;`))}}styleSourceMissing(t){const{count:i,itemSize:s,items:e,elWidth:o}=this;if(i*s>o&&(i-1)*s<o){const n=Math.floor((o-(i-1)*s)/2)-1;for(let r=0;r<i;++r)e[r]&&r!==t&&(e[r].style.cssText=`transform: translateX(${n}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${s}px;`)}else if((i-1)*s<o)for(let n=0;n<i;++n)e[n]&&n!==t&&(e[n].style.cssText=`transform: translateX(${s/2}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${s}px;`);else for(let n=0;n<i;++n)e[n]&&n!==t&&(e[n].style.cssText=`transform: translateX(0px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${s}px;`)}styleDestMove(t){const{items:i,count:s,itemSize:e,elWidth:o,el:n}=this;if((i.length+1)*e>o&&(n.style.cssText=`transition: padding-bottom 0.2s cubic-bezier(0.2, 0, 0, 1); padding-right: ${e}px;`),s*e<o&&(s+1)*e>o){const r=o-s*e,l=Math.floor(r/2)-1,a=e-l;for(let m=0;m<s;++m){const f=i[m];m<t?f&&(f.style.cssText=`transform: translateX(-${l}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${e}px;`):f&&(f.style.cssText=`transform: translateX(${a}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${e}px;`)}}else if(s*e<o)for(let r=0;r<s;++r){const l=i[r];r<t?l&&(l.style.cssText=`transform: translateX(-${e/2}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${e}px;`):l&&(l.style.cssText=`transform: translateX(${e/2}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${e}px;`)}else for(let r=0;r<s;++r){const l=i[r];r<t?l&&(l.style.cssText=`transform: translateX(0px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${e}px;`):l&&(l.style.cssText=`transform: translateX(${e}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${e}px;`)}}styleDestReset(){const{items:t,itemSize:i,el:s}=this;s.style.cssText="transition: padding-bottom 0.2s cubic-bezier(0.2, 0, 0, 1); padding-bottom: 0px;";for(let e=0;e<t.length;++e)t[e]&&(t[e].style.cssText=`transform:translateX(0px); transition:transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${i}px;`)}styleRemove(){const{items:t,itemSize:i}=this;for(let s=0;s<t.length;++s){const e=t[s];e&&(e.style.cssText=`width: ${i}px;`)}}styleContainerBaseStyle(){this.ro.observe(this.el),this.elWidth=this.el.clientWidth,this.el.style.cssText="";const{items:t,itemSize:i}=this;for(let s=0;s<t.length;++s){const e=t[s];e&&(e.style.cssText=`width: ${i}px;`)}}}export{y as H};
