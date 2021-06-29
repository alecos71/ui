// @fancyapps/ui/Carousel v4.0.0-alpha.2
const t=t=>"object"==typeof t&&null!==t&&t.constructor===Object&&"[object Object]"===Object.prototype.toString.call(t),e=(...i)=>{let s=!1;"boolean"==typeof i[0]&&(s=i.shift());let n=i[0];if(!n||"object"!=typeof n)throw new Error("extendee must be an object");const o=i.slice(1),h=o.length;for(let i=0;i<h;i++){const h=o[i];for(let i in h)if(h.hasOwnProperty(i)){const o=h[i];if(s&&(Array.isArray(o)||t(o))){const t=Array.isArray(o)?[]:{};n[i]=e(!0,n.hasOwnProperty(i)?n[i]:t,o)}else n[i]=o}}return n},i=(t,e=1e3)=>(t=parseFloat(t)||0,Math.round((t+Number.EPSILON)*e)/e),s="undefined"!=typeof window&&window.ResizeObserver||class{constructor(t){this.observables=[],this.boundCheck=this.check.bind(this),this.boundCheck(),this.callback=t}observe(t){if(this.observables.some((e=>e.el===t)))return;const e={el:t,size:{height:t.clientHeight,width:t.clientWidth}};this.observables.push(e)}unobserve(t){this.observables=this.observables.filter((e=>e.el!==t))}disconnect(){this.observables=[]}check(){const t=this.observables.filter((t=>{const e=t.el.clientHeight,i=t.el.clientWidth;if(t.size.height!==e||t.size.width!==i)return t.size.height=e,t.size.width=i,!0})).map((t=>t.el));t.length>0&&this.callback(t),window.requestAnimationFrame(this.boundCheck)}},n=function(t){return!(!t||t.classList.contains("carousel__track")||t===document.body)&&(function(t){const e=window.getComputedStyle(t)["overflow-y"],i=window.getComputedStyle(t)["overflow-x"],s=("scroll"===e||"auto"===e)&&Math.abs(t.scrollHeight-t.clientHeight)>1,n=("scroll"===i||"auto"===i)&&Math.abs(t.scrollWidth-t.clientWidth)>1;return s||n}(t)?t:n(t.parentNode))},o=t=>{let e=0;return t&&(e=t instanceof SVGElement?Math.min(t.getClientRects()[0].width,t.width.baseVal.value):Math.max(t.offsetWidth,t.scrollWidth)),e},h=t=>{let e=0;return t&&(e=t instanceof SVGElement?Math.min(t.getClientRects()[0].height,t.height.baseVal.value):Math.max(t.offsetHeight,t.scrollHeight)),e};class r{constructor(t={}){this.options=e(!0,{},t),this.plugins=[],this.events={};for(const t of["on","once"])for(const e of Object.entries(this.options[t]||{}))this[t](...e)}option(t,e){t=String(t);let i=(s=t,n=this.options,s.split(".").reduce((function(t,e){return t[e]}),n));var s,n;return"function"==typeof i&&(i=i.call(this,t)),void 0===i?e:i}localize(t,e=[]){return String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g,((t,i,s)=>{let n=!1;if(n=s?this.option(`${i[0]+i.toLowerCase().substring(1)}.l10n.${s}`):this.option(`l10n.${i}`),!n)return i;for(let t=0;t<e.length;t++)n=n.split(e[t][0]).join(e[t][1]);return n}))}on(e,i){if(t(e)){for(const t of Object.entries(e))this.on(...t);return this}return String(e).split(" ").forEach((t=>{const e=this.events[t]=this.events[t]||[];-1==e.indexOf(i)&&e.push(i)})),this}once(e,i){if(t(e)){for(const t of Object.entries(e))this.once(...t);return this}return String(e).split(" ").forEach((t=>{const e=(...s)=>{this.off(t,e),i.call(this,this,...s)};e._=i,this.on(t,e)})),this}off(e,i){if(!t(e))return e.split(" ").forEach((t=>{const e=this.events[t];if(!e||!e.length)return this;let s=-1;for(let t=0,n=e.length;t<n;t++){const n=e[t];if(n&&(n===i||n._===i)){s=t;break}}-1!=s&&e.splice(s,1)})),this;for(const t of Object.entries(e))this.off(...t)}trigger(t,...e){for(const i of[...this.events[t]||[]].slice())if(i&&!1===i.call(this,this,...e))return!1;for(const i of[...this.events["*"]||[]].slice())if(i&&!1===i.call(this,t,this,...e))return!1;return!0}attachPlugins(t){const i={};for(const[s,n]of Object.entries(t||{}))!1!==this.options[s]&&(this.options[s]=e({},n.defaults||{},this.options[s]),i[s]=new n(this));for(const[t,e]of Object.entries(i))e.attach(this);return this.plugins=Object.assign({},this.plugins,i),this}detachPlugins(){for(const t in this.plugins){let e;(e=this.plugins[t])&&"function"==typeof e.detach&&e.detach(this)}return this.plugins={},this}}const a={panOnlyZoomed:!1,lockAxis:!1,friction:.72,decelFriction:.92,zoomFriction:.72,bounceForce:.1,baseScale:1,minScale:1,maxScale:2,step:.5,zoomInCentered:!0,pinchToZoom:!0,textSelection:!0,click:"toggleZoom",clickDelay:250,doubleClick:!1,wheel:"zoom",wheelFactor:30,wheelLimit:3,touch:!0,draggableClass:"is-draggable",draggingClass:"is-dragging"};class l extends r{constructor(t,i={}){if(super(i=e(!0,{},a,i)),!(t instanceof HTMLElement))throw new Error("Viewport not found");this.state="init",this.$viewport=t;for(const t of["onPointerDown","onPointerMove","onPointerUp","onWheel","onClick"])this[t]=this[t].bind(this);if(this.$content=this.option("content"),this.$content||(this.$content=this.$viewport.querySelector(".panzoom__content")),!this.$content)throw new Error("Content not found");if(!1===this.option("textSelection")&&this.$viewport.classList.add("not-selectable"),this.resetValues(),this.attachPlugins(l.Plugins),this.trigger("init"),this.handleContent(),this.attachEvents(),this.trigger("ready"),"init"===this.state){const t=this.option("baseScale");1===t?(this.state="ready",this.handleCursor()):this.panTo({scale:t,friction:0})}}handleContent(){if(this.$content instanceof HTMLImageElement){const t=()=>{const t=this.$content.naturalWidth;this.maxScale=this.option("maxScale"),this.options.maxScale=function(){const e=this.contentDim.width;return t>0&&e>0?t/e*this.maxScale:this.maxScale},this.updateMetrics(),this.trigger(t>0?"load":"error")};!0!==this.$content.complete?(this.$content.onload=()=>t(),this.$content.onerror=()=>t()):t()}else this.updateMetrics()}resetValues(){this.viewportDim={top:0,left:0,width:0,height:0},this.contentDim={width:0,height:0},this.friction=this.option("friction"),this.current={x:0,y:0,scale:1},this.velocity={x:0,y:0,scale:0},this.pan={x:0,y:0,scale:1},this.drag={startTime:null,firstPosition:null,startPosition:null,startPoint:null,startDistance:null,endPosition:null,endPoint:null,distance:0,distanceX:0,distanceY:0,elapsedTime:0},this.lockAxis=null,this.pendingAnimateUpdate=null,this.pendingResizeUpdate=null,this.pointers=[]}updateMetrics(){let{top:t,left:e,width:i,height:s}=this.$viewport.getBoundingClientRect();const n=window.getComputedStyle(this.$viewport);i-=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight),s-=parseFloat(n.paddingTop)+parseFloat(n.paddingBottom),this.viewportDim={top:t,left:e,width:i,height:s},this.contentDim={width:this.option("width",o(this.$content)),height:this.option("hidth",h(this.$content))},this.trigger("updateMetrics"),this.updateBounds()}updateBounds(t){const e={from:0,to:0},s={from:0,to:0};if(t||(t=this.velocity.scale?this.pan.scale:this.current.scale),t<1)return[e,s];const n=this.contentDim,o=this.viewportDim,h=n.width*t,r=n.height*t;return e.to=i(.5*(h-n.width)),n.width>o.width?e.from=i(e.to+o.width-h):e.from=i(-1*e.to),s.to=i(.5*(r-n.height)),n.height>o.height?s.from=i(s.to+o.height-r):s.from=i(-1*s.to),this.boundX=e,this.boundY=s,this.trigger("updateBounds",t),[this.boundX,this.boundY]}zoomIn(t){this.zoomTo(this.current.scale+(t||this.option("step")))}zoomOut(t){this.zoomTo(this.current.scale-(t||this.option("step")))}toggleZoom(t={}){const e=this.option("maxScale"),i=this.option("baseScale");this.zoomTo(this.current.scale>i+.5*(e-i)?i:e,t)}zoomTo(t,e={}){let{x:i=null,y:s=null,friction:n=this.option("zoomFriction")}=e;t||(t=this.option("baseScale")),t=Math.max(Math.min(t,this.option("maxScale")),this.option("minScale"));const o=this.contentDim.width,h=this.contentDim.height,r=o*this.current.scale,a=h*this.current.scale,l=o*t,c=h*t;null===i&&(i=.5*r),null===s&&(s=.5*a),!1===this.option("zoomInCentered")&&(i<.5*r&&(i=r),i>r&&(i=0),s<0&&(s=a),s>a&&(s=0));let d=(l-r)*((r>0?i/r:0)-.5),p=(c-a)*((a>0?s/a:0)-.5);Math.abs(d)<1&&(d=0),Math.abs(p)<1&&(p=0),i=this.current.x-d,s=this.current.y-p,this.panTo({x:i,y:s,scale:t,friction:n})}panTo(t){let{x:e=0,y:i=0,scale:s=this.current.scale,friction:n=this.option("friction"),ignoreBounds:o=!1}=t;if(n||this.stopMoving(),!0!==o){const[t,n]=this.updateBounds(s);t&&(e=Math.max(Math.min(e,t.to),t.from)),n&&(i=Math.max(Math.min(i,n.to),n.from))}return n>0&&(Math.abs(e-this.current.x)>.1||Math.abs(i-this.current.y)>.1||Math.abs(s-this.current.scale)>.1)?(this.state="panning",this.friction=n,this.pan={x:e,y:i,scale:s},this.velocity={x:(1/this.friction-1)*(e-this.current.x),y:(1/this.friction-1)*(i-this.current.y),scale:(1/this.friction-1)*(s-this.current.scale)},this.animate(),this):(this.pendingAnimateUpdate&&(cancelAnimationFrame(this.pendingAnimateUpdate),this.pendingAnimateUpdate=null),this.state="ready",this.stopMoving(),this.current={x:e,y:i,scale:s},this.transform(),this.handleCursor(),this.trigger("afterAnimate",!0),this)}animate(){if(!this.pendingAnimateUpdate){if(this.applyBoundForce(),this.applyDragForce(),this.velocity.x*=this.friction,this.velocity.y*=this.friction,this.velocity.scale*=this.friction,this.current.x+=this.velocity.x,this.current.y+=this.velocity.y,this.current.scale+=this.velocity.scale,"dragging"==this.state||"pointerdown"==this.state||Math.abs(this.velocity.x)>.05||Math.abs(this.velocity.y)>.05||Math.abs(this.velocity.scale)>.05)return this.transform(),void(this.pendingAnimateUpdate=requestAnimationFrame((()=>{this.pendingAnimateUpdate=null,this.animate()})));this.current.x=i(this.current.x+this.velocity.x/(1/this.friction-1)),this.current.y=i(this.current.y+this.velocity.y/(1/this.friction-1)),Math.abs(this.current.x)<.5&&(this.current.x=0),Math.abs(this.current.y)<.5&&(this.current.y=0),this.current.scale=i(this.current.scale+this.velocity.scale/(1/this.friction-1),1e4),Math.abs(this.current.scale-1)<.01&&(this.current.scale=1),this.state="ready",this.stopMoving(),this.transform(),this.handleCursor(),this.trigger("afterAnimate")}}handleCursor(){const t=this.option("draggableClass");t&&this.option("touch")&&(this.contentDim.width<=this.viewportDim.width&&1==this.option("panOnlyZoomed")&&this.current.scale<=this.option("baseScale")?this.$viewport.classList.remove(t):this.$viewport.classList.add(t))}isMoved(){return 0!==this.current.x||0!==this.current.y||1!==this.current.scale||this.velocity.x>0||this.velocity.y>0||this.velocity.scale>0}stopMoving(){this.velocity={x:0,y:0,scale:0}}transform(){this.trigger("beforeTransform");const t=i(this.current.x,100),e=i(this.current.y,100),s=i(this.current.scale,1e5);Math.abs(t)<=.1&&Math.abs(e)<=.1&&Math.abs(s-1)<=.1?this.$content.style.transform="":this.$content.style.transform=`translate3d(${t}px, ${e}px, 0px) scale(${s})`,this.trigger("afterTransform")}applyBoundForce(){if("decel"!==this.state)return;const t={x:0,y:0},e=this.option("bounceForce"),i=this.boundX,s=this.boundY;let n,o,h,r;if(i&&(n=this.current.x<i.from,o=this.current.x>i.to),s&&(h=this.current.y<s.from,r=this.current.y>s.to),n||o){const s=(n?i.from:i.to)-this.current.x;let h=s*e;const r=this.current.x+(this.velocity.x+h)/(1/this.friction-1);n&&r<i.from||o&&r>i.to||(h=s*e-this.velocity.x),t.x=h}if(h||r){const i=(h?s.from:s.to)-this.current.y;let n=i*e;const o=this.current.y+(this.velocity.y+n)/(1/this.friction-1);h&&o<s.from||r&&o>s.to||(n=i*e-this.velocity.y),t.y=n}this.velocity.x+=t.x,this.velocity.y+=t.y}applyDragForce(){"dragging"===this.state&&(this.velocity={x:(1/this.friction-1)*(this.drag.endPosition.x-this.current.x),y:(1/this.friction-1)*(this.drag.endPosition.y-this.current.y),scale:(1/this.friction-1)*(this.drag.endPosition.scale-this.current.scale)})}attachEvents(){const t=this.$viewport;this.resizeObserver=this.resizeObserver||new s((t=>{this.pendingResizeUpdate=this.pendingResizeUpdate||setTimeout((()=>{let e=t&&t[0].contentRect;!e&&this.$viewport&&(e=this.$viewport.getBoundingClientRect()),e&&(Math.abs(e.width-this.viewportDim.width)>1||Math.abs(e.height-this.viewportDim.height)>1)&&this.updateMetrics(),this.pendingResizeUpdate=null}),this.option("updateRate",250))})),this.resizeObserver.observe(t),t.addEventListener("click",this.onClick,{passive:!1}),t.addEventListener("wheel",this.onWheel,{passive:!1}),this.option("touch")&&(window.PointerEvent?(t.addEventListener("pointerdown",this.onPointerDown,{passive:!1}),t.addEventListener("pointermove",this.onPointerMove,{passive:!1}),t.addEventListener("pointerup",this.onPointerUp),t.addEventListener("pointercancel",this.onPointerUp)):(t.addEventListener("touchstart",this.onPointerDown,{passive:!1}),t.addEventListener("touchmove",this.onPointerMove,{passive:!1}),t.addEventListener("touchend",this.onPointerUp),t.addEventListener("touchcancel",this.onPointerUp),t.addEventListener("mousedown",this.onPointerDown)))}detachEvents(){this.resizeObserver&&this.resizeObserver.disconnect(),this.resizeObserver=null,this.pendingResizeUpdate&&(clearTimeout(this.pendingResizeUpdate),this.pendingResizeUpdate=null);const t=this.$viewport;window.PointerEvent?(t.removeEventListener("pointerdown",this.onPointerDown,{passive:!1}),t.removeEventListener("pointermove",this.onPointerMove,{passive:!1}),t.removeEventListener("pointerup",this.onPointerUp),t.removeEventListener("pointercancel",this.onPointerUp)):(t.removeEventListener("touchstart",this.onPointerDown,{passive:!1}),t.removeEventListener("touchmove",this.onPointerMove,{passive:!1}),t.removeEventListener("touchend",this.onPointerUp),t.removeEventListener("touchcancel",this.onPointerUp),t.removeEventListener("mousedown",this.onPointerDown)),t.removeEventListener("click",this.onClick,{passive:!1}),t.removeEventListener("wheel",this.onWheel,{passive:!1})}copyPointer(t){return{pointerId:t.pointerId,clientX:t.clientX,clientY:t.clientY}}findPointerIndex(t){let e=this.pointers.length;for(;e--;)if(this.pointers[e].pointerId===t.pointerId)return e;return-1}addPointer(t){let e=0;if(t.touches&&t.touches.length)for(const i of t.touches)i.pointerId=e++,this.addPointer(i);else e=this.findPointerIndex(t),e>-1&&this.pointers.splice(e,1),this.pointers.push(t)}removePointer(t){if(t.touches){for(;this.pointers.length;)this.pointers.pop();return}const e=this.findPointerIndex(t);e>-1&&this.pointers.splice(e,1)}getMiddlePoint(){let t=[...this.pointers];t=t.sort(((t,e)=>e.pointerId-t.pointerId));const e=t.shift(),i=t.shift();return i?{clientX:.5*(e.clientX-i.clientX)+i.clientX,clientY:.5*(e.clientY-i.clientY)+i.clientY}:{clientX:e?e.clientX:0,clientY:e?e.clientY:0}}getDistance(t,e){if(!(t=(t=t||[...this.pointers]).slice())||t.length<2)return 0;const i=(t=t.sort(((t,e)=>e.pointerId-t.pointerId))).shift(),s=t.shift(),n=Math.abs(s.clientX-i.clientX);if("x"===e)return n;const o=Math.abs(s.clientY-i.clientY);return"y"===e?o:Math.sqrt(Math.pow(n,2)+Math.pow(o,2))}resetDragState(){const{left:t,top:i}=this.$content.getClientRects()[0],s=this.getMiddlePoint(),n={top:i,left:t,x:this.current.x,y:this.current.y,scale:this.current.scale};e(this.drag,{startPosition:e({},n),startPoint:e({},s),startDistance:this.getDistance(),endPosition:e({},n),endPoint:e({},s),distance:0,distanceX:0,distanceY:0}),"pointerdown"===this.state&&(this.lockAxis=null,this.drag.startTime=new Date,this.drag.firstPosition=Object.assign({},n)),this.stopMoving(),this.friction=this.option("friction")}onPointerDown(t){if(t&&!(t.button&&t.button>0))if(this.option("panOnlyZoomed")&&this.velocity.scale)t.preventDefault();else{if(this.resetDragState(),!this.pointers.length){if(-1!==["BUTTON","TEXTAREA","OPTION","INPUT","SELECT","VIDEO"].indexOf(t.target.nodeName))return;if(this.option("textSelection")&&((t,e,i)=>{const s=t.childNodes,n=document.createRange();for(let t=0;t<s.length;t++){const o=s[t];if(o.nodeType!==Node.TEXT_NODE)continue;n.selectNodeContents(o);const h=n.getBoundingClientRect();if(e>=h.left&&i>=h.top&&e<=h.right&&i<=h.bottom)return o}return!1})(t.target,t.clientX,t.clientY))return;if(n(t.target))return}if((()=>{const t=window.getSelection?window.getSelection():document.selection;t&&t.rangeCount&&t.getRangeAt(0).getClientRects().length&&(t.removeAllRanges?t.removeAllRanges():t.empty&&t.empty())})(),this.pointers.length>1||this.pointers.length&&this.lockAxis)t.preventDefault();else if(!1!==this.trigger("touchStart",t))if(t.preventDefault(),this.state="pointerdown",this.addPointer(this.copyPointer(t)),this.resetDragState(),window.PointerEvent)try{t.target.setPointerCapture(t.pointerId)}catch(t){}else document.addEventListener("mousemove",this.onPointerMove,{passive:!1}),document.addEventListener("mouseup",this.onPointerUp,{passive:!1})}}onPointerMove(t){if(t.targetTouches&&t.targetTouches.length>1)return;if("pointerdown"!==this.state&&"dragging"!==this.state)return;if(0==this.trigger("touchMove",t))return void t.preventDefault();if(this.addPointer(this.copyPointer(t)),this.pointers.length>1&&!1===this.option("pinchToZoom"))return;if(1==this.option("panOnlyZoomed")&&this.current.scale===this.option("baseScale")&&this.pointers.length<2)return void t.preventDefault();const e=this.getMiddlePoint(),i=[e,this.drag.startPoint];this.drag.distance=this.getDistance(i);const s=this.events.click&&this.events.click.length||this.events.doubleClick&&this.events.doubleClick.length||this.option.click||this.option.doubleClick;if(this.drag.distance<6&&(s||this.option("lockAxis")&&!this.lockAxis))return;if("pointerdown"==this.state&&(this.state="dragging"),"dragging"!==this.state)return;const n=this.option("lockAxis");if(!this.lockAxis&&n)if("xy"===n){const t=this.getDistance(i,"x"),e=this.getDistance(i,"y"),s=Math.abs(180*Math.atan2(e,t)/Math.PI);this.lockAxis=s>45&&s<135?"y":"x"}else this.lockAxis=n;t.preventDefault(),t.stopPropagation(),this.$viewport.classList.add(this.option("draggingClass")),this.animate();let o=this.current.scale,h=0,r=0;if(this.current.scale===this.option("baseScale")&&"y"===this.lockAxis||(h=e.clientX-this.drag.startPoint.clientX),this.current.scale===this.option("baseScale")&&"x"===this.lockAxis||(r=e.clientY-this.drag.startPoint.clientY),this.drag.endPosition.x=this.drag.startPosition.x+h,this.drag.endPosition.y=this.drag.startPosition.y+r,this.pointers.length>1){this.drag.middlePoint=e,o=this.drag.startPosition.scale*this.getDistance()/this.drag.startDistance,o=Math.max(Math.min(o,2*this.option("maxScale")),.5*this.option("minScale"));const t=this.$content.width,i=this.$content.height,s=t*this.drag.startPosition.scale,n=i*this.drag.startPosition.scale,h=i*o,r=(t*o-s)*((this.drag.startPoint.clientX-this.drag.startPosition.left)/s-.5),a=(h-n)*((this.drag.startPoint.clientY-this.drag.startPosition.top)/n-.5);this.drag.endPosition.x-=r,this.drag.endPosition.y-=a,this.drag.endPosition.scale=o,this.updateBounds(o)}this.applyDragResistance()}onPointerUp(t){if(this.removePointer(t),window.PointerEvent)try{t.target.releasePointerCapture(t.pointerId)}catch(t){}else document.removeEventListener("mousemove",this.onPointerMove,{passive:!1}),document.removeEventListener("mouseup",this.onPointerUp,{passive:!1});if(this.pointers.length>0)return t.preventDefault(),void this.resetDragState();if("pointerdown"!==this.state&&"dragging"!==this.state)return;this.$viewport.classList.remove(this.option("draggingClass"));const{top:i,left:s}=this.$content.getClientRects()[0],n=this.drag;if(e(!0,n,{elapsedTime:new Date-n.startTime,distanceX:n.endPosition.x-n.firstPosition.x,distanceY:n.endPosition.y-n.firstPosition.y,endPosition:{top:i,left:s}}),n.distance=Math.sqrt(Math.pow(n.distanceX,2)+Math.pow(n.distanceY,2)),this.state="decel",this.friction=this.option("decelFriction"),this.pan={x:this.current.x+this.velocity.x/(1/this.friction-1),y:this.current.y+this.velocity.y/(1/this.friction-1),scale:this.current.scale+this.velocity.scale/(1/this.friction-1)},!1===this.trigger("touchEnd",t))return;if("decel"!==this.state)return;const o=this.option("minScale");if(this.current.scale<o)return void this.zoomTo(o,{friction:.64});const h=this.option("maxScale");if(this.current.scale-h>.01){const t={friction:.64};n.middlePoint&&(t.x=n.middlePoint.clientX-s,t.y=n.middlePoint.clientY-i),this.zoomTo(h,t)}}applyDragResistance(){const t=this.boundX,e=this.boundY;let i,s,n,o;if(t&&(i=this.drag.endPosition.x<t.from,s=this.drag.endPosition.x>t.to),e&&(n=this.drag.endPosition.y<e.from,o=this.drag.endPosition.y>e.to),i||s){const e=i?t.from:t.to,s=this.drag.endPosition.x-e;this.drag.endPosition.x=e+.3*s}if(n||o){const t=n?e.from:e.to,i=this.drag.endPosition.y-t;this.drag.endPosition.y=t+.3*i}}onWheel(t){!1!==this.trigger("wheel",t)&&"zoom"==this.option("wheel",t)&&this.zoomWithWheel(t)}zoomWithWheel(t){void 0===this.changedDelta&&(this.changedDelta=0);let e=this.current.scale;const i=Math.max(-1,Math.min(1,-t.deltaY||-t.deltaX||t.wheelDelta||-t.detail));if(i<0&&e<=this.option("minScale")||i>0&&e>=this.option("maxScale")){if(this.changedDelta+=Math.abs(i),this.changedDelta>this.option("wheelLimit"))return}else this.changedDelta=0;e=e*(100+i*this.option("wheelFactor"))/100,t.preventDefault();const{top:s,left:n}=this.$content.getClientRects()[0],o=t.clientX-n,h=t.clientY-s;this.zoomTo(e,{x:o,y:h})}onClick(t){if(t.defaultPrevented)return;if(window.getSelection().toString().length)return t.stopPropagation(),void t.stopImmediatePropagation();if(this.drag.startPosition&&this.drag.endPosition&&(Math.abs(this.drag.endPosition.top-this.drag.startPosition.top)>1||Math.abs(this.drag.endPosition.left-this.drag.startPosition.left)>1))return t.stopPropagation(),void t.stopImmediatePropagation();if(this.drag.distance>(this.lockAxis?6:1))return t.preventDefault(),t.stopPropagation(),void t.stopImmediatePropagation();let e=null,i=null;void 0!==t.clientX&&void 0!==t.clientY&&(e=t.clientX-this.$content.getClientRects()[0].left,i=t.clientY-this.$content.getClientRects()[0].top);let s=this.options.doubleClick;if(!s&&this.events.doubleClick&&this.events.doubleClick.length&&(s=!0),s){if(!this.clickTimer)return this.lastClickEvent=t,void(this.clickTimer=setTimeout((()=>{this.clickTimer=null,!1!==this.trigger("click",t)&&"toggleZoom"===this.option("click")&&this.toggleZoom({x:e,y:i})}),this.option("clickDelay")));this.getDistance([t,this.lastClickEvent])>=6||(clearTimeout(this.clickTimer),this.clickTimer=null,!1!==this.trigger("doubleClick",t)&&"toggleZoom"===this.option("doubleClick")&&this.toggleZoom({x:e,y:i}))}else{if(!1===this.trigger("click",t))return;"toggleZoom"===this.option("click")&&this.toggleZoom({x:e,y:i})}}destroy(){"destroy"!==this.state&&(this.state="destroy",this.$viewport.classList.remove("not-selectable"),this.$content instanceof HTMLImageElement&&!this.$content.complete&&(this.$content.onload=null,this.$content.onerror=null),this.pendingAnimateUpdate&&(cancelAnimationFrame(this.pendingAnimateUpdate),this.pendingAnimateUpdate=null),this.clickTimer&&(clearTimeout(this.clickTimer),this.clickTimer=null),this.detachEvents(),this.pointers=[],this.resetValues(),this.$viewport=null,this.$content=null,this.options={},this.events={})}}l.version="4.0.0-alpha.2",l.Plugins={};const c=(t,e)=>{let i=0;return function(...s){const n=(new Date).getTime();if(!(n-i<e))return i=n,t(...s)}};class d{constructor(t){this.$container=null,this.$prev=null,this.$next=null,this.carousel=t,this.onRefresh=this.onRefresh.bind(this)}option(t){return this.carousel.option(`Navigation.${t}`)}createButton(t){const e=document.createElement("button");e.setAttribute("title",this.carousel.localize(`{{${t.toUpperCase()}}}`));const i=this.option("classNames.button")+" "+this.option(`classNames.${t}`);return e.classList.add(...i.split(" ")),e.setAttribute("tabindex","0"),e.innerHTML=this.carousel.localize(this.option(`${t}Tpl`)),e.addEventListener("click",(e=>{e.preventDefault(),e.stopPropagation(),this.carousel["slide"+("next"===t?"Next":"Prev")]()})),e}build(){this.$container||(this.$container=document.createElement("div"),this.$container.classList.add(this.option("classNames.main")),this.carousel.$element.appendChild(this.$container)),this.$next||(this.$next=this.createButton("next"),this.$container.appendChild(this.$next)),this.$prev||(this.$prev=this.createButton("prev"),this.$container.appendChild(this.$prev))}onRefresh(){const t=this.carousel.pages.length;t<=1||t>1&&this.carousel.elemDimWidth<this.carousel.wrapDimWidth&&!Number.isInteger(this.carousel.option("slidesPerPage"))?this.cleanup():(this.build(),this.$prev.removeAttribute("disabled"),this.$next.removeAttribute("disabled"),this.carousel.option("infiniteX",this.carousel.option("infinite"))||(this.carousel.page<=0&&this.$prev.setAttribute("disabled",""),this.carousel.page>=t-1&&this.$next.setAttribute("disabled","")))}cleanup(){this.$prev&&this.$prev.remove(),this.$prev=null,this.$next&&this.$next.remove(),this.$next=null,this.$container&&this.$container.remove(),this.$container=null}attach(){this.carousel.on("refresh change",this.onRefresh)}detach(){this.carousel.off("refresh change",this.onRefresh),this.cleanup()}}d.defaults={prevTpl:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>',nextTpl:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',classNames:{main:"carousel__nav",button:"carousel__button",next:"is-next",prev:"is-prev"}};class p{constructor(t){this.nav=t,this.selectedIndex=null,this.onNavReady=this.onNavReady.bind(this),this.onNavClick=this.onNavClick.bind(this),this.onNavCreateSlide=this.onNavCreateSlide.bind(this),this.onTargetChange=this.onTargetChange.bind(this)}onNavReady(){this.onTargetChange(!0),this.nav.on("createSlide",this.onNavCreateSlide),this.nav.on("Panzoom.updateMetrics",this.onTargetChange),this.nav.Panzoom.on("click",this.onNavClick),this.sync.on("change",this.onTargetChange)}onNavCreateSlide(t,e){e.index===this.selectedIndex&&this.markSelectedSlide(e.index)}onNavClick(t,e){const i=e.target.closest(".carousel__slide");if(!i)return;e.preventDefault();const s=parseInt(i.dataset.index,10),n=this.sync.getPageforSlide(s);this.sync.page!==n&&this.sync.slideTo(n,{friction:this.nav.option("Sync.friction")}),this.markSelectedSlide(s)}markSelectedSlide(t){this.selectedIndex=t,[...this.nav.slides].filter((t=>t.$el&&t.$el.classList.remove("is-nav-selected")));const e=this.nav.slides[t];e&&e.$el&&e.$el.classList.add("is-nav-selected")}onTargetChange(t){const e=this.sync.pages[this.sync.page].indexes[0],i=this.nav.getPageforSlide(e);null!==i&&(this.nav.slideTo(i,!0===t?{friction:0}:{}),this.markSelectedSlide(e))}attach(){const e=this.nav.options.Sync;e&&(t(e)&&"object"==typeof e.with&&(this.sync=e.with),this.sync&&this.nav.on("ready",this.onNavReady))}detach(){this.sync&&(this.nav.off("ready",this.onNavReady),this.nav.off("createSlide",this.onNavCreate),this.nav.on("Panzoom.updateMetrics",this.onTargetChange),this.sync.off("change",this.onTargetChange)),this.nav.Panzoom.off("click",this.onNavClick),this.sync=null,this.selectedIndex=null}}p.defaults={friction:.92};const u={Navigation:d,Dots:class{constructor(t){this.carousel=t,this.$list=null,this.events={change:this.onChange.bind(this),refresh:this.onRefresh.bind(this)}}buildList(){if(this.carousel.pages.length<2)return;const t=document.createElement("ol");return t.classList.add("carousel__dots"),t.addEventListener("click",(t=>{if(!("page"in t.target.dataset))return;t.preventDefault(),t.stopPropagation();const e=parseInt(t.target.dataset.page,10),i=this.carousel;e!==i.page&&(i.pages.length<3&&i.option("infinite")?i[0==e?"slidePrev":"slideNext"]():i.slideTo(e))})),this.$list=t,this.carousel.$element.appendChild(t),this.carousel.$element.classList.add("has-dots"),t}removeList(){this.$list&&(this.$list.parentNode.removeChild(this.$list),this.$list=null)}rebuildDots(){let t=this.$list;const e=!!t,i=this.carousel.pages.length;if(i<2)return void(e&&this.removeList());e||(t=this.buildList());const s=this.$list.children.length;if(s>i)for(let t=i;t<s;t++)this.$list.removeChild(this.$list.lastChild);else{for(let t=s;t<i;t++){const e=document.createElement("li");e.classList.add("carousel__dot"),e.dataset.page=t,e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("title",this.carousel.localize("{{GOTO}}",[["%d",t+1]])),e.addEventListener("keydown",(t=>{const i=t.code;let s;"Enter"===i||"NumpadEnter"===i?s=e:"ArrowRight"===i?s=e.nextSibling:"ArrowLeft"===i&&(s=e.previousSibling),s&&s.click()})),this.$list.appendChild(e)}this.setActiveDot()}}setActiveDot(){if(!this.$list)return;this.$list.childNodes.forEach((t=>{t.classList.remove("is-selected")}));const t=this.$list.childNodes[this.carousel.page];t&&t.classList.add("is-selected")}onChange(){this.setActiveDot()}onRefresh(){this.rebuildDots()}attach(){this.carousel.on(this.events)}detach(){this.removeList(),this.carousel.off(this.events),this.carousel=null}},Sync:p},g={slides:[],preload:0,slidesPerPage:"auto",initialPage:0,friction:.92,center:!0,infinite:!0,fill:!0,dragFree:!1,classNames:{viewport:"carousel__viewport",track:"carousel__track",slide:"carousel__slide",slideSelected:"is-selected"},l10n:{NEXT:"Next slide",PREV:"Previous slide",GOTO:"Go to slide %d"}};class m extends r{constructor(t,i={}){super(i=e(!0,{},g,i)),this.state="init",this.$element=t,t.Carousel=this,this.page=this.pageIndex=null,this.prevPage=this.prevPageIndex=null,this.slideNext=c(this.slideNext.bind(this),250),this.slidePrev=c(this.slidePrev.bind(this),250),this.attachPlugins(m.Plugins),this.trigger("init"),this.initLayout(),this.initSlides(),this.initPanzoom(),this.state="ready",this.trigger("ready")}initLayout(){if(!(this.$element instanceof HTMLElement))throw new Error("No root element provided");const t=this.option("classNames");this.$viewport=this.option("viewport")||this.$element.querySelector("."+t.viewport),this.$viewport||(this.$viewport=document.createElement("div"),this.$viewport.classList.add(t.viewport),this.$viewport.append(...this.$element.childNodes),this.$element.appendChild(this.$viewport)),this.$track=this.option("track")||this.$element.querySelector("."+t.track),this.$track||(this.$track=document.createElement("div"),this.$track.classList.add(t.track),this.$track.append(...this.$viewport.childNodes),this.$viewport.appendChild(this.$track))}initSlides(){this.slides=[];this.$viewport.querySelectorAll("."+this.option("classNames.slide")).forEach((t=>{const e={$el:t,isDom:!0};this.slides.push(e),this.trigger("createSlide",e,this.slides.length)})),Array.isArray(this.options.slides)&&(this.slides=e(!0,[...this.slides],this.options.slides))}updatePage(){let t=this.page;null===t&&(t=this.page=this.option("initialPage")),this.updateMetrics();const e=this.pages;e[t]||(t=e.length?e[e.length-1].index:0),this.slideTo(t,{friction:0})}updateBounds(){let t=this.Panzoom;const e=this.option("infinite"),i=this.option("infiniteX",e),s=this.option("infiniteY",e);i&&(t.boundX=null),s&&(t.boundY=null),i||s||(t.boundX={from:-1*this.pages[this.pages.length-1].left,to:-1*this.pages[0].left})}initPanzoom(){const t=e(!0,{},{content:this.$track,click:!1,doubleClick:!1,wheel:!1,pinchToZoom:!1,lockAxis:"x",textSelection:()=>this.option("textSelection",!1),panOnlyZoomed:()=>this.option("panOnlyZoomed",this.elemDimWidth<this.wrapDimWidth),on:{"*":(t,...e)=>this.trigger(`Panzoom.${t}`,...e),init:t=>this.Panzoom=t,updateMetrics:()=>{this.updatePage()},updateBounds:()=>{this.updateBounds()},beforeTransform:this.onBeforeTransform.bind(this),afterAnimate:this.onAfterAnimate.bind(this),touchEnd:this.onTouchEnd.bind(this)}},this.option("Panzoom"));new l(this.$viewport,t)}onBeforeTransform(){this.option("infiniteX",this.option("infinite"))&&this.manageInfiniteTrack(),this.manageSlideVisiblity()}onAfterAnimate(t,e){e||this.trigger("settle")}onTouchEnd(t){const e=this.option("dragFree");if(!e&&this.pages.length>1&&t.drag.elapsedTime<350&&Math.abs(t.drag.distanceY)<1&&Math.abs(t.drag.distanceX)>5)this[t.drag.distanceX<0?"slideNext":"slidePrev"]();else if(e){const[,t]=this.getPageFromPosition(-1*this.Panzoom.pan.x);this.setPage(t)}else this.slideToClosest()}manageInfiniteTrack(){if(!this.option("infiniteX",this.option("infinite"))||this.pages.length<2||this.elemDimWidth<this.wrapDimWidth)return;const t=this.Panzoom;let e=!1;return t.current.x<-1*(t.contentDim.width-t.viewportDim.width)&&(t.current.x+=t.contentDim.width,t.drag.firstPosition&&(t.drag.firstPosition.x+=t.contentDim.width),this.pageIndex=this.pageIndex-this.pages.length,e=!0),t.current.x>t.viewportDim.width&&(t.current.x-=t.contentDim.width,t.drag.firstPosition&&(t.drag.firstPosition.x-=t.contentDim.width),this.pageIndex=this.pageIndex+this.pages.length,e=!0),e&&"dragging"===t.state&&t.resetDragState(),e}manageSlideVisiblity(){const t=this.elemDimWidth,e=this.wrapDimWidth;let i=-1*this.Panzoom.current.x;Math.abs(i)<.1&&(i=0);const s=this.option("preload"),n=this.option("infiniteX",this.option("infinite")),o=parseFloat(window.getComputedStyle(this.$viewport,null).getPropertyValue("padding-left")),h=parseFloat(window.getComputedStyle(this.$viewport,null).getPropertyValue("padding-right"));this.slides.forEach((r=>{let a,l,c=0;a=i-o,l=i+e+h,a-=s*(e+o+h),l+=s*(e+o+h);const d=r.left+r.width>a&&r.left<l;a=i+t-o,l=i+t+e+h,a-=s*(e+o+h);const p=n&&r.left+r.width>a&&r.left<l;a=i-t-o,l=i-t+e+h,a-=s*(e+o+h);const u=n&&r.left+r.width>a&&r.left<l;p||d||u?(this.createSlideEl(r),d&&(c=0),p&&(c=-1),u&&(c=1),r.left+r.width>i&&r.left<=i+e+h&&(c=0)):this.removeSlideEl(r),r.hasDiff=c}));let r=0,a=0;this.slides.forEach(((e,i)=>{let s=0;e.$el?(i!==r||e.hasDiff?s=a+e.hasDiff*t:a=0,e.$el.style.left=Math.abs(s)>.1?`${a+e.hasDiff*t}px`:"",r++):a+=e.width})),this.Panzoom.viewportDim.height=this.Panzoom.$content.clientHeight,this.markSelectedSlides()}markSelectedSlides(){const t=this.option("classNames.slideSelected"),e="aria-hidden";this.slides.forEach(((i,s)=>{const n=i.$el;if(!n)return;const o=this.pages[this.page];o&&o.indexes&&o.indexes.indexOf(s)>-1?(t&&!n.classList.contains(t)&&(n.classList.add(t),this.trigger("selectSlide",i)),n.removeAttribute(e)):(t&&n.classList.contains(t)&&(n.classList.remove(t),this.trigger("unselectSlide",i)),n.setAttribute(e,!0))}))}createSlideEl(t){if(!t)return;if(t.$el){if(parseInt(t.$el.dataset.index,10)!==t.index){t.$el.dataset.index=t.index;let e;t.$el.querySelectorAll("[data-lazy-src]").forEach((t=>{let e=t.dataset.lazySrc;t instanceof HTMLImageElement?t.src=e:t.style.backgroundImage=`url('${e}')`})),(e=t.$el.dataset.lazySrc)&&(t.$el.style.backgroundImage=`url('${e}')`),t.state="ready"}return}const e=document.createElement("div");e.dataset.index=t.index,e.classList.add(this.option("classNames.slide")),t.customClass&&e.classList.add(...t.customClass.split(" ")),t.html&&(e.innerHTML=t.html);const i=[];this.slides.forEach(((t,e)=>{t.$el&&i.push(e)}));const s=t.index;let n=null;if(i.length){let t=i.reduce(((t,e)=>Math.abs(e-s)<Math.abs(t-s)?e:t));n=this.slides[t]}return this.$track.insertBefore(e,n&&n.$el?n.index<t.index?n.$el.nextSibling:n.$el:null),t.$el=e,this.trigger("createSlide",t,s),t}getSlideMetrics(t){if(!t){const e=this.slides[0];(t=document.createElement("div")).dataset.isTestEl=1,t.style.visibility="hidden",t.classList.add(this.option("classNames.slide")),e.customClass&&t.classList.add(...e.customClass.split(" ")),this.$track.prepend(t)}let e=i(t.getBoundingClientRect().width);const s=t.currentStyle||window.getComputedStyle(t);return e=e+(parseFloat(s.marginLeft)||0)+(parseFloat(s.marginRight)||0),window.visualViewport&&(e*=window.visualViewport.scale),t.dataset.isTestEl&&t.remove(),e}updateMetrics(){let t,e=0,s=[];this.slides.forEach(((i,n)=>{const o=i.$el,h=i.isDom||!t?this.getSlideMetrics(o):t;i.index=n,i.width=h,i.left=e,t=h,e+=h,s.push(n)})),this.elemDimWidth=i(e),this.Panzoom.contentDim.width=this.elemDimWidth,this.wrapDimWidth=i(this.$viewport.getBoundingClientRect().width);var n=window.getComputedStyle(this.$viewport),o=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight);this.wrapDimWidth=this.wrapDimWidth-o,window.visualViewport&&(this.wrapDimWidth*=window.visualViewport.scale),this.Panzoom.viewportDim.width=this.wrapDimWidth;const h=[],r=this.option("slidesPerPage");if(Number.isInteger(r)&&this.elemDimWidth>this.wrapDimWidth)for(let t=0;t<this.slides.length;t+=r)h.push({indexes:s.slice(t,t+r),slides:this.slides.slice(t,t+r)});else{let t=0,e=0;for(let i=0;i<this.slides.length;i+=1){let s=this.slides[i];(!h.length||e+s.width>this.wrapDimWidth)&&(h.push({indexes:[],slides:[]}),t=h.length-1,e=0),e+=s.width,h[t].indexes.push(i),h[t].slides.push(s)}}const a=this.option("center"),l=this.option("fill");h.forEach(((t,e)=>{t.index=e,t.width=t.slides.reduce(((t,e)=>t+e.width),0),t.left=t.slides[0].left,a&&(t.left+=.5*(this.wrapDimWidth-t.width)*-1),l&&!this.option("infiniteX",this.option("infinite"))&&this.elemDimWidth>this.wrapDimWidth&&(t.left=Math.max(t.left,0),t.left=Math.min(t.left,this.elemDimWidth-this.wrapDimWidth))}));const c=[];let d;h.forEach((t=>{d&&t.left===d.left?(d.width+=t.width,d.slides=[...d.slides,...t.slides],d.indexes=[...d.indexes,...t.indexes]):(t.index=c.length,d=t,c.push(t))})),this.pages=c,this.manageSlideVisiblity(),this.trigger("refresh")}setPage(t,e){let i=0,s=parseInt(t,10)||0;const n=this.page,o=this.pageIndex,h=this.pages.length;if(t=(s%h+h)%h,this.option("infiniteX",this.option("infinite"))&&this.elemDimWidth>this.wrapDimWidth){const n=Math.floor(s/h)||0,o=this.elemDimWidth;if(i=this.pages[t].left+n*o,!0===e&&h>2){let t=-1*this.Panzoom.current.x;const e=i-o,n=i+o,r=Math.abs(t-i),a=Math.abs(t-e),l=Math.abs(t-n);l<r&&l<=a?(i=n,s+=h):a<r&&a<l&&(i=e,s-=h)}}else t=s=Math.max(0,Math.min(s,h-1)),i=this.pages[t].left;return this.page=t,this.pageIndex=s,null!==n&&t!==n&&(this.prevPage=n,this.prevPageIndex=o,this.trigger("change",t,n)),i}slideTo(t,e={}){const{friction:i=this.option("friction")}=e;this.Panzoom.panTo({x:-1*this.setPage(t,!0),y:0,friction:i})}slideToClosest(t={}){let[,e]=this.getPageFromPosition(-1*this.Panzoom.pan.x);this.slideTo(e,t)}slideNext(){this.slideTo(this.pageIndex+1)}slidePrev(){this.slideTo(this.pageIndex-1)}getPageforSlide(t){const e=this.pages.find((e=>e.indexes.indexOf(t)>-1));return e?e.index:null}getPageFromPosition(t){const e=this.pages.length;this.option("center")&&(t+=.5*this.wrapDimWidth);const i=Math.floor(t/this.elemDimWidth);t-=i*this.elemDimWidth;let s=this.slides.find((e=>e.left<t&&e.left+e.width>t));if(s){let t=this.getPageforSlide(s.index);return[t,t+i*e]}return[0,0]}removeSlideEl(t){t.$el&&!t.isDom&&(this.trigger("deleteSlide",t),t.$el.remove(),t.$el=null)}destroy(){this.state="destroy",this.slides.forEach((t=>{this.removeSlideEl(t)})),this.Panzoom.destroy(),this.options={},this.events={}}}m.version="4.0.0-alpha.2",m.Plugins=u;export{m as Carousel,l as Panzoom};
