import{D as c}from"./DragDropList-2e527793.js";class f{constructor(e,t,i,s){this.direction=c.Vertical,this.id=e,this.priority=i,this.count=t,this.itemSize=s,this.items=new Array(t),this.el=void 0,this.containerClass="vertical"}pointIndex(e,t){const{el:i,itemSize:s,count:r}=this,a=i.getBoundingClientRect().top-i.scrollTop+window.scrollY,o=Math.floor((t-a)/s);return Math.min(Math.max(o,0),r)}placeholderStyleStr(){return`height: ${this.itemSize}px; width: 100%;`}dragXOffset(e){return this.el.getBoundingClientRect().left}dragYOffset(e){const t=this.el.getBoundingClientRect();return e*this.itemSize+t.top}itemHeight(){return this.itemSize}itemWidth(){return this.el.clientWidth}styleSourceMove(e,t,i){const{items:s,itemSize:r}=this;for(let n=0;n<s.length;++n){const a=e>t&&(n<t||n>t&&n<=e)||e<t&&n<e||e==t&&n<t,o=e>t&&n>e||e<t&&(n>=e&&n<t||n>t)||e==t&&n>t,l=s[n];a?l&&(l.style.cssText=`transform: translateY(0px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); height: ${r}px;`):o&&(i?l&&(l.style.cssText=`transform: translateY(${r}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); height: ${r}px;`):l&&(l.style.cssText=`transform: translateY(${r}px); height: ${r}px;`))}}styleSourceMissing(e){const{items:t,itemSize:i}=this;for(let s=0;s<t.length;++s)t[s]&&s!==e&&(t[s].style.cssText=`transform: translateY(0px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); height: ${i}px;`)}styleDestMove(e){const{items:t,itemSize:i}=this;for(let s=0;s<t.length;++s){const r=t[s];s<e?r&&(r.style.cssText=`transform: translateY(0px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); height: ${i}px;`):r&&(r.style.cssText=`transform: translateY(${i}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); height: ${i}px;`)}}styleDestReset(){const{items:e,itemSize:t}=this;for(let i=0;i<e.length;++i)e[i]&&(e[i].style.cssText=`transform:translateY(0px); transition:transform 0.2s cubic-bezier(0.2, 0, 0, 1); height: ${t}px;`)}styleRemove(){this.styleContainerBaseStyle()}styleContainerBaseStyle(){const{items:e,itemSize:t}=this;for(let i=0;i<e.length;++i){const s=e[i];s&&(s.style.cssText=`height: ${t}px;`)}}}export{f as V};